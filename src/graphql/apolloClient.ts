import { InMemoryCacheConfig } from "@apollo/client";

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
import { useMemo } from "react";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

import { NEXT_PUBLIC_API_URL } from "@/constants";

export const cacheConfig: InMemoryCacheConfig = {};

/**
 * @description see article: https://developers.wpengine.com/blog/apollo-client-cache-rehydration-in-next-js
 */

const isServer = () => typeof window === "undefined";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * @description This function is responsible for creating a new instance of Apollo Client. We set Apollo Client’s `ssrMode` option to `true` if the code is running on the server, and to `false` if it’s running on the client.
 */
export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: isServer(),
    link: new HttpLink({
      uri: NEXT_PUBLIC_API_URL,
    }),
    cache: new InMemoryCache(cacheConfig),
  });
};

/**
 * @description this function initializes Apollo Client. It merges the initial state (data passed in from `getStaticProps()` / `getServerSideProps()`) with the existing client-side Apollo cache, then sets that new, merged data set as the new cache for Apollo Client.
 * @param {object|null} initialState initial apollo cache state (if exists )
 * @returns {object} instance of ApolloClient
 */
export const initialiseApolloClient = (
  initialState: NormalizedCacheObject | null = null
) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  /**
   * @description If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
   */
  if (!!initialState) {
    /**
     * @description Get existing cache, loaded during client side data fetching
     */
    const existingCache = _apolloClient.extract();

    /**
     * @description Merge the existing cache into data passed from getStaticProps/getServerSideProps
     */
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  /**
   * @description For SSG and SSR always create a new Apollo Client
   * */
  if (typeof window === "undefined") return _apolloClient;

  /**
   * @description Create the Apollo Client once in the client-side
   */
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

/**
 * @description This function takes the pageProps returned from getStaticProps() / getServerSideProps() for the current page and adds to them Apollo’s cache data. From there, Next.js takes care of passing Apollo’s cache data, along with any other page-specific props into the page component.
 * @param {object} client instance of apollo client
 * @param {object} pageProps current page props
 * @returns {object} page props with added apollo state up-to-date
 */
export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

/**
 * @description custome hook to use at the top level _app page, calls initializeApollo() to get an instance of Apollo Client that has Apollo’s cache data added to it. This client is ultimately passed in as a prop to the ApolloProvider that Apollo Client provides.
 * @param {object} pageProps page props
 * @returns {object} instance of Apollo Client
 */
export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initialiseApolloClient(state), [state]);

  return store;
};

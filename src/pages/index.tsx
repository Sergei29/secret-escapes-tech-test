import { useLazyQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import { Typography } from "@mui/material";

import SalesSearchResults from "@/components/SalesSearchResults";
import SearchInput from "@/components/SearchInput";
import {
  GET_SALES_LIST_BY_QUERY,
  initialiseApolloClient,
  addApolloState,
} from "@/graphql";
import { TravelTypes, SalesSearchResult } from "@/types";

const { HOTEL_ONLY } = TravelTypes;
const PAGINATION = {
  limit: 10,
  offset: 0,
};

/**
 * @description prefetching the query for sales by location.
 * It is arguable whether it is needed here - the reason I have added it - just to have zero loading time for already selected location.
 */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const location = query.location as string | undefined;
  const apolloClient = initialiseApolloClient();

  if (!!location) {
    await apolloClient.query({
      query: GET_SALES_LIST_BY_QUERY,
      variables: {
        query: location,
        travelTypes: [HOTEL_ONLY],
        limit: PAGINATION.limit,
        offset: PAGINATION.offset,
      },
    });
  }

  return addApolloState(apolloClient, {
    props: {},
  });
};

const HomePage: NextPage = () => {
  const [getSalesByLocation, { data, loading, error }] = useLazyQuery<{
    saleSearch: SalesSearchResult;
  }>(GET_SALES_LIST_BY_QUERY);

  const fetchByLocation = (query: string) =>
    getSalesByLocation({
      variables: {
        query,
        travelTypes: [HOTEL_ONLY],
        limit: PAGINATION.limit,
        offset: PAGINATION.offset,
      },
    });

  return (
    <>
      <Head>
        <title>Secret Escapes Tech Test | Homepage</title>
        <meta
          name="description"
          content="This is a homepage, provides a search list for sale items by location- techincal test"
        />
      </Head>

      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        Featured sales by location
      </Typography>

      <SearchInput handleSubmitSearch={fetchByLocation} />

      <SalesSearchResults
        results={data?.saleSearch}
        loading={loading}
        error={error?.message || null}
      />
    </>
  );
};

export default HomePage;

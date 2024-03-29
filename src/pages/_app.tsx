import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { useApollo } from "@/graphql";
import { createEmotionCache, theme } from "@/theme";
import Layout from "@/Layout";

/**
 * @description  Client-side cache, shared for the whole session of the user in the browser.
 */
const clientSideEmotionCache = createEmotionCache();

type PageProps = {
  emotionCache?: EmotionCache;
} & AppProps;

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: PageProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}

import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";

import {
  GET_SALE_BY_ID,
  initialiseApolloClient,
  addApolloState,
} from "@/graphql";
import SaleDetailsDisplay from "@/components/SaleDetailsDisplay";
import { SaleDetails } from "@/types";
import { theme } from "@/theme";

/**
 * @description prefetch query by id, during SSR phase,
 * I believe here the optimal solution would be - either do pure client side fetching on mount, OR pre-fetch query during SSR (as currently)
 *
 *  WHY?: I have selected the SSR option over the client side fetching for a zero loading time, and I haven't selected Incremental Static Regeneration - is due to dynamic nature of the sale ID so if there is a large number of sale items (eg. pagination) - to pre-generate such large number of pages at build time will not be reasonable, it will require to make a fallback.
 *
 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const saleId = params?.id as string;
  const apolloClient = initialiseApolloClient();

  try {
    const { data } = await apolloClient.query<{ sale: SaleDetails }>({
      query: GET_SALE_BY_ID,
      variables: {
        saleId,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        pageTitle: data.sale.editorial.title,
        metaDescription: data.sale.editorial.destinationName,
      },
    });
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

type PageProps = {
  pageTitle?: string;
  metaDescription?: string;
};

const SaleDetailsPage: NextPage<PageProps> = ({
  pageTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const { data, error } = useQuery<{ sale: SaleDetails }>(GET_SALE_BY_ID, {
    variables: { saleId: router.query.id },
  });

  return (
    <>
      <Head>
        <title>{pageTitle || "Sale Details Page"}</title>
        <meta
          name="description"
          content={metaDescription || "Sale details page"}
        />
      </Head>
      {/* there is often an argument between using ternary OR `&&` operator for conditional display */}
      {data?.sale ? <SaleDetailsDisplay saleDetails={data.sale} /> : null}
      {error ? (
        <Typography
          sx={{ textAlign: "center", color: theme.palette.error.main }}
        >
          {error.message}
        </Typography>
      ) : null}
    </>
  );
};

export default SaleDetailsPage;

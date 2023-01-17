import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import {
  GET_SALE_BY_ID,
  initialiseApolloClient,
  addApolloState,
} from "@/graphql";
import { SaleDetails } from "@/types";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const saleId = params?.id as string;
  const apolloClient = initialiseApolloClient();
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
  const { data, loading, error } = useQuery<{ sale: SaleDetails }>(
    GET_SALE_BY_ID,
    {
      variables: { saleId: router.query.id },
    }
  );

  console.log({ data, loading, error });

  return (
    <>
      <Head>
        <title>{pageTitle || "Sale Details Page"}</title>
        <meta
          name="description"
          content={metaDescription || "Sale details page"}
        />
      </Head>

      <h1>Sale Details Page</h1>
      <p>Sale ID: {router.query.id}</p>
    </>
  );
};

export default SaleDetailsPage;

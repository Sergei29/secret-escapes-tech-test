import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from "next/router";

type PageProps = {}

const SaleDetailsPage: NextPage<PageProps> = ({}) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Sale Page</title>
        <meta name='description' content='Sale details page' />
      </Head>

      <h1>Sale Details Page</h1>
      <p>Sale ID: {router.query.id}</p>
    </>
  )
}

export default SaleDetailsPage
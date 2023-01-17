import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Roboto } from "@next/font/google";

import Navigation from "@/components/Navigation";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

type PageProps = { children: React.ReactNode };

const index: NextPage<PageProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Secret Escapes Tech Test</title>
        <meta
          name="description"
          content="This page is for training purpose only - techincal test"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={inter.className}>
        <Navigation />
      </header>
      <main className={inter.className}>{children}</main>
    </>
  );
};

export default index;

import type { NextPage } from "next";
import Head from "next/head";

import NoDataPlaceholder from "@/components/NoDataPlaceholder";

const NotFoundPage: NextPage = () => (
  <>
    <Head>
      <title>Not Found</title>
    </Head>

    <NoDataPlaceholder customMessage="Oups! Page not found." />
  </>
);

export default NotFoundPage;

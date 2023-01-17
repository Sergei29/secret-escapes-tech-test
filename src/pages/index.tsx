import { useLazyQuery } from "@apollo/client";
import Head from "next/head";
import { Typography } from "@mui/material";

import SalesSearchResults from "@/components/SalesSearchResults";
import SearchInput from "@/components/SearchInput";
import { GET_SALES_LIST_BY_QUERY } from "@/graphql";
import { TravelTypes, SalesSearchResult } from "@/types";

const { HOTEL_ONLY } = TravelTypes;
const PAGINATION = {
  limit: 10,
  offset: 0,
};

const HomePage = () => {
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
          content="This hompage page provides a search list for sale items - techincal test"
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

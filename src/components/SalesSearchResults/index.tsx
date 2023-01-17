import React from "react";
import { Box, Typography } from "@mui/material";
import { SalesSearchResult } from "@/types";

import SalesCard from "./components/SalesCard";

type Props = {
  results?: SalesSearchResult;
  loading: boolean;
  error: null | string;
};

const SalesSearchResults = ({
  results,
  loading,
  error,
}: Props): JSX.Element => {
  return (
    <Box>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {results &&
        results.sales.map((currentSale) => (
          <SalesCard key={currentSale.id} saleSummary={currentSale} />
        ))}
    </Box>
  );
};

export default SalesSearchResults;

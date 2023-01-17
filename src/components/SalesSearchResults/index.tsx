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
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
      {results &&
        results.sales.map((currentSale) => (
          <SalesCard key={currentSale.id} saleSummary={currentSale} />
        ))}
    </Box>
  );
};

export default SalesSearchResults;

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

type Props = {
  customMessage?: string;
};

const NoDataPlaceholder = ({ customMessage }: Props) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      rowGap: 2,
    }}
  >
    <Typography variant="h4" component="h1" sx={{ color: teal.A700 }}>
      {customMessage || "Sorry, no data available"}
    </Typography>

    <Image
      src="https://i.imgur.com/FOeYt4E.png"
      height={400}
      width={350}
      alt="not found"
    />
  </Box>
);

export default NoDataPlaceholder;

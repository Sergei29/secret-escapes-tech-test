import React from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DOMPurify from "dompurify";

import ImageGallery from "./components/ImageGallery";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import { SaleDetails } from "@/types";

type Props = {
  saleDetails: SaleDetails;
};

const SaleDetailsDisplay = ({ saleDetails }: Props): JSX.Element => {
  const router = useRouter();

  const {
    editorial: { title, destinationName, hotelDetails },
    prices,
    photos,
  } = saleDetails;

  return (
    <Box>
      <PageTitle>{title}</PageTitle>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <PlaceIcon />
        <Typography sx={{ fontWeight: 600, textAlign: "right" }}>
          {destinationName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => router.back()}
          sx={{
            mr: "auto",
            ml: 4,
            textTransform: "none",
          }}
        >
          Back to search results
        </Button>
        <Typography
          sx={{
            fontWeight: 600,
            textAlign: "right",
            bgcolor: (theme) => theme.palette.primary.light,
          }}
        >
          Prices from: {prices.leadRate.forDisplay}
        </Typography>
      </Box>
      <ImageGallery images={photos} />
      {/* Dangerously set inner html - hopefully we know what content we are serving in there, (https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) */}
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hotelDetails) }}
      ></div>
    </Box>
  );
};

export default SaleDetailsDisplay;

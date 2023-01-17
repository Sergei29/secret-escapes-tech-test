import React from "react";
import NextImage from "next/image"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Image } from "@/types";

type Props = {
  images: Image[];
};

const ImageGallery = ({ images }: Props): JSX.Element => (
  <Box sx={{ width: 640, mx: "auto", my: 4 }}>
    <Carousel showThumbs={false}>
      {images.map((currentImage) => (
        <Box key={currentImage.url}>
          <NextImage
            src={currentImage.url}
            width={640}
            height={459}
            alt="Sale Details gallery"
          />
        </Box>
      ))}
    </Carousel>
  </Box>
);

export default ImageGallery;

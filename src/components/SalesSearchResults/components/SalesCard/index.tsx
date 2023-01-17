import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Typography, Box, Card, CardContent, CardProps } from "@mui/material";

import { SaleSummary } from "@/types";

type Props = { saleSummary: SaleSummary } & Omit<
  CardProps,
  "component" | "children"
>;

const SalesCard = ({
  saleSummary,
  sx,
  ...restCardProps
}: Props): JSX.Element => {
  const {
    id,
    editorial: { title, destinationName },
    photos: [firstImage],
  } = saleSummary;

  return (
    <Card
      sx={{
        width: "30%",
        "&:hover": { bgcolor: (theme) => theme.palette.primary.light },
        transition: "all 300ms ease-in-out",
        textDecoration: "none",
        ...sx,
      }}
      component={Link}
      href={`/sales/${id}`}
      {...restCardProps}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            "& > img": { width: "100%", height: "unset", objectFit: "contain" },
          }}
        >
          <Image src={firstImage.url} width={640} height={459} alt={title} />
        </Box>
        <Typography variant="h3" sx={{ fontSize: "1.2rem", mb: 2 }}>
          {title}
        </Typography>
        <Typography>{destinationName}</Typography>
      </CardContent>
    </Card>
  );
};

export default SalesCard;

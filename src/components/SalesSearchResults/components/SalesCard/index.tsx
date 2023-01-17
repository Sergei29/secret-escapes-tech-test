import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Typography, Box, Card, CardContent } from "@mui/material";

import { SaleSummary } from "@/types";

type Props = { saleSummary: SaleSummary };

const SalesCard = ({ saleSummary }: Props): JSX.Element => {
  const {
    id,
    editorial: { title, destinationName },
    photos: [firstImage],
  } = saleSummary;

  return (
    <Card component={Link} href={`/sales/${id}`}>
      <CardContent>
        <Box>
          <Image src={firstImage.url} width={640} height={459} alt={title} />
        </Box>
        <Typography variant="h3">{title}</Typography>
        <Typography>{destinationName}</Typography>
      </CardContent>
    </Card>
  );
};

export default SalesCard;

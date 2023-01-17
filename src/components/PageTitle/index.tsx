import React from "react";
import { Typography, TypographyProps } from "@mui/material";

type Props = Omit<TypographyProps, "variant">;

const PageTitle = ({
  children,
  sx,
  ...restTypographyProps
}: Props): JSX.Element => (
  <Typography
    sx={{
      fontSize: "2rem",
      textDecoration: "underline",
      color: (theme) => theme.palette.primary.light,
      fontWeight: 600,
      textAlign: "center",
      mb: 2,
      ...sx,
    }}
    {...restTypographyProps}
  >
    {children}
  </Typography>
);

export default PageTitle;

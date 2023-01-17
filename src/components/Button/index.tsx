import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

const Button = ({
  children,
  sx,
  ...restButtonProps
}: ButtonProps): JSX.Element => (
  <MuiButton
    sx={{
      bgcolor: (theme) => theme.palette.primary.light,
      "&:hover": {
        bgcolor: (theme) => theme.palette.primary.main,
        transition: "all 300ms ease-in-out",
      },
      borderRadius: 0,
      color: "inherit",
      ...sx,
    }}
    {...restButtonProps}
  >
    {children}
  </MuiButton>
);

export default Button;

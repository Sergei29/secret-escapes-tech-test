import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

const navLinks = [{ id: 1, path: "/", title: "Homepage" }];

const Navigation = (): JSX.Element => {
  const router = useRouter();

  return (
    <Box component="nav">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {navLinks.map(({ id, path, title }) => (
          <Link
            key={id}
            href={path}
            style={{
              color: router.pathname === path ? "red" : "inherit",
            }}
          >
            {title}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Navigation;

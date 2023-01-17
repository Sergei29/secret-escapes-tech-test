import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [{ id: 1, path: "/", title: "Homepage" }];

type Props = {};

const Navigation = ({}: Props): JSX.Element => {
  const router = useRouter();

  return (
    <nav>
      <ul
        style={{
          listStyleType: "none",
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
      </ul>
    </nav>
  );
};

export default Navigation;

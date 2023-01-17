import Head from "next/head";
import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Secret Escapes Tech Test | Homepage</title>
        <meta
          name="description"
          content="This hompage page provides a search list for sale items - techincal test"
        />
      </Head>

      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        Home Page
      </Typography>
    </>
  );
};

export default HomePage;

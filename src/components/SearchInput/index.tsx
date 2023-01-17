import React, { useRef, useEffect } from "react";
import { QueryResult, OperationVariables } from "@apollo/client";
import {
  TextField,
  FormControl,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import { theme } from "@/theme";

type Props = {
  handleSubmitSearch: (
    query: string
  ) => Promise<QueryResult<any, OperationVariables>>;
};

const SearchInput = ({ handleSubmitSearch }: Props): JSX.Element => {
  /**
   * @description The un-controlled input is selected here (using ref), the reason to that - at this current stage I do not need to react to each character change like validation etc. But it can be updated to a controlled input any time with minimum refactoring.
   */
  const queryInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!queryInputRef.current || !queryInputRef.current.value.trim()) {
      return;
    }

    const { error, loading } = await handleSubmitSearch(
      queryInputRef.current.value
    );

    if (!loading && !error) {
      router.replace({
        query: {
          location: queryInputRef.current.value,
        },
      });
      queryInputRef.current.value = "";
    }
  };

  const handlekeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;

    handleSubmit();
  };

  /**
   * @description an effect to run on mount - fetches sales list by location,
   * IF the location has been selected previously.
   * ( in this case the query is already pre-fetched by SSR,
   * see `src/pages/index.tsx`)
   */
  useEffect(() => {
    if (!!router.query.location) {
      handleSubmitSearch(router.query.location as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "50%",
        mx: "auto",
      }}
    >
      <FormControl>
        <FormLabel htmlFor="query" sx={{ display: "flex", gap: 2, mb: 1 }}>
          Enter your desired location
          <Typography
            sx={{
              bgcolor: (theme) => theme.palette.primary.light,
              color: theme.palette.common.black,
            }}
          >
            👻 And HIT ENTER!!!
          </Typography>{" "}
        </FormLabel>
        <TextField
          type="text"
          name="query"
          inputRef={queryInputRef}
          onKeyDown={handlekeyDown}
          InputProps={{
            sx: { borderRadius: 0 },
          }}
        />
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleSubmit}>Find sales!</Button>
      </Box>
    </Box>
  );
};

export default SearchInput;

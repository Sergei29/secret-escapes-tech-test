import React, { useRef, useEffect } from "react";
import { QueryResult, OperationVariables } from "@apollo/client";
import { TextField, FormControl, FormLabel, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  handleSubmitSearch: (
    query: string
  ) => Promise<QueryResult<any, OperationVariables>>;
};

const SearchInput = ({ handleSubmitSearch }: Props): JSX.Element => {
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
        <FormLabel htmlFor="query">Your desired location</FormLabel>
        <TextField
          type="text"
          name="query"
          inputRef={queryInputRef}
          onKeyDown={handlekeyDown}
        />
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.palette.primary.light,
            "&:hover": {
              bgcolor: (theme) => theme.palette.primary.main,
              transition: "all 300ms ease-in-out",
            },
          }}
        >
          Find sales!
        </Button>
      </Box>
    </Box>
  );
};

export default SearchInput;

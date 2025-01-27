import { Box, Stack } from "@mui/material";
import pagopaLogo from "./pagopa-logo.svg";

export default function Header() {

  return (
    <>
      <Box p={3} bgcolor={"white"}>
        <Stack
          spacing={0}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          zIndex="1000"
        >
          <img
            src={pagopaLogo}
            alt="pagoPA"
            style={{ width: "56px", height: "36px" }}
            aria-hidden="true"
          />
        </Stack>
      </Box>
    </>
  );
}

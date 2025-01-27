import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pb={{ xs: 16, sm: 0 }}
      pl={{ xs: 3, sm: 6 }}
      pr={{ xs: 3, sm: 6 }}
      pt={{ xs: "3rem", sm: 0}}
      bgcolor={{ xs: "background.default" ,sm: "background.paper"}}
    >
    </Box>
  );
}

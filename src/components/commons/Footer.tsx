import { Box, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import pagopaLogo from "./logo-pagopa-spa.svg";

export default function Footer() {
  const { t } = useTranslation();
  const theme = useTheme();

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

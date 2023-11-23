import { useObserver } from "mobx-react";
import { usePageEffect } from "../../../core/page.js";

import { Opening } from "./components/index.js";

import { Box } from "@mui/material";

import "aos/dist/aos.css";
import DataList from "./components/DataList.js";

export default function Branding(): JSX.Element {
  usePageEffect({ title: "AI 브랜딩" });

  return useObserver(() => (
    <>
      <Box
        sx={{
          my: "60px",
        }}
      >
        <Opening />
        <DataList />
      </Box>
    </>
  ));
}

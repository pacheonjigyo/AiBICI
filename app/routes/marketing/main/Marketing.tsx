import { useObserver } from "mobx-react";
import { usePageEffect } from "../../../core/page.js";

import { Box } from "@mui/material";
import "aos/dist/aos.css";
import Opening from "./components/Opening.js";

export default function Marketing(): JSX.Element {
  usePageEffect({ title: "AI 브랜딩" });

  return useObserver(() => (
    <>
      <Box
        sx={{
          my: 16,
        }}
      >
        <Opening />
      </Box>
    </>
  ));
}

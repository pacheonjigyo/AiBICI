import { Box } from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../../core/page.js";

import News from "./components/News.js";

export default function Pricing(): JSX.Element {
  usePageEffect({
    title: "브랜딩 이야기",
  });

  return useObserver(() => (
    <>
      <Box
        sx={{
          my: 16,
        }}
      >
        <News />
      </Box>
    </>
  ));
}

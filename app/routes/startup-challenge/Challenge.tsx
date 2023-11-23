import ApplyChallenge from "./apply/Apply.js";
import Opening from "./components/Opening.js";

import { Box } from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";

import "aos/dist/aos.css";

export default function Challenge(): JSX.Element {
  usePageEffect({ title: "Challenge" });

  return useObserver(() => (
    <>
      <Box
        sx={{
          my: "60px",
        }}
      >
        <Opening />

        <ApplyChallenge />
      </Box>
    </>
  ));
}

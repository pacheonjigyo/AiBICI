import indexStore from "../../../stores/index.js";

import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useObserver } from "mobx-react";

export default function Page1(): JSX.Element {
  const { questionStore } = indexStore();

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 10,
          position: "relative",
        }}
      >
        <Typography
          className="fadeIn"
          sx={{
            lineHeight: 1.2,
            mb: 1,
          }}
          align="center"
          fontSize={questionStore.isDesktop ? 50 : 40}
        >
          <span style={{ fontWeight: "bold" }}>WORK</span>
        </Typography>

        <Typography
          className="fadeIn"
          sx={{
            lineHeight: 1.2,
            mb: 5,
          }}
          align="center"
          fontSize={questionStore.isDesktop ? 18 : 16}
        >
          AI가 만드는 브랜드 아이덴티티 서비스
        </Typography>

        <ButtonGroup
          color="inherit"
          variant="text"
          aria-label="text button group"
        >
          <Button>All</Button>
          <Button>Brand & Digital</Button>
          <Button>Advertising</Button>
          <Button>Industrial</Button>
        </ButtonGroup>
      </Box>
    </>
  ));
}

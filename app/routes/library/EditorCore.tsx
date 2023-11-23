import * as React from "react";

import { Box, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

export default function EditorCore(): JSX.Element {
  const theme = useTheme();
  const { commonStore, engineDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Box
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "black"
            : `url(
                "/resources/checker_board.png")`,

        bgcolor: "lightgray",
        // borderLeft: 1,
        // borderRight: 1,
        // borderColor: "divider",

        width: commonStore.baseInfo.width - 740,
        height: commonStore.baseInfo.height - 80,
        overflowY: "auto",

        position: "relative",
      }}
    >
      <canvas
        id="main"
        width={commonStore.baseInfo.width - 740}
        height={commonStore.baseInfo.height - 80}
      ></canvas>

      {/* <Box
        sx={{
          bgcolor: "background.paper",
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderLeft: 1,
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Button
          color="info"
          onClick={() => {
            engineDataStore.setPrompts({
              ...engineDataStore.prompts,
              detailed: !engineDataStore.prompts.detailed,
            });
          }}
          sx={{
            minWidth: 20,
            height: 90,
            p: 0,
          }}
        >
          {engineDataStore.prompts.detailed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )}
        </Button>
      </Box> */}
    </Box>
  ));
}

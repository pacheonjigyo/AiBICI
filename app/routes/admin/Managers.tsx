import * as React from "react";

import { Refresh } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";

export default function AdminManagers(): JSX.Element {
  const theme = useTheme();
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["직원관리"][commonStore.appInfo.language],
  });

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",

          height: commonStore.baseInfo.height,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                height: commonStore.baseInfo.height,
                overflowY: "scroll",
                p: 3,
              }}
            >
              <Box sx={{}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography fontWeight="bold" fontSize={20}>
                    {wordList["직원관리"][commonStore.appInfo.language]}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton size="small">
                      <Refresh />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              <Box sx={{}}></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}

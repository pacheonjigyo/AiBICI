import * as React from "react";

import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Inquiry(): JSX.Element {
  const theme = useTheme();
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["전문가 컨설팅"][commonStore.appInfo.language],
  });

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",

          height: commonStore.baseInfo.height - 110,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                boxShadow: `0px 3px 7px 0px ${
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,.1)"
                    : "rgba(255,255,255,.1)"
                }`,
                width: "100%",
                height: commonStore.baseInfo.height - 110,
                overflowY: "scroll",
                p: 3,
              }}
            >
              <Box
                sx={{
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight="bold">
                    {wordList["전문가 컨설팅"][commonStore.appInfo.language]}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}

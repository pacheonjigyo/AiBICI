import * as React from "react";

import { Refresh } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";

export default function AdminChallenge(): JSX.Element {
  const theme = useTheme();
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["전문가 상담"][commonStore.appInfo.language],
  });

  return useObserver(() => (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            height: 80,
          }}
        >
          <Typography fontWeight="bold" fontSize={20}>
            창업도전
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

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}

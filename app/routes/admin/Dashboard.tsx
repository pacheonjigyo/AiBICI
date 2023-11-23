import * as React from "react";

import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Dashboard(): JSX.Element {
  const theme = useTheme();
  const { commonStore, boardStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["대시보드"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    boardStore.getBoardData("notice", 5, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          height: commonStore.baseInfo.height - 110,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={commonStore.isDesktop ? 6 : 12}>
            <Box>
              <Paper
                variant="outlined"
                sx={{
                  boxShadow: `0px 3px 7px 0px ${
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,.1)"
                      : "rgba(255,255,255,.1)"
                  }`,
                  p: 3,
                  height: ((commonStore.baseInfo.height - 110) * 1) / 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography fontWeight="bold">
                    {wordList["전문가 상담"][commonStore.appInfo.language]}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  ></Box>
                </Box>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  boxShadow: `0px 3px 7px 0px ${
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,.1)"
                      : "rgba(255,255,255,.1)"
                  }`,
                  p: 3,

                  height: ((commonStore.baseInfo.height - 110) * 1) / 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography fontWeight="bold">
                    {wordList["최근 작업물"][commonStore.appInfo.language]}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  ></Box>
                </Box>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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
              {/* <Box sx={{}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography fontWeight="bold">
                    {wordList["공지사항"][commonStore.appInfo.language]}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button size="small" variant="contained" sx={{}}>
                      {wordList["더보기"][commonStore.appInfo.language]}
                    </Button>
                  </Box>
                </Box>
              </Box> */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}

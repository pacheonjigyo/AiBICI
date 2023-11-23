import * as React from "react";

import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

import { Refresh } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Report(): JSX.Element {
  const theme = useTheme();

  const { id } = useParams();
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["레포트"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    if (!id) {
      return;
    }

    identityDataStore.getDetailedData(id);

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
        <Grid container spacing={"14px"}>
          <Grid item xs={commonStore.isDesktop ? 6 : 12}>
            <Paper
              variant="outlined"
              sx={{
                boxShadow: `0px 3px 7px 0px ${
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,.1)"
                    : "rgba(255,255,255,.1)"
                }`,
                p: 3,
                height: ((commonStore.baseInfo.height - 124) * 1) / 2,
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
                  {wordList["노출수"][commonStore.appInfo.language]}
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
            </Paper>
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
                p: 3,
                height: ((commonStore.baseInfo.height - 124) * 1) / 2,
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
                  {wordList["유입수"][commonStore.appInfo.language]}
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
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                boxShadow: `0px 3px 7px 0px ${
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,.1)"
                    : "rgba(255,255,255,.1)"
                }`,
                p: 3,
                height: ((commonStore.baseInfo.height - 124) * 1) / 2,
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
                  {wordList["월간레포트"][commonStore.appInfo.language]}
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}

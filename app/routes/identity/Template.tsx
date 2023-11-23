import * as React from "react";
import Image from "../../common/Image.js";

import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Typography,
  useTheme,
} from "@mui/material";

import { Refresh } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Template(): JSX.Element {
  const theme = useTheme();

  const { id } = useParams();
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["템플릿"][commonStore.appInfo.language],
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
          <Grid item xs={commonStore.isDesktop ? 4 : 12}>
            <Paper
              variant="outlined"
              sx={{
                boxShadow: `0px 3px 7px 0px ${
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,.1)"
                    : "rgba(255,255,255,.1)"
                }`,
                p: 3,
                height: (commonStore.baseInfo.height - 110) * 1,
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
                  {wordList["브랜드 템플릿"][commonStore.appInfo.language]}
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

              <Box
                sx={{
                  height: ((commonStore.baseInfo.height - 180) * 1) / 2 - 106,
                }}
              >
                <Select
                  fullWidth
                  sx={{
                    mb: 3,
                  }}
                  value="Default"
                >
                  <MenuItem value="Default">Default</MenuItem>
                </Select>

                <Box
                  sx={{
                    background: "black",
                    height: commonStore.baseInfo.height - 350,
                    overflowY: "auto",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={
                      "https://images01.nicepagecdn.com/page/11/80/html-template-preview-118049.webp"
                    }
                    style={{
                      width: "100%",
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={commonStore.isDesktop ? 8 : 12}>
            <Paper
              variant="outlined"
              sx={{
                boxShadow: `0px 3px 7px 0px ${
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,.1)"
                    : "rgba(255,255,255,.1)"
                }`,
                p: 3,
                height: (commonStore.baseInfo.height - 110) * 1,
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
                  {wordList["브랜드 추천 템플릿"][commonStore.appInfo.language]}
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

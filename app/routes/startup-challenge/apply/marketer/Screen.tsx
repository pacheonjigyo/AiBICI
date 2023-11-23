import * as React from "react";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Add, AutoAwesome } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { readAsDataURLAsync } from "../../../../common/FileManager.js";
import { uploadToS3 } from "../../../../common/FileUpload.js";
import { usePageEffect } from "../../../../core/page.js";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";

export default function DrawScreen(): JSX.Element {
  const { canvasStore, commonStore, engineDataStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          height: commonStore.isDesktop ? commonStore.baseInfo.height : "auto",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background: "url('/resources/checker_board.png')",
            height: commonStore.isDesktop
              ? commonStore.baseInfo.height - 110
              : commonStore.baseInfo.width,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              borderColor: "divider",
            }}
          >
            {engineDataStore.logoInfo.url ? (
              <img
                src={engineDataStore.logoInfo.url}
                style={{
                  width: commonStore.isDesktop
                    ? 450
                    : commonStore.baseInfo.width - 32,
                  height: commonStore.isDesktop
                    ? 450
                    : commonStore.baseInfo.width - 32,
                }}
              />
            ) : (
              <Button
                color="inherit"
                variant="contained"
                component="label"
                sx={{
                  ml: 1,
                  fontSize: 18,
                }}
                style={{
                  width: commonStore.isDesktop
                    ? 450
                    : commonStore.baseInfo.width - 32,
                  height: commonStore.isDesktop
                    ? 450
                    : commonStore.baseInfo.width - 32,
                }}
              >
                <input
                  type="file"
                  hidden
                  onChange={async (e: any) => {
                    const file = e.target.files[0];

                    if (!file) {
                      return;
                    }

                    const base64: any = await readAsDataURLAsync(file);
                    const url: any = await uploadToS3(
                      base64.split(",")[1],
                      `test/images_${new Date().getTime()}`,
                      file.name.split(".")[1],
                      file.type,
                    );

                    engineDataStore.setLogoInfo({
                      ...engineDataStore.logoInfo,

                      url,
                      type: "upload",
                    });
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Add
                    sx={{
                      mb: 3,

                      fontSize: 48,
                    }}
                  />

                  <Typography fontSize={18} fontWeight="bold">
                    클릭하여 이미지 업로드
                  </Typography>
                </Box>
              </Button>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: "background.paper",
            borderTop: 1,
            borderColor: "divider",

            width: "100%",
            height: commonStore.isDesktop ? 110 : "auto",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            p: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={commonStore.isDesktop ? 6 : 12}>
              <TextField
                autoFocus
                fullWidth
                placeholder="어떻게 바꿔볼까요?"
                inputProps={{
                  style: {
                    // fontSize: 20,
                    padding: 18,
                  },
                }}
                onChange={(e) => {
                  engineDataStore.setLogoInfo({
                    ...engineDataStore.logoInfo,

                    prompt: e.target.value,
                  });
                }}
                value={engineDataStore.logoInfo.prompt}
              />
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 6 : 12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: commonStore.isDesktop
                    ? "right"
                    : "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  color="info"
                  variant="contained"
                  sx={{
                    ml: 1,
                    fontSize: 18,
                    minWidth: 100,
                    height: 60,
                  }}
                  onClick={() => {
                    engineDataStore.setLogoInfo({
                      ...engineDataStore.logoInfo,

                      url: "",
                      type: "upload",
                    });
                  }}
                >
                  초기화
                </Button>

                <Button
                  disabled={engineDataStore.isEngineBusy}
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 1,
                    width: commonStore.isDesktop ? 180 : 140,
                    height: 60,
                    fontSize: 18,
                  }}
                  onClick={async () => {
                    engineDataStore.changeLogo(4);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {engineDataStore.isEngineBusy ? (
                      <>
                        <CircularProgress size="1rem" /> &nbsp; 생성 중...
                      </>
                    ) : (
                      <>
                        <AutoAwesome /> &nbsp; 생성하기
                      </>
                    )}
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  ));
}

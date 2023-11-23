import * as React from "react";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";

import { AutoAwesome } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { CanvasSketch } from "../../../../common/CanvasSketch.js";
import { uploadToS3 } from "../../../../common/FileUpload.js";
import { usePageEffect } from "../../../../core/page.js";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";

export default function DrawScreen(): JSX.Element {
  const userRef = React.useRef(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const { canvasStore, commonStore, engineStore, engineDataStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  let test = 0;

  React.useEffect(() => {
    test++;

    if (test === 2) {
      return;
    }

    const editor = new CanvasSketch(commonStore);

    canvasStore.setSketch(editor);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engineStore.step]);

  return useObserver(() => (
    <>
      <Box
        sx={{
          background: "url('/resources/checker_board.png')",
          width: "100%",
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
            border: 1,
            borderColor: "divider",
          }}
        >
          <canvas id="sketch" width={0} height={0}></canvas>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",

          width: "100%",
          height: commonStore.isDesktop ? 110 : "auto",

          p: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={commonStore.isDesktop ? 6 : 12}>
            <TextField
              autoFocus
              fullWidth
              placeholder="무엇을 그려볼까요?"
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
                disabled={engineDataStore.isEngineBusy}
                variant="contained"
                color="inherit"
                sx={{
                  // ml: 1,
                  fontSize: 18,
                  height: 60,
                  minWidth: 100,
                  width: commonStore.isDesktop ? 180 : 100,
                }}
                onClick={() => {
                  canvasStore.sketch.clearCanvas();

                  engineDataStore.setLogoInfo({
                    ...engineDataStore.logoInfo,

                    url: "",
                    result: null,
                    type: "drawing",
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
                  const base64 = canvasStore.sketch.getCanvasDataURL();

                  const url: any = await uploadToS3(
                    base64,
                    `test/images_${new Date().getTime()}`,
                    "jpg",
                    "image/jpeg",
                  );

                  engineDataStore.setLogoInfo({
                    ...engineDataStore.logoInfo,

                    url,
                  });

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
    </>
  ));
}

import * as React from "react";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  useTheme,
} from "@mui/material";

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
          height: 268,
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
          mt: 3,

          // bgcolor: "background.paper",
          // borderTop: 1,
          // borderColor: "divider",

          width: "100%",
          // height: commonStore.isDesktop ? 110 : "auto",

          // p: 3,
        }}
      >
        <TextField
          // color="primary"
          size="small"
          autoFocus
          fullWidth
          placeholder="무엇을 그려볼까요?"
          inputProps={{
            style: {
              color: "white",
            },
          }}
          onChange={(e) => {
            engineDataStore.setLogoInfo({
              ...engineDataStore.logoInfo,

              prompt: e.target.value,
            });
          }}
          value={engineDataStore.logoInfo.prompt}
          sx={{
            mb: 1,
          }}
        />

        <Button
          disabled={engineDataStore.isEngineBusy}
          variant="contained"
          color="inherit"
          fullWidth
          onClick={() => {
            canvasStore.sketch.clearCanvas();

            engineDataStore.setLogoInfo({
              ...engineDataStore.logoInfo,

              url: "",
              result: null,
              type: "drawing",
            });
          }}
          sx={{
            mb: 1,
          }}
        >
          초기화
        </Button>

        <Button
          disabled={engineDataStore.isEngineBusy}
          variant="contained"
          color="primary"
          fullWidth
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

            window.location.href = "/ai-branding/create#/logo-main";
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
              <>생성하기</>
            )}
          </Box>
        </Button>
      </Box>
    </>
  ));
}

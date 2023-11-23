import * as React from "react";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { Add } from "@mui/icons-material";
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
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            {engineDataStore.logoInfo.url ? (
              <img
                src={engineDataStore.logoInfo.url}
                style={{
                  width: 268,
                  height: 268,
                }}
              />
            ) : (
              <Button
                color="inherit"
                variant="contained"
                component="label"
                sx={{
                  fontSize: 18,
                }}
                style={{
                  width: 268,
                  height: 268,
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
            mt: 3,

            borderTop: 1,
            borderColor: "divider",

            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            autoFocus
            fullWidth
            placeholder="어떻게 바꿔볼까요?"
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
          />

          <Button
            color="info"
            variant="contained"
            fullWidth
            onClick={() => {
              engineDataStore.setLogoInfo({
                ...engineDataStore.logoInfo,

                url: "",
                type: "upload",
              });
            }}
            sx={{
              mt: 1,
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
      </Box>
    </>
  ));
}

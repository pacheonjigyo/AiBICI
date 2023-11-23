import * as React from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { readAsDataURLAsync } from "../../../../common/FileManager.js";
import { uploadToS3 } from "../../../../common/FileUpload.js";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";

export default function Page3(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const { commonStore, engineDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          background: "#f1f1f1",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: commonStore.isDesktop ? "column" : "column-reverse",
            alignItems: "center",
            justifyContent: commonStore.isDesktop ? "center" : "center",
            height: commonStore.device === "tablet" ? 1000 : 882,
            position: "relative",
          }}
          maxWidth="lg"
        >
          <Typography
            sx={{
              lineHeight: 1.2,
              display: "flex",
              mb: 10,
            }}
            align="center"
            fontSize={
              commonStore.isDesktop
                ? 55
                : commonStore.appInfo.language === "ko"
                ? 40
                : 32
            }
            fontWeight="bold"
          >
            {`${
              commonStore.appInfo.language === "ko"
                ? "브랜드를 생성하는 또다른 방법"
                : "Ease and Speedily,"
            }`
              .split("")
              .map((v, i) => (
                <div key={i}>
                  {v === " " ? <>&nbsp;</> : null}

                  <div
                    key={i}
                    data-aos="fade-down"
                    data-aos-delay={i * 50}
                    data-aos-duration={500}
                  >
                    {v}
                  </div>
                </div>
              ))}
          </Typography>

          <Grid container spacing={3}>
            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography fontWeight={"bold"} fontSize={20}>
                <span style={{ fontSize: 40 }}>1</span>분 안에 내 브랜드 만들기
              </Typography>

              <Box
                sx={{
                  border: "3px solid #333333",
                  boxShadow: `0px 3px 7px 0px ${
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,.1)"
                      : "rgba(255,255,255,.1)"
                  }`,

                  width: "100%",
                  height: 200,
                  m: "auto",

                  display: "flex",
                  justifyContent: commonStore.isDesktop ? "center" : "center",
                  alignItems: "center",

                  p: 3,
                }}
              >
                {commonStore.isDesktop ? (
                  <Paper
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <TextField
                      color="info"
                      fullWidth
                      label={
                        wordList["브랜드명 입력하기"][
                          commonStore.appInfo.language
                        ]
                      }
                      inputProps={{
                        style: {
                          fontSize: 18,
                          height: 27,
                        },
                      }}
                      onChange={(e) => {
                        engineDataStore.setBrandInfo({
                          ...engineDataStore.brandInfo,
                          name: e.target.value,
                        });
                      }}
                    />
                  </Paper>
                ) : null}
                &nbsp;
                <Button
                  color="info"
                  variant="contained"
                  sx={{
                    fontSize: 18,
                    minWidth: 200,
                    height: 60,
                  }}
                  onClick={async () => {
                    const url = "/ai-branding/create";

                    const result = await commonStore.syncAppInfo(
                      commonStore.appInfo.isAdmin,
                      true,
                      url,
                    );

                    if (!result) {
                      return;
                    }

                    navigate(url);
                  }}
                >
                  {wordList["무료로 시작하기"][commonStore.appInfo.language]}
                </Button>
              </Box>
            </Grid>

            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography fontWeight={"bold"} fontSize={20}>
                <span style={{ fontSize: 40 }}>10</span>초 안에 내 이미지
                수정하기
              </Typography>

              <Box
                sx={{
                  border: "3px dashed #333333",
                  boxShadow: `0px 3px 7px 0px ${
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,.1)"
                      : "rgba(255,255,255,.1)"
                  }`,

                  width: "100%",
                  height: 200,
                  m: "auto",

                  display: "flex",

                  alignItems: "center",
                  justifyContent: "center",

                  p: 3,
                }}
              >
                <Typography fontSize={18} fontWeight="bold">
                  드래그하여 업로드
                </Typography>
                &nbsp;
                <Typography fontSize={18}>또는</Typography>
                &nbsp;
                <Button
                  disabled
                  color="info"
                  variant="contained"
                  component="label"
                  sx={{
                    fontSize: 18,
                    minWidth: 200,
                    height: 60,
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
                      });

                      engineDataStore.changeLogo(1);
                    }}
                  />
                  Comming Soon
                </Button>{" "}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  ));
}

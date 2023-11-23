import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { BorderLinearProgress } from "../../../common/BorderLinearProgress.js";
import { getPaletteAsync } from "../../../common/ColorThief.js";
import { readAsDataURLAsync } from "../../../common/FileManager.js";
import { getRealUrl, uploadToS3 } from "../../../common/FileUpload.js";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function LogoMain(): JSX.Element {
  const { commonStore, engineDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,

          p: 2,

          display: "flex",
          alignItems: "center",

          width: 300,
          height: 50,
        }}
      >
        <Typography fontSize={15} fontWeight="bold">
          11. <Language label="로고" />
        </Typography>
      </Box>

      <Box
        className="hideScroll"
        sx={{
          mt: 1,

          bgcolor: "background.paper",
          borderRadius: 1,

          p: 2,

          width: 300,
          height: commonStore.baseInfo.height - 164,

          overflowY: "auto",
        }}
      >
        <Typography>
          브랜드 로고는 특정 브랜드를 대표하고 구별하는 데 사용되는 그래픽
          디자인이에요.
          <br />
          <br />
          로고는 시각적인 심볼, 아이콘, 문구, 또는 그 조합으로 구성되어 있어요.
          <br />
          <br />
          로고는 브랜드의 식별성을 강화하고 소비자에게 강력한 인상을 전달하는 데
          사용되고 있어요.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>브랜드 로고</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              color="info"
              onClick={() => {
                window.location.href = "/ai-branding/create#/logo-auto";
              }}
            >
              생성가이드
            </Button>

            <Button color="info" component="label">
              업로드
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

                  engineDataStore.setBrandInfo({
                    ...engineDataStore.brandInfo,

                    logo: url,
                  });
                }}
              />
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            border: 1,
            borderRadius: 1,

            p: 3,

            width: 268,
            height: 268,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {engineDataStore.isEngineBusy ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    mb: 1,
                  }}
                  align="center"
                >
                  {engineDataStore.engineProcessed > 90
                    ? "조금만 더 기다려주세요."
                    : "브랜드 로고 만드는 중..."}
                </Typography>

                <BorderLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={engineDataStore.engineProcessed}
                  sx={{
                    width: "100%",
                    height: 15,

                    borderRadius: "1rem",
                  }}
                />
              </Box>
            </>
          ) : engineDataStore.brandInfo.logo ? (
            <img src={engineDataStore.brandInfo.logo} width="100%" />
          ) : (
            "로고를 만들어주세요."
          )}
        </Box>

        <Grid
          container
          spacing={1}
          sx={{
            mt: 0,
          }}
        >
          {engineDataStore.brandIdentity.logo.map((v, i) =>
            v.result.predictions.map((w, j) => {
              return (
                <Grid
                  key={j}
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    sx={{
                      border:
                        engineDataStore.brandInfo.resulted.logo === i &&
                        engineDataStore.brandInfo.selected.logo === j
                          ? "2px solid #8265ff"
                          : "2px solid whitesmoke",
                      boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                    }}
                    onClick={async () => {
                      engineDataStore.setBrandInfo({
                        ...engineDataStore.brandInfo,

                        logo: w,

                        selected: {
                          ...engineDataStore.brandInfo.selected,

                          logo: j,
                        },

                        resulted: {
                          ...engineDataStore.brandInfo.resulted,

                          logo: i,
                        },
                      });

                      const realUrl = getRealUrl(
                        engineDataStore.brandInfo.logo,
                      );

                      const color = await getPaletteAsync(realUrl);

                      engineDataStore.setBrandInfo({
                        ...engineDataStore.brandInfo,

                        color,
                      });
                    }}
                  >
                    <CardActionArea>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={w}
                          alt={`로고결과이미지${j + 1}`}
                        />

                        {v.result.recommend ? (
                          <>
                            {Math.ceil(v.result.recommend[j].order) < 9 ? (
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: "50%",

                                  transform: "translateX(-50%)",

                                  // rotate:
                                  //   "-30deg",

                                  border: 1,
                                  borderColor: "divider",

                                  bgcolor: "yellow",

                                  width: "100%",

                                  textAlign: "center",
                                }}
                              >
                                <Typography
                                  fontSize={14}
                                  fontWeight="bold"
                                  color="red"
                                >
                                  {Math.ceil(v.result.recommend[j].order)}위
                                </Typography>
                              </Box>
                            ) : null}
                          </>
                        ) : null}
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            }),
          )}
        </Grid>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/overview";
          }}
        >
          메인화면으로 이동
        </Button>
      </Box>
    </>
  ));
}

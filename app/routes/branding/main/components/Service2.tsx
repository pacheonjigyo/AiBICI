import * as React from "react";

import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";

import { useObserver } from "mobx-react";
import { AppContext } from "../../../../stores/index.js";

export default function Page5(): JSX.Element {
  const theme = useTheme();

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: commonStore.isDesktop ? "column" : "column-reverse",
            alignItems: "center",
            justifyContent: commonStore.isDesktop ? "center" : "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: -31.5,

              height: 600,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderLeft: "3px solid #8265ff",
                height: "100%",
              }}
            ></div>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 230 - 130,
              left: -40,
            }}
          >
            <div
              style={{
                background: "white",
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "5px solid #8265ff",
              }}
            ></div>
          </Box>

          <Box
            sx={{
              backgroundImage:
                theme.palette.mode === "light"
                  ? `url('/resources/${
                      commonStore.isDesktop
                        ? "background_yellow.jpg"
                        : commonStore.device === "tablet"
                        ? "background_yellow.jpg"
                        : "background_yellow.jpg"
                    }')`
                  : "unset",
              backgroundSize: "cover",
              backgroundPosition: commonStore.isDesktop ? "center" : "center",

              borderLeft: 1,
              borderRight: 1,
              borderColor: "divider",

              // border: 1,
              // borderColor: "divider",

              px: 10,
              py: 5,
            }}
          >
            <Grid container>
              <Grid
                item
                xs={commonStore.device === "mobile" ? 12 : 6}
                sx={{
                  m: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      commonStore.device === "mobile" ? "center" : "left",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    p: 3,
                  }}
                  data-aos="fade-up"
                  data-aos-duration={1000}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      width: "90%",
                      p: 3,
                      borderRadius: "1rem",
                      boxShadow: `0px 3px 7px 0px ${
                        theme.palette.mode === "light"
                          ? "rgba(0,0,0,.1)"
                          : "rgba(255,255,255,.1)"
                      }`,
                      position: "relative",
                    }}
                  >
                    <video autoPlay loop muted playsInline width={"100%"}>
                      <source src="/resources/step2.mp4" type="video/mp4" />
                    </video>

                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: commonStore.isDesktop ? 150 : 100,
                        height: commonStore.isDesktop ? 150 : 100,

                        transform: "translate(+50%, -60%)",
                      }}
                    >
                      <img src="/resources/pencil.svg" />
                    </Box>
                  </Paper>
                </Box>
              </Grid>

              <Grid
                item
                xs={commonStore.device === "mobile" ? 12 : 6}
                sx={{
                  m: "auto",
                }}
              >
                <Box
                  sx={{
                    textAlign: commonStore.isDesktop ? "left" : "center",
                    paddingLeft: commonStore.isDesktop ? "100px" : 0,
                    paddingBottom: commonStore.isDesktop ? 0 : "10px",
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "42px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    color="secondary"
                    fontSize={18}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    <span style={{ fontWeight: "bold" }}>STEP</span>{" "}
                    <span style={{ fontSize: 64, fontWeight: "bold" }}>02</span>
                  </Typography>

                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "34px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    fontSize={commonStore.isDesktop ? 40 : 40}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        <span style={{ fontWeight: "bold" }}>카테고리</span>{" "}
                        선택
                      </>
                    ) : (
                      <>
                        Select{" "}
                        <span style={{ fontWeight: "bold" }}>Category</span>
                      </>
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#8f8f8f",
                      lineHeight: 1.4,
                      mb: "24px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    fontSize={commonStore.isDesktop ? 20 : 16}
                    fontWeight={400}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        원하는 로고 스타일에 대한 카테고리 선택,
                        <br />
                        선택한 카테고리는 컨셉, 색상 등의 디자인
                        <br />
                        요소에 큰 영향을 미칩니다.
                      </>
                    ) : (
                      <>
                        Select a category for the desired logo style,
                        <br />
                        The selected category has a significant impact on design
                        elements such as concepts and colors I{"'"}m going to do
                        that{"'"}s it.
                      </>
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      lineHeight: 1.4,
                      mb: "42px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    color="#8265FF"
                    fontSize={commonStore.isDesktop ? 16 : 14}
                    fontWeight={500}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        # 인공지능
                        <br />
                        # 로고 생성 서비스
                        <br /># 나만의 키워드
                      </>
                    ) : (
                      <>
                        # Artificial intelligence
                        <br />
                        # Logo Generation Services
                        <br /># My own keyword
                      </>
                    )}
                  </Typography>

                  {/* <Button
                    color="secondary"
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
                  </Button> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  ));
}

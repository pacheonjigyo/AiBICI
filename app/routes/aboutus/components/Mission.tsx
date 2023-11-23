import * as React from "react";
import Image from "../../../common/Image.js";

import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { wordList } from "../../../data/words.js";
import { AppContext } from "../../../stores/index.js";

export default function Mission(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 10,
          py: 5,
        }}
        maxWidth="lg"
      >
        <Typography
          sx={{
            lineHeight: 1.4,
            mb: 3,
          }}
          fontSize={commonStore.isDesktop ? 24 : 18}
          fontWeight={400}
          align="left"
          data-aos="fade-in"
          data-aos-duration={1000}
        >
          <span style={{ fontWeight: "bold" }}>
            {wordList["미션"][commonStore.appInfo.language]}
          </span>
        </Typography>

        <Box
          sx={{
            maxWidth: 1200,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={commonStore.isDesktop ? 4 : 12}
              sx={{
                m: "auto",
              }}
            >
              <Paper
                sx={{
                  borderRadius: "1em",
                  boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: commonStore.isDesktop
                    ? "left"
                    : "space-between",
                  alignItems: "center",
                  padding: 3,
                  height: 300,
                }}
                data-aos="flip-left"
                data-aos-duration={1000}
              >
                <Image
                  src="/resources/mission-01.png"
                  style={{
                    width: 140,
                    height: 140,
                  }}
                  alt="미션이미지1"
                />

                <Box
                  sx={{
                    width: commonStore.appInfo.language === "ko" ? 240 : 300,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                    }}
                    align="center"
                    fontSize={commonStore.isDesktop ? 20 : 18}
                    fontWeight={500}
                    textAlign="center"
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        스토리텔링의 시각화가
                        <br />
                        제공되는 세계최초의
                        <br />
                        BI/CI 생성 엔진 개발
                      </>
                    ) : (
                      <>
                        Development of the world{`'`}s
                        <br />
                        first BI/CI generation engine
                        <br />
                        with visualization of storytelling
                      </>
                    )}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 4 : 12}>
              <Paper
                sx={{
                  borderRadius: "1em",
                  boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: commonStore.isDesktop
                    ? "left"
                    : "space-between",
                  alignItems: "center",
                  padding: 3,
                  height: 300,
                }}
                data-aos="flip-left"
                data-aos-duration={1000}
              >
                <Image
                  src="/resources/mission-02.png"
                  style={{ width: 140, height: 140 }}
                  alt="미션이미지2"
                />

                <Box
                  sx={{
                    width: commonStore.appInfo.language === "ko" ? 240 : 300,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                    }}
                    align="center"
                    fontSize={commonStore.isDesktop ? 20 : 18}
                    fontWeight={500}
                    textAlign="center"
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        트랜드를 반영하고
                        <br />
                        선호도와 순위에 대한
                        <br />
                        추천알고리즘이 적용되어
                        <br />
                        사용자 맞춤 기능 구현
                      </>
                    ) : (
                      <>
                        Reflects trends and applies
                        <br />
                        recommendation algorithms
                        <br />
                        for preferences and rankings
                        <br />
                        for customization
                      </>
                    )}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 4 : 12}>
              <Paper
                sx={{
                  borderRadius: "1em",
                  boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: commonStore.isDesktop
                    ? "left"
                    : "space-between",
                  alignItems: "center",
                  padding: 3,
                  height: 300,
                }}
                data-aos="flip-left"
                data-aos-duration={1000}
              >
                <Image
                  src="/resources/mission-03.png"
                  style={{ width: 140, height: 140 }}
                  alt="미션이미지3"
                />

                <Box
                  sx={{
                    width: commonStore.appInfo.language === "ko" ? 240 : 300,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                    }}
                    align="center"
                    fontSize={commonStore.isDesktop ? 20 : 18}
                    fontWeight={500}
                    textAlign="center"
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        브랜드기반 토탈 마케팅
                        <br />
                        솔루션 서비스 제공
                      </>
                    ) : (
                      <>
                        Provides brand-based
                        <br />
                        total marketing solution services
                      </>
                    )}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  ));
}

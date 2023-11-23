import * as React from "react";
import Image from "../../../../common/Image.js";

import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../../../stores/index.js";

export default function Why(): JSX.Element {
  const theme = useTheme();
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          background: theme.palette.mode === "light" ? "#F1F1F1" : "unset",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: commonStore.isDesktop ? 1200 : 1500,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: commonStore.isDesktop ? "column" : "column-reverse",
            alignItems: "center",
            justifyContent: commonStore.isDesktop ? "center" : "center",
            position: "relative",
          }}
          maxWidth="lg"
        >
          <Typography
            sx={{
              lineHeight: 1.2,
              mb: "24px",
            }}
            align="center"
            color="secondary"
            fontSize={18}
          >
            <span style={{ fontWeight: "bold" }}>Overview</span>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {`${
              commonStore.appInfo.language === "ko"
                ? "브랜딩은 어렵다? No!"
                : "Branding is hard? No!"
            }`
              .split("")
              .map((v, i) => (
                <div key={i}>
                  {v === " " ? (
                    <div
                      style={{
                        width: commonStore.isDesktop ? 24 : 16,
                      }}
                    ></div>
                  ) : null}

                  <Typography
                    data-aos="fade-in"
                    data-aos-delay={
                      i < (commonStore.appInfo.language === "ko" ? 9 : 18)
                        ? i * 50
                        : 1000 + i * 50
                    }
                    data-aos-duration={1000}
                    style={{
                      color: "#6B4C8E",
                      fontFamily: "Cafe24ShiningStar",
                      fontSize: commonStore.isDesktop ? 120 : 54,
                    }}
                  >
                    {v}
                  </Typography>
                </div>
              ))}
          </Box>

          <Typography
            sx={{
              lineHeight: 1.2,
              mb: 10,
            }}
            align="center"
            fontSize={
              commonStore.isDesktop
                ? 55
                : commonStore.appInfo.language === "ko"
                ? 40
                : 24
            }
          >
            {commonStore.appInfo.language === "ko" ? (
              <>
                <span data-aos="fade" data-aos-duration={1000}>
                  <span style={{ fontWeight: "bold" }}>새로운 비즈니스</span>를{" "}
                  {commonStore.isDesktop ? null : <br />}지원하기 위한
                </span>

                <br />

                <span data-aos="fade" data-aos-duration={1000}>
                  인공지능 알고리즘{commonStore.isDesktop ? " " : <br />}
                  <span style={{ fontWeight: "bold" }}>브랜딩 생성 플랫폼</span>
                </span>
              </>
            ) : (
              <>
                <span data-aos="fade" data-aos-duration={1000}>
                  AI Algorithmic
                  <br />
                  <span style={{ fontWeight: "bold" }}>
                    Branding Creation Platform
                  </span>
                </span>

                <br />

                <span data-aos="fade" data-aos-duration={1000}>
                  to Support{" "}
                  <span style={{ fontWeight: "bold" }}>New Business.</span>
                </span>
              </>
            )}
          </Typography>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Grid container spacing={4} padding={2}>
              <Grid
                item
                xs={commonStore.isDesktop ? 3 : 6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                <Image
                  src="/resources/service_summary-01.png"
                  style={{ width: 135, height: 135 }}
                  alt="네이밍생성서비스이미지"
                />

                <Box
                  sx={{
                    mt: "22px",
                    mb: "32px",
                    maxWidth: 240,
                    height: commonStore.appInfo.language === "ko" ? 180 : 240,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "32px",
                    }}
                    align="center"
                    fontSize={commonStore.isDesktop ? 22 : 16}
                    fontWeight="bold"
                  >
                    {commonStore.appInfo.language === "ko"
                      ? "텍스트 생성 서비스"
                      : "Text Creation Service"}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#8f8f8f",
                      lineHeight: 1.2,
                    }}
                    align="left"
                    fontSize={
                      commonStore.isDesktop
                        ? 18
                        : commonStore.appInfo.language === "ko"
                        ? 16
                        : 15
                    }
                  >
                    {commonStore.appInfo.language === "ko"
                      ? "심도컴퍼니와 대한민국 최고의 인공지능 연구진의 노하우를 담아낸 알고리즘으로 텍스트를 생성합니다."
                      : "It creates text with algorithms that contain the know-how of Deep Company and Korea's best artificial intelligence researchers."}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={commonStore.isDesktop ? 3 : 6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                <Image
                  src="/resources/service_summary-02.png"
                  style={{ width: 135, height: 135 }}
                  alt="로고생성서비스이미지"
                />

                <Box
                  sx={{
                    mt: "22px",
                    mb: "32px",
                    maxWidth: 240,
                    height: commonStore.appInfo.language === "ko" ? 180 : 240,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "32px",
                    }}
                    align="center"
                    fontSize={commonStore.isDesktop ? 22 : 16}
                    fontWeight="bold"
                  >
                    {commonStore.appInfo.language === "ko"
                      ? "로고 생성 서비스"
                      : "Logo Creation Service"}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#8f8f8f",
                      lineHeight: 1.2,
                    }}
                    align="left"
                    fontSize={
                      commonStore.isDesktop
                        ? 18
                        : commonStore.appInfo.language === "ko"
                        ? 16
                        : 15
                    }
                  >
                    {commonStore.appInfo.language === "ko"
                      ? "스토리 기반으로 만들어진 유니크한 로고 생성, 다양한 편집툴과 트랜드를 반영한 추천기술을 제공합니다."
                      : "It provides unique logo creation based on stories, and recommended technology that reflects various editing tools and trends."}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={commonStore.isDesktop ? 3 : 6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                <Image
                  src="/resources/service_summary-03.png"
                  style={{ width: 135, height: 135 }}
                  alt="브랜드아이덴티티제공이미지"
                />

                <Box
                  sx={{
                    mt: "22px",
                    mb: "32px",
                    maxWidth: 240,
                    height: commonStore.appInfo.language === "ko" ? 180 : 240,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "32px",
                    }}
                    align="center"
                    fontSize={commonStore.isDesktop ? 22 : 16}
                    fontWeight="bold"
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      "브랜드 아이덴티티"
                    ) : (
                      <>
                        Delivering
                        <br />
                        Brand Identity
                      </>
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#8f8f8f",
                      lineHeight: 1.2,
                    }}
                    align="left"
                    fontSize={
                      commonStore.isDesktop
                        ? 18
                        : commonStore.appInfo.language === "ko"
                        ? 16
                        : 15
                    }
                  >
                    {commonStore.appInfo.language === "ko"
                      ? "기억에 오래 남는 스토리가 담긴 브랜드를 제공합니다."
                      : "We offer brands with long-lasting stories."}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={commonStore.isDesktop ? 3 : 6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                <Image
                  src="/resources/service_summary-04.png"
                  style={{ width: 135, height: 135 }}
                  alt="브랜드전략제공이미지"
                />

                <Box
                  sx={{
                    mt: "22px",
                    mb: "32px",
                    maxWidth: 240,
                    height: commonStore.appInfo.language === "ko" ? 180 : 240,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "32px",
                    }}
                    align="center"
                    fontSize={commonStore.isDesktop ? 22 : 16}
                    fontWeight="bold"
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      "브랜드 전략 제공"
                    ) : (
                      <>
                        Delivering
                        <br />
                        Brand Strategy
                      </>
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#8f8f8f",
                      lineHeight: 1.2,
                    }}
                    align="left"
                    fontSize={
                      commonStore.isDesktop
                        ? 18
                        : commonStore.appInfo.language === "ko"
                        ? 16
                        : 15
                    }
                  >
                    {commonStore.appInfo.language === "ko"
                      ? "인공지능이 제안하는 브랜드 전략은 물론, 브랜드 전문가가 성공적인 브랜드를 만드실 수 있도록 1:1 컨설팅 서비스를 제공합니다."
                      : "In addition to the brand strategy proposed by artificial intelligence, we provide 1:1 consulting services to help brand experts create a successful brand."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  ));
}

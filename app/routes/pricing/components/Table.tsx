import * as React from "react";
import Image from "../../../common/Image.js";

import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { wordList } from "../../../data/words.js";
import { AppContext } from "../../../stores/index.js";

export default function Table(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 5,
        }}
      >
        <Typography
          sx={{
            lineHeight: 1.2,
            mb: 1,
          }}
          fontSize={commonStore.isDesktop ? 50 : 40}
          data-aos="fade-in"
          data-aos-duration={1000}
        >
          <span style={{ fontWeight: "bold" }}>
            {wordList["가격"][commonStore.appInfo.language]}
          </span>
        </Typography>

        <Typography
          sx={{
            lineHeight: 1.2,
            mb: 5,
          }}
          align="center"
          fontSize={commonStore.isDesktop ? 18 : 16}
          data-aos="fade-in"
          data-aos-duration={1000}
        >
          {
            wordList["브랜드에 적합한 패키지를 선택하실 수 있습니다."][
              commonStore.appInfo.language
            ]
          }
        </Typography>

        <Box
          sx={{
            maxWidth: 1200,
          }}
        >
          <Grid container spacing={2} padding={2}>
            <Grid item xs={commonStore.isDesktop ? 4 : 12}>
              <Box
                sx={{
                  p: 0,
                  width: "100%",
                }}
                data-aos="slide-up"
                data-aos-duration={1000}
              >
                <Paper
                  sx={{
                    border: "none",
                    borderRadius: "1em",
                    boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    width: "100%",
                  }}
                >
                  <Image
                    src="/resources/price_green.png"
                    style={{ width: 135, height: 135 }}
                    alt="리브랜딩서비스이미지"
                  />

                  <Box
                    sx={{
                      mt: "22px",
                      mb: "32px",
                      width: "100%",
                      height: 450,
                    }}
                  >
                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "14px",
                      }}
                      align="center"
                      fontSize={30}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {wordList["베이직"][commonStore.appInfo.language]}
                    </Typography>

                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "32px",
                      }}
                      align="center"
                      color="#797979"
                      fontSize={16}
                      textAlign="center"
                    >
                      {commonStore.appInfo.language === "ko"
                        ? "체험판"
                        : "Demo"}
                    </Typography>

                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "60px",
                      }}
                      align="center"
                      color="#7AC96A"
                      fontSize={22}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {commonStore.appInfo.language === "ko" ? "무료" : "FREE"}
                    </Typography>

                    <Button
                      style={{
                        background: "#7AC96A",
                        color: "white",
                        border: "none",
                        borderRadius: "1rem",
                        width: "100%",
                        height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        window.open(
                          "https://aibici.channel.io/lounge",
                          "_blank",
                          "height=680,width=370,top=100,left=200,scrollbars=yes,resizable=yes",
                        );
                      }}
                    >
                      {wordList["문의하기"][commonStore.appInfo.language]}
                    </Button>

                    <Divider
                      sx={{
                        my: 3,
                      }}
                    />

                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#7AC96A"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "월 생성 횟수 5회"
                            : "5 times a monthly generations"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#7AC96A"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "브랜드 슬롯 1개 제공"
                            : "1 monthly Brand Slot"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#7AC96A"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "브랜드 스타일 가이드"
                            : "Brand-style Guide"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#7AC96A"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "목업 이미지"
                            : "Mok-up Image"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#7AC96A"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "무제한 수정 & 다운로드"
                            : "Unlimited Modification & Downloads"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 4 : 12}>
              <Box
                sx={{
                  p: 0,
                  width: "100%",
                }}
                data-aos="slide-up"
                data-aos-duration={1000}
              >
                <Paper
                  sx={{
                    border: "none",
                    borderRadius: "1em",
                    boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    width: "100%",
                  }}
                >
                  <Image
                    src="/resources/price_purple.png"
                    style={{ width: 135, height: 135 }}
                    alt="통합브랜딩서비스이미지"
                  />

                  <Box
                    sx={{
                      mt: "22px",
                      mb: "32px",
                      width: "100%",
                      height: 450,
                    }}
                  >
                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "14px",
                      }}
                      align="center"
                      fontSize={30}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {wordList["비즈니스"][commonStore.appInfo.language]}
                    </Typography>

                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "32px",
                      }}
                      align="center"
                      color="#797979"
                      fontSize={16}
                      textAlign="center"
                    >
                      {commonStore.appInfo.language === "ko"
                        ? "가격 (월) / 가격 (년)"
                        : "Month / Year"}
                    </Typography>

                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "60px",
                      }}
                      align="center"
                      color="#8266FF"
                      fontSize={22}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {commonStore.appInfo.language === "ko"
                        ? "10만원 / 100만원"
                        : "$100 / $1000"}
                    </Typography>

                    <Button
                      style={{
                        background: "#8266FF",
                        color: "white",
                        border: "none",
                        borderRadius: "1rem",
                        width: "100%",
                        height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        window.open(
                          "https://aibici.channel.io/lounge",
                          "_blank",
                          "height=680,width=370,top=100,left=200,scrollbars=yes,resizable=yes",
                        );
                      }}
                    >
                      {commonStore.appInfo.language === "ko"
                        ? "문의하기"
                        : "Contact"}
                    </Button>

                    <Divider
                      sx={{
                        my: 3,
                      }}
                    />

                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#8266FF"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "월 생성 횟수 무제한"
                            : "Unlimited monthly generations"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#8266FF"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "슬롯 5개 제공"
                            : "5 monthly Brand Slots"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#8266FF"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "브랜드 스타일 가이드"
                            : "Brand-style Guide"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#8266FF"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "목업 이미지"
                            : "Mok-up Image"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#8266FF"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "무제한 수정 & 다운로드"
                            : "Unlimited Modification & Downloads"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#8266FF"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "월간 리포트"
                            : "A monthly Report"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#8266FF"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "1:1 전문가 매칭"
                            : "1:1 Expert matching"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 4 : 12}>
              <Box
                sx={{
                  p: 0,
                  width: "100%",
                }}
                data-aos="slide-up"
                data-aos-duration={1000}
              >
                <Paper
                  sx={{
                    border: "none",
                    borderRadius: "1em",
                    boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    width: "100%",
                  }}
                >
                  <Image
                    src="/resources/price_orange.png"
                    style={{ width: 135, height: 135 }}
                    alt="로고생성서비스이미지"
                  />

                  <Box
                    sx={{
                      mt: "22px",
                      mb: "32px",
                      width: "100%",
                      height: 450,
                    }}
                  >
                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "14px",
                      }}
                      align="center"
                      fontSize={30}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {wordList["엔터프라이즈"][commonStore.appInfo.language]}
                    </Typography>

                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "32px",
                      }}
                      align="center"
                      color="#797979"
                      fontSize={16}
                      textAlign="center"
                    >
                      -
                    </Typography>

                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: "60px",
                      }}
                      align="center"
                      color="#ED9564"
                      fontSize={22}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {commonStore.appInfo.language === "ko"
                        ? "영업팀에 문의"
                        : "Contact Us"}
                    </Typography>

                    <Button
                      style={{
                        background: "#ED9564",
                        color: "white",
                        border: "none",
                        borderRadius: "1rem",
                        width: "100%",
                        height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        window.open(
                          "https://aibici.channel.io/lounge",
                          "_blank",
                          "height=680,width=370,top=100,left=200,scrollbars=yes,resizable=yes",
                        );
                      }}
                    >
                      {wordList["문의하기"][commonStore.appInfo.language]}
                    </Button>

                    <Divider
                      sx={{
                        my: 3,
                      }}
                    />

                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#ED9564"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "퍼스널 패키지의 모든 기능"
                            : "All features of a <PERSONAL> package"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            lineHeight: 1.6,
                          }}
                          align="left"
                          color="#ED9564"
                          fontSize={16}
                        >
                          •{" "}
                          {commonStore.appInfo.language === "ko"
                            ? "더 많은 기능"
                            : "More features"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  ));
}

import * as React from "react";
import Image from "../../../common/Image.js";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { wordList } from "../../../data/words.js";
import { AppContext } from "../../../stores/index.js";

export default function Contact(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        maxWidth="lg"
      >
        <Grid
          container
          spacing={0}
          sx={{
            mb: 3,
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={
                {
                  // px: 3,
                  // py: 6,
                  // border: "none",
                  // borderRadius: "1em",
                  // boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                }
              }
            >
              <Typography
                sx={{
                  lineHeight: 1.2,
                  mb: 3,
                }}
                fontSize={commonStore.isDesktop ? 50 : 40}
                align="center"
                data-aos="fade-in"
                data-aos-duration={1000}
              >
                <span style={{ fontWeight: "bold" }}>CONTACT US</span>
              </Typography>

              <Typography
                sx={{
                  lineHeight: 1.2,
                  mb: 16,
                }}
                align="center"
                // fontSize={commonStore.isDesktop ? 20 : 18}
                // data-aos="fade-in"
                // data-aos-duration={1000}
              >
                {commonStore.appInfo.language === "ko" ? (
                  <>
                    우측 하단 퀵버튼 또는{" "}
                    <Button
                      size="small"
                      color="info"
                      variant="outlined"
                      onClick={() => {
                        window.open(
                          "https://aibici.channel.io",
                          "_blank",
                          "height=600,width=377,top=100,left=200,scrollbars=yes,resizable=yes",
                        );
                      }}
                    >
                      여기
                    </Button>{" "}
                    를 클릭하면 실시간으로 문의하실 수 있어요.
                  </>
                ) : (
                  <>
                    You can make real-time inquiries by clicking the chat icon
                    located at the bottom right.
                  </>
                )}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box data-aos="fade-in" data-aos-duration={1000}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.655292287374!2d129.2969188!3d35.512800899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35662d1431558035%3A0x20e53462bb9cc9bc!2z7Ius64-E7Lu07Y2864uI!5e0!3m2!1sko!2skr!4v1683514074209!5m2!1sko!2skr"
                width="100%"
                height="500"
                style={{
                  border: "none",
                  borderRadius: "1em",
                  boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                }}
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>
        </Grid>

        <Typography
          sx={{
            lineHeight: 1.4,
            mb: commonStore.isDesktop ? 1 : 3,
          }}
          fontSize={commonStore.isDesktop ? 22 : 18}
          fontWeight={400}
          align="left"
          data-aos="fade-in"
          data-aos-duration={1000}
        >
          <span style={{ fontWeight: "bold", margin: "0px 30px 0px 0px" }}>
            {wordList["주식회사 심도컴퍼니"][commonStore.appInfo.language]}
          </span>
          {commonStore.isDesktop ? null : <br />}
          {
            wordList[
              "울산광역시 남구 테크노산업로 55번길 10 UNIST관 AI Innovation Park, 203호"
            ][commonStore.appInfo.language]
          }
        </Typography>

        <Typography
          sx={{
            lineHeight: 1.4,
            mb: 5,
          }}
          fontSize={commonStore.isDesktop ? 16 : 14}
          fontWeight={400}
          align="left"
          data-aos="fade-in"
          data-aos-duration={1000}
        >
          TEL{" "}
          <span style={{ fontWeight: "bold", margin: "0px 30px 0px 10px" }}>
            052-920-9001
          </span>{" "}
          {commonStore.isDesktop ? null : <br />}
          Email{" "}
          <span style={{ fontWeight: "bold", margin: "0px 30px 0px 10px" }}>
            aibici.simdo@gmail.com
          </span>
        </Typography>

        <Box
          sx={{
            py: 6,
            border: "none",
            borderRadius: "1em",
          }}
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: commonStore.isDesktop ? 300 : 100,
                  height: commonStore.isDesktop ? 300 : 100,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/resources/main_investor_unist.png" width="100%" />
              </Box>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: commonStore.isDesktop ? 300 : 100,
                  height: commonStore.isDesktop ? 300 : 100,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/resources/main_investor_dgist.png" width="100%" />
              </Box>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: commonStore.isDesktop ? 300 : 100,
                  height: commonStore.isDesktop ? 300 : 100,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/resources/main_investor_htp.png" width="100%" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  ));
}

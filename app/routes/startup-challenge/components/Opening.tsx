import * as React from "react";

import { ExpandCircleDown } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { ParallaxText } from "../../../common/AutoScroll.js";
import { Language } from "../../../common/Language.js";
import { initTextEvent } from "../../../common/TextEvent.js";
import { AppContext } from "../../../stores/index.js";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { reviews } from "../../../data/reviews.js";

export default function Opening(): JSX.Element {
  const scaleRef = React.useRef(null);

  const { commonStore } = React.useContext(AppContext);

  React.useEffect(() => {
    initTextEvent(scaleRef);
  }, []);

  return useObserver(() => (
    <>
      <Box>
        <Box
          sx={{
            py: 10,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                width: "100%",

                display: "flex",
                flexDirection: "column",
                alignItems: commonStore.isDesktop ? "center" : "center",
                justifyContent: "center",
              }}
            >
              <Typography
                ref={scaleRef}
                sx={{
                  lineHeight: 1.2,
                  display: "flex",
                  mb: 3,
                }}
                color="text.primary"
                fontSize={48}
                fontWeight="bold"
              >
                <Language label="브랜드 창업, 여러분도 할 수 있어요!" />
              </Typography>

              <Typography
                ref={scaleRef}
                sx={{
                  lineHeight: 1.2,
                  display: "flex",
                  mb: 10,
                }}
                color="text.secondary"
                fontSize={24}
              >
                <Language label="대표님들께서는 이미 창업도전을 진행하고 있어요." />
              </Typography>
            </Box>
          </Container>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: commonStore.isDesktop ? "100%" : "100%",
              overflowX: "hidden",
            }}
          >
            <section>
              <ParallaxText
                baseVelocity={-1}
                direction={1}
                endOffset={-49.5}
                length={1}
                scrollRef={null}
              >
                {reviews.map((v, i) => {
                  return (
                    <>
                      <Box
                        key={i}
                        sx={{
                          bgcolor: "background.paper",
                          borderRadius: "1rem",

                          mr: 1,

                          cursor: "pointer",

                          p: 3,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",

                            mb: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              color="text.primary"
                              fontSize={18}
                              sx={{
                                letterSpacing: 0,
                              }}
                            >
                              <b>{v.name}</b>
                              <br />
                            </Typography>

                            <Typography color="text.secondary">
                              {v.from}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            width: 200,
                          }}
                        >
                          <Typography
                            color="text.primary"
                            fontSize={14}
                            sx={{
                              whiteSpace: "break-spaces",
                              letterSpacing: 0,
                            }}
                          >
                            {v.description}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  );
                })}
              </ParallaxText>
            </section>
          </Box>
        </Box>

        <Container
          maxWidth="lg"
          sx={{
            display: "none",
          }}
        >
          <Box
            sx={{
              width: "100%",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              ref={scaleRef}
              sx={{
                lineHeight: 1.2,
                display: "flex",
                mb: 5,
              }}
              fontSize={
                commonStore.isDesktop
                  ? 32
                  : commonStore.appInfo.language === "ko"
                  ? 40
                  : 32
              }
              fontWeight="bold"
            >
              창업도전을 꼭 해야하나요?
            </Typography>

            <Typography
              ref={scaleRef}
              sx={{
                lineHeight: 1.2,
                display: "flex",
                mb: 3,
              }}
              color="#333333"
              fontSize={18}
            >
              창업도전은 성공적인 브랜딩은 물론, 초기 창업에 어려움을 겪으시는
              분들에게 도움이 될 수 있어요.
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 10,
            }}
          >
            <Box
              sx={{
                width: "100%",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                ref={scaleRef}
                sx={{
                  lineHeight: 1.2,
                  display: "flex",
                  mb: 5,
                }}
                fontSize={
                  commonStore.isDesktop
                    ? 32
                    : commonStore.appInfo.language === "ko"
                    ? 40
                    : 32
                }
                fontWeight="bold"
              >
                어떤 것들이 있나요?
              </Typography>

              <Typography
                ref={scaleRef}
                sx={{
                  lineHeight: 1.2,
                  display: "flex",
                  mb: 3,
                }}
                color="#333333"
                fontSize={18}
              >
                창업도전은 도전과제별로 전문가의 승인과정을 거쳐야 해요.
                <br />
                승인이 완료되면 해당 브랜드가 전문가 승인을 통과했음을 알리는
                배지가 발급되고 있어요.
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                <Accordion expanded variant="outlined">
                  <AccordionSummary
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",

                      px: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        width: "100%",
                      }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        기본정보 완성하기
                      </Typography>

                      <ExpandCircleDown />
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      p: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography
                        fontSize={14}
                        sx={{
                          mb: 1,
                        }}
                      >
                        검사 항목: 로고, 카테고리, 브랜드명, 디자인, 슬로건,
                        핵심가치, 스토리, 미션, 비전
                      </Typography>

                      <Typography
                        color="text.secondary"
                        fontSize={14}
                        sx={{
                          mt: 1,
                        }}
                      >
                        완료 시 <b>스타터</b> 배지와 크레딧을 지급해요.
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                <Accordion expanded variant="outlined">
                  <AccordionSummary
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",

                      px: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        width: "100%",
                      }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        마케팅 준비하기
                      </Typography>

                      <ExpandCircleDown />
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      p: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography
                        fontSize={14}
                        sx={{
                          mb: 1,
                        }}
                      >
                        검사 항목: 웹사이트 , 상세페이지, 노출 및 캠페인
                      </Typography>

                      <Typography
                        color="text.secondary"
                        fontSize={14}
                        sx={{
                          mt: 1,
                        }}
                      >
                        완료 시 <b>마케터</b> 배지와 크레딧을 지급해요.
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                <Accordion expanded variant="outlined">
                  <AccordionSummary
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",

                      px: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        width: "100%",
                      }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        상표권 출원/등록하기
                      </Typography>

                      <ExpandCircleDown />
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      p: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography fontSize={14}>
                        검사 항목: 권리구분, 출원번호, 등록번호, 존속기간,
                        등록원부
                      </Typography>

                      <Typography
                        color="text.secondary"
                        fontSize={14}
                        sx={{
                          mt: 1,
                        }}
                      >
                        완료 시 <b>카피라이터</b> 배지와 크레딧을 지급해요.
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                <Accordion expanded variant="outlined">
                  <AccordionSummary
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",

                      px: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        width: "100%",
                      }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        견고화 및 확장하기
                      </Typography>

                      <ExpandCircleDown />
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      p: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography fontSize={14}>
                        검사 항목: 브랜드 커뮤니티 활성화 정도, 투자/펀딩 규모,
                        확장성 평가
                      </Typography>

                      <Typography
                        color="text.secondary"
                        fontSize={14}
                        sx={{
                          mt: 1,
                        }}
                      >
                        완료 시 <b>벤처브랜드</b> 배지와 크레딧을 지급해요.
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  ));
}

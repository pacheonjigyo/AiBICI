import * as React from "react";

import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function LandingPage() {
  const navigate = useNavigate();

  const { commonStore, welcomeStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          position: "relative",

          top: 0,
          left: 0,

          zIndex: -1,

          width: commonStore.baseInfo.width,
          height: commonStore.baseInfo.height,

          mb: 10,
        }}
      >
        <Box
          sx={{
            position: "absolute",

            left: "50%",
            top: "50%",

            transform: "translate(-50%, -50%)",

            width: "100%",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  lineHeight: 1.2,
                  display: "flex",
                  color: welcomeStore.mainTextData.color,
                }}
                fontSize={commonStore.isDesktop ? 64 : 20}
                fontWeight="bold"
              >
                {welcomeStore.mainTextData.text}
                <span className="cursor"></span>
              </Typography>

              <Typography
                sx={{
                  lineHeight: 1.2,
                  display: "flex",
                  color: welcomeStore.mainTextData.color,
                }}
                fontSize={commonStore.isDesktop ? 64 : 20}
                fontWeight="bold"
              >
                <Language label="필요하신가요?" />
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  mb: 3,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    height: 200,
                    width: 200,
                  }}
                  onClick={async () => {
                    const url = `/ai-logo/create`;

                    window.open(url);
                  }}
                >
                  <Box>
                    <Typography
                      color="info"
                      fontSize={20}
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                      }}
                    >
                      <Language label="AI 로고 제작 (무료)" />
                    </Typography>

                    <Typography color="text.primary" fontSize={12}>
                      <Language label="로그인 없이 즉시 이용가능" />
                    </Typography>
                  </Box>
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    ml: 3,
                    height: 200,
                    width: 200,
                  }}
                  onClick={async () => {
                    const url = `/ai-branding/intro`;

                    window.open(url);
                  }}
                >
                  <Box>
                    <Typography
                      color="info"
                      fontSize={20}
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                      }}
                    >
                      <Language label="브랜드 제작 (무료)" />
                    </Typography>

                    <Typography color="text.primary" fontSize={12}>
                      <Language label="로그인 후 이용가능" />
                    </Typography>
                  </Box>
                </Button>
              </Box>

              <Box>
                <Button
                  disabled
                  color="primary"
                  variant="contained"
                  sx={{
                    height: 200,
                    width: 200,
                  }}
                  onClick={async () => {
                    const url = `/ai-logo/create`;

                    window.open(url);
                  }}
                >
                  <Box>
                    <Typography
                      color="info"
                      fontSize={20}
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                      }}
                    >
                      <Language label="기업 제작" />
                    </Typography>

                    <Typography color="text.secondary" fontSize={12}>
                      Comming Soon
                    </Typography>
                  </Box>
                </Button>

                <Button
                  disabled
                  color="primary"
                  variant="contained"
                  sx={{
                    ml: 3,
                    height: 200,
                    width: 200,
                  }}
                  onClick={async () => {
                    const url = `/ai-branding/create`;

                    const result = await commonStore.syncAppInfo(
                      commonStore.appInfo.isAdmin,
                      true,
                      url,
                    );

                    if (!result) {
                      return;
                    }

                    window.open(url);
                  }}
                >
                  <Box>
                    <Typography
                      color="info"
                      fontSize={20}
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                      }}
                    >
                      <Language label="프로필 제작" />
                    </Typography>

                    <Typography color="text.secondary" fontSize={12}>
                      Comming Soon
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          width: commonStore.baseInfo.width,
          position: "relative",
        }}
      >
        <Box
          sx={{
            mb: 20,
          }}
        >
          <Grid container spacing={commonStore.isDesktop ? 3 : 1}>
            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: "auto",
              }}
            >
              <Chip
                label="AiBICI"
                color="secondary"
                sx={{
                  p: 3,
                  mb: 5,

                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />

              <Typography
                sx={{
                  lineHeight: 1.2,
                  mb: 3,
                }}
                color="white"
                fontSize={commonStore.isDesktop ? 48 : 40}
                fontWeight="bold"
              >
                <Language label="과학적·체계적인 브랜드 개발을 경험해보세요." />
                <br />
                <Typography
                  color="text.primary"
                  fontSize={commonStore.isDesktop ? 20 : 16}
                  sx={{
                    mt: 5,
                  }}
                >
                  <Language label="생성 이후에는 지속 관리 또는 상품화가 가능해요." />
                </Typography>
              </Typography>
            </Grid>

            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: "auto",
              }}
            ></Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mb: 20,
          }}
        >
          <Grid
            container
            spacing={commonStore.isDesktop ? 3 : 1}
            direction={commonStore.isDesktop ? "row" : "column-reverse"}
          >
            <Grid item xs={commonStore.isDesktop ? 6 : 12}></Grid>

            <Grid
              item
              xs={6}
              sx={{
                m: commonStore.isDesktop ? "auto" : "unset",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  justifyContent: commonStore.isDesktop ? "right" : "left",
                }}
              >
                <Typography
                  sx={{
                    color: "white",

                    lineHeight: 1.2,
                    mb: 3,
                  }}
                  fontSize={commonStore.isDesktop ? 48 : 40}
                  fontWeight="bold"
                >
                  <Chip
                    color="secondary"
                    label={<Language label="AI 브랜딩" />}
                    sx={{
                      p: 3,
                      mt: commonStore.isDesktop ? 0 : 5,
                      mb: 5,

                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  />
                  <br />

                  <Language label="다양하고 재미있는 브랜딩 방법을 제공해드릴게요." />

                  <Typography
                    color="text.primary"
                    fontSize={commonStore.isDesktop ? 20 : 16}
                    sx={{
                      mt: 5,
                    }}
                  >
                    <Language label="취향에 맞게 브랜드 아이덴티티를 생성하고 브랜딩을 해보세요." />
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mb: 20,
          }}
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: "auto",
              }}
            >
              <Typography
                sx={{
                  lineHeight: 1.2,
                  mb: 3,
                }}
                color="white"
                fontSize={commonStore.isDesktop ? 48 : 40}
                fontWeight="bold"
              >
                <Chip
                  color="secondary"
                  label={<Language label="AI 디자인" />}
                  sx={{
                    p: 3,
                    mb: 5,

                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                />

                <br />

                <Language label="AI 디자인 툴로 간편하게 작업해보세요." />
              </Typography>

              <Typography
                color="text.primary"
                fontSize={commonStore.isDesktop ? 20 : 16}
                sx={{
                  mt: 5,
                }}
              >
                <Language label="텍스트-이미지 등 다양한 AI 디자인 도구를 활용해보세요." />
              </Typography>
            </Grid>

            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: "auto",
              }}
            ></Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mb: 20,
          }}
        >
          <Grid
            container
            spacing={3}
            direction={commonStore.isDesktop ? "row" : "column-reverse"}
          >
            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: "auto",
              }}
            ></Grid>

            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: commonStore.isDesktop ? "auto" : "unset",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Typography
                  sx={{
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                  color="white"
                  fontSize={commonStore.isDesktop ? 48 : 40}
                  fontWeight="bold"
                >
                  <Chip
                    color="secondary"
                    label={<Language label="창업도전" />}
                    sx={{
                      p: 3,
                      mb: 5,

                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  />
                  <br />
                  <Language label="브랜드 출시 전 전문가를 통해 직접 코칭받으세요." />
                  <Typography
                    color="text.primary"
                    fontSize={commonStore.isDesktop ? 20 : 16}
                    sx={{
                      mt: 5,
                    }}
                  >
                    <Language label="브랜드 가치를 올리고 성공적인 창업을 준비하세요." />
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mb: 20,
          }}
        >
          <Grid container spacing={commonStore.isDesktop ? 3 : 1}>
            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: "auto",
              }}
            >
              <Chip
                color="secondary"
                label={<Language label="거래소" />}
                sx={{
                  p: 3,
                  mb: 5,

                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />

              <Typography
                sx={{
                  lineHeight: 1.2,
                  mb: 3,
                }}
                color="white"
                fontSize={commonStore.isDesktop ? 48 : 40}
                fontWeight="bold"
              >
                <Language label="브랜딩이 필요한 다른 사람들과 거래할 수 있어요." />

                <br />
                <Typography
                  color="text.primary"
                  fontSize={commonStore.isDesktop ? 20 : 16}
                  sx={{
                    mt: 5,
                  }}
                >
                  <Language label="브랜드 NFT화를 통해 디지털 자산을 확보하세요." />
                </Typography>
              </Typography>
            </Grid>

            <Grid
              item
              xs={commonStore.isDesktop ? 6 : 12}
              sx={{
                m: "auto",
              }}
            ></Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mb: 10,

            border: 1,
            borderColor: "divider",
            borderRadius: "1rem",

            p: commonStore.isDesktop ? 10 : 5,

            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: commonStore.isDesktop ? "row" : "column-reverse",
              alignItems: "center",
              justifyContent: "center",
              mb: 5,
            }}
          >
            <Typography
              sx={{
                lineHeight: 1.2,
              }}
              color="white"
              fontSize={commonStore.isDesktop ? 36 : 30}
              align={commonStore.isDesktop ? "center" : "center"}
              width={800}
            >
              <Language label="AI 통합 브랜딩 솔루션 AiBICI는 현재 무료로 제공되고 있어요." />

              <Typography
                color="text.primary"
                fontSize={commonStore.isDesktop ? 20 : 16}
                align="center"
                sx={{
                  mt: 5,
                }}
              >
                <Language label="제공되는 모든 기능을 가격 걱정 없이 자유롭게 이용해보세요." />
              </Typography>
            </Typography>
          </Box>

          <Button
            color="primary"
            variant="contained"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              height: 60,
              minWidth: commonStore.isDesktop ? 240 : "100%",
            }}
            onClick={async () => {
              const url = `/creator/brand`;

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
            <Language label="무료로 시작하기" />
          </Button>
        </Box>
      </Container>
    </>
  ));
}

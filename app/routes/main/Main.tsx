import * as React from "react";
import ColorfulPopcorn from "../../common/ColorfulPopcorn.js";
import Image from "../../common/Image.js";
import Footer from "../../layout/footer/Footer.js";
import LandingPage from "./components/LandingPage.js";

import {
  Box,
  Button,
  Container,
  Link,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../common/Language.js";
import { MyPagePopOver } from "../../layout/popover/MyPagePopOver.js";
import { AppContext } from "../../stores/index.js";

import { Cookie } from "@mui/icons-material";
import "aos/dist/aos.css";

export default function Main() {
  const userRef = React.useRef(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          position: "relative",
          width: commonStore.baseInfo.width,
        }}
      >
        <ColorfulPopcorn />

        <Box
          className="hideScroll"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: commonStore.baseInfo.width,

            zIndex: 100,
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(6px)",
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  position: "relative",

                  height: 60,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  py: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link
                    color="inherit"
                    underline="none"
                    sx={{
                      cursor: "pointer",

                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <Image
                      src={
                        theme.palette.mode === "light"
                          ? "/resources/logo_white.png"
                          : "/resources/logo_white.png"
                      }
                      style={{ height: commonStore.isDesktop ? 33 : 33 }}
                      alt="아비치컬러로고"
                    />
                  </Link>

                  {commonStore.isDesktop ? (
                    <>
                      <Button
                        color="info"
                        sx={{
                          ml: 5,
                        }}
                        onClick={() => {
                          navigate("/home");
                        }}
                      >
                        <Language label="홈" />
                      </Button>

                      <Button
                        color="info"
                        href="/marketplace"
                        sx={{
                          ml: 3,
                        }}
                        onClick={() => {
                          navigate("/marketplace");
                        }}
                      >
                        <Language label="거래소" />
                      </Button>

                      <Button
                        color="info"
                        sx={{
                          ml: 3,
                        }}
                        onClick={() => {
                          navigate("/startup-challenge");
                        }}
                      >
                        <Language label="창업도전" />
                      </Button>
                    </>
                  ) : null}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {commonStore.isDesktop ? (
                    <>
                      <Button
                        color="info"
                        sx={{
                          mr: 3,
                        }}
                        onClick={async () => {
                          window.open(
                            "https://aibici.channel.io/lounge",
                            "_blank",
                            "height=680,width=370,top=100,left=200,scrollbars=yes,resizable=yes",
                          );
                        }}
                      >
                        <Language label="문의하기" />
                      </Button>

                      <Select
                        size="small"
                        value={commonStore.appInfo.language}
                        onChange={(e) => {
                          commonStore.setAppInfo({
                            ...commonStore.appInfo,

                            language: e.target.value,
                          });

                          window.location.reload();
                        }}
                        sx={{
                          color: "white",

                          fontSize: 14,
                        }}
                      >
                        <MenuItem value="en">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            English
                          </Box>
                        </MenuItem>
                        <MenuItem value="ko">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            한국어
                          </Box>
                        </MenuItem>
                      </Select>
                    </>
                  ) : null}

                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                      ml: 1,
                      minWidth: commonStore.isDesktop ? 100 : "100%",
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
              </Box>
            </Container>
          </Box>
        </Box>

        <Box
          className="hideScroll"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: commonStore.baseInfo.width,
            height: commonStore.baseInfo.height,
            zIndex: 2,
            overflowY: "auto",
          }}
        >
          <LandingPage />

          <Footer />
        </Box>

        <Box
          className="hideScroll"
          sx={{
            backdropFilter: "blur(6px)",

            display: commonStore.cookieInfo.selected ? "none" : "",

            position: "absolute",
            bottom: 0,
            left: 0,
            width: commonStore.baseInfo.width,
            // height: 60,

            zIndex: 100,

            p: 3,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold">
                  <Language label="먼저, 쿠키에 동의해주세요." />
                </Typography>

                <Cookie sx={{ ml: 3 }} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    commonStore.setCookieInfo({
                      ...commonStore.cookieInfo,

                      selected: true,
                      accepted: true,
                    });
                  }}
                >
                  <Language label="허용" />
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    ml: 1,
                  }}
                  onClick={() => {
                    commonStore.setCookieInfo({
                      ...commonStore.cookieInfo,

                      selected: true,
                      accepted: false,
                    });
                  }}
                >
                  <Language label="거부" />
                </Button>
              </Box>
            </Box>

            <Typography>
              <Language label="쿠키 - 상세" />
            </Typography>
          </Container>
        </Box>
      </Box>

      <MyPagePopOver userRef={userRef} />
    </>
  ));
}

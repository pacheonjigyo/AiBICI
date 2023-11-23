import * as React from "react";
import Image from "../../common/Image.js";
import ImageCreateModal from "../../layout/modal/ImageCreateModal.js";

import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { usePageEffect } from "../../core/page.js";
import { connectViaMetaMask } from "../../metamask/connect.js";
import { AppContext } from "../../stores/index.js";

export default function Settings(): JSX.Element {
  const { commonStore, libraryDataStore, identityDataStore } =
    React.useContext(AppContext);

  const navigate = useNavigate();

  usePageEffect({
    title: "프로필",
  });

  React.useEffect(() => {
    libraryDataStore.getLibraryData(4, 1);
    identityDataStore.getServiceData(4, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {commonStore.userInfo ? (
        <>
          <Box
            sx={{
              my: "10px",
            }}
          >
            <Container maxWidth="md">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: commonStore.isDesktop ? "row" : "column",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                  }}
                >
                  <Typography fontSize={24} fontWeight="bold">
                    계정 정보
                  </Typography>

                  <Paper
                    variant="outlined"
                    sx={{
                      borderRadius: "1rem",

                      overflowY: "auto",

                      mt: 3,
                      p: 3,
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">아이디</Typography>

                          <Typography>
                            {commonStore.userInfo.user.useremail}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">닉네임</Typography>

                          <Typography>
                            {commonStore.userInfo.user.nickname}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">연락처</Typography>

                          <Typography>
                            {commonStore.userInfo.user.phone_number}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">
                            소셜 연동현황
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Box>
                              {commonStore.userInfo?.socialLogin?.kakao ===
                              "y" ? (
                                <Image
                                  src="/resources/google_logo.svg"
                                  width={30}
                                />
                              ) : null}
                            </Box>

                            <Box
                              sx={{
                                ml: 2,
                              }}
                            >
                              {commonStore.userInfo?.socialLogin?.google ===
                              "y" ? (
                                <Image
                                  src="/resources/kakao_logo.svg"
                                  width={30}
                                />
                              ) : null}
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">이용등급</Typography>

                          <Typography>FREE</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">이용기간</Typography>

                          <Typography>무제한</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Typography
                    fontSize={24}
                    fontWeight="bold"
                    sx={{
                      mt: 10,
                    }}
                  >
                    설정
                  </Typography>

                  <Paper
                    variant="outlined"
                    sx={{
                      borderRadius: "1rem",

                      overflowY: "auto",

                      mt: 3,
                      p: 3,
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">
                            MetaMask 지갑 연동
                          </Typography>

                          <Button
                            onClick={() => {
                              connectViaMetaMask();
                            }}
                          >
                            Connect
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Box>
            </Container>
          </Box>
        </>
      ) : null}

      <ImageCreateModal />
    </>
  ));
}

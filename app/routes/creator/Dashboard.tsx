import * as React from "react";
import Image from "../../common/Image.js";
import ImageCreateModal from "../../layout/modal/ImageCreateModal.js";

import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Link as NavLink } from "../../common/Link.js";
import { usePageEffect } from "../../core/page.js";
import NoticeModal from "../../layout/modal/NoticeModal.js";
import { AppContext } from "../../stores/index.js";

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, libraryDataStore, identityDataStore, boardStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: "프로필",
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    libraryDataStore.getLibraryData(4, 1).then(() => {
      identityDataStore.getServiceData(4, 1).then(() => {
        boardStore.getBoardData("notice", 8, 1);

        commonStore.setLoading(false);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {commonStore.userInfo ? (
        <>
          <Box
            sx={{
              // height: commonStore.baseInfo.height - 80,

              my: "10px",
            }}
          >
            <Box
              sx={{
                // height: commonStore.isDesktop
                //   ? commonStore.baseInfo.height - 80
                //   : "auto",
                // overflowY: "auto",

                display: "flex",
                flexDirection: commonStore.isDesktop ? "row" : "column",
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: commonStore.isDesktop ? 900 : "100%",
                    // height: commonStore.isDesktop
                    //   ? commonStore.baseInfo.height - 80
                    //   : "auto",
                    // overflowY: "auto",
                  }}
                >
                  <Grid container padding={3} spacing={3}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontSize={24} fontWeight="bold">
                          디자인
                        </Typography>

                        <Button
                          color="info"
                          variant="contained"
                          sx={{}}
                          onClick={() => {
                            navigate("/creator/design");
                          }}
                        >
                          디자인 관리
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        {libraryDataStore.libraryData ? (
                          libraryDataStore.libraryData.pagination.map(
                            (v: any, i) => (
                              <Grid
                                key={i}
                                item
                                xs={commonStore.isDesktop ? 3 : 12}
                              >
                                <Paper
                                  variant="outlined"
                                  sx={{
                                    borderRadius: "1em",
                                    boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                                    maxWidth: "100%",
                                  }}
                                >
                                  <Box
                                    href={`/design/${v.id}`}
                                    component={NavLink}
                                  >
                                    <Image
                                      src={v.selectLogo}
                                      alt="정보이미지1"
                                      style={{
                                        background: "dimgray",
                                        borderRadius: "1em",
                                        width: "100%",
                                        height: 200,
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Box>
                                </Paper>
                              </Grid>
                            ),
                          )
                        ) : (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            디자인 없음
                          </Box>
                        )}
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          mt: 3,

                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontSize={24} fontWeight="bold">
                          브랜드
                        </Typography>

                        <Button
                          color="info"
                          variant="contained"
                          sx={{}}
                          onClick={() => {
                            navigate("/creator/brand");
                          }}
                        >
                          브랜드 관리
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        {identityDataStore.serviceData ? (
                          identityDataStore.serviceData?.pagination.map(
                            (v: any, i) => {
                              return v.service.map((w) => (
                                <Grid
                                  key={i}
                                  item
                                  xs={commonStore.isDesktop ? 3 : 12}
                                >
                                  <Paper
                                    variant="outlined"
                                    sx={{
                                      borderRadius: "1em",
                                      boxShadow:
                                        "0px 3px 7px 0px rgba(0,0,0,.1)",
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <Box
                                      href={`/identity/${v.id}`}
                                      component={NavLink}
                                    >
                                      <Image
                                        src={w.serviceCore.logo}
                                        alt="정보이미지1"
                                        style={{
                                          background: "dimgray",
                                          borderRadius: "1em",
                                          width: "100%",
                                          height: 200,
                                          objectFit: "cover",
                                        }}
                                      />
                                    </Box>
                                  </Paper>
                                </Grid>
                              ));
                            },
                          )
                        ) : (
                          <Box
                            sx={{
                              p: 3,
                            }}
                          >
                            브랜드 없음
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box
                sx={{
                  width: commonStore.isDesktop ? 520 : "100%",
                  // height: commonStore.isDesktop
                  //   ? commonStore.baseInfo.height - 80
                  //   : "auto",
                  // overflowY: "auto",
                }}
              >
                <Grid container padding={3} spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: "100%",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography fontSize={24} fontWeight="bold">
                        공지사항
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper
                      variant="outlined"
                      sx={{
                        borderRadius: "1rem",
                        height: 512,

                        p: 3,
                      }}
                    >
                      {boardStore.boardNoticeData?.pagination.map(
                        (v: any, i: number) => {
                          return (
                            <>
                              <Button
                                key={i}
                                color="inherit"
                                variant="text"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  px: 3,
                                }}
                                fullWidth
                                onClick={() => {
                                  boardStore.getBoardDetailed(v.id, "notice");
                                }}
                              >
                                <Box>{v.title}</Box>
                                {/* <Box>{getLocaleTime(v.createdAt)}</Box> */}
                              </Button>

                              <Divider sx={{}} />
                            </>
                          );
                        },
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      ) : null}

      <ImageCreateModal />
      <NoticeModal />
    </>
  ));
}

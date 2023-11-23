import * as React from "react";
import Image from "../../common/Image.js";
import ImageCreateModal from "../../layout/modal/ImageCreateModal.js";

import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { BigButton } from "../../common/BigButton.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Design(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, libraryDataStore, engineStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    libraryDataStore.getLibraryData(10, libraryDataStore.page).then(() => {
      commonStore.setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {libraryDataStore.libraryData ? (
        <>
          <Box
            sx={{
              my: "10px",
            }}
          >
            <Container maxWidth="xl">
              <Box
                sx={{
                  bgcolor: "#f5f5f5",

                  // position: "fixed",
                  // left: 80,
                  // top: 60,

                  height: 80,

                  display: "flex",

                  alignItems: "center",

                  zIndex: 1,

                  mb: 3,
                }}
              >
                <BigButton
                  variant="contained"
                  onClick={() => {
                    engineStore.setImageCreateModal(true);
                  }}
                  endIcon={<Add />}
                >
                  새 디자인 등록하기
                </BigButton>
              </Box>

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Box sx={{}}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 3,
                        }}
                      >
                        <Typography fontSize={24} fontWeight="bold">
                          디자인({libraryDataStore.libraryData.columnCount})
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Pagination
                            count={libraryDataStore.libraryData.totalPage}
                            color="primary"
                            page={libraryDataStore.page}
                            onChange={(e, page) => {
                              libraryDataStore.setPage(page);
                              libraryDataStore.libraryData.getLibraryData(
                                10,
                                page,
                              );
                            }}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Grid container spacing={3}>
                          {libraryDataStore.libraryData.pagination.map(
                            (v: any, i) => {
                              return (
                                <Grid
                                  key={i}
                                  item
                                  xs={commonStore.isDesktop ? 3 : 12}
                                >
                                  <Paper
                                    variant="outlined"
                                    sx={{
                                      borderTopLeftRadius: "1em",
                                      borderBottomLeftRadius: "1em",

                                      borderRadius: "1em",
                                      // boxShadow:
                                      //   "0px 3px 7px 0px rgba(0,0,0,.1)",
                                      maxWidth: "100%",

                                      position: "relative",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        p: 3,

                                        width: "100%",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",

                                          mb: 1,
                                        }}
                                      >
                                        <Typography
                                          component="div"
                                          color={"text.secondary"}
                                          noWrap
                                          sx={{
                                            fontSize: 14,
                                            // fontWeight: "bold",
                                          }}
                                        >
                                          디자인_{v.id}
                                        </Typography>
                                      </Box>

                                      <Box
                                        sx={{
                                          display: "flex",
                                          width: "100%",
                                          justifyContent: "center",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          navigate(`/design/${v.id}`);
                                        }}
                                      >
                                        <Image
                                          src={v.selectLogo}
                                          alt="정보이미지1"
                                          style={{
                                            background: "dimgray",
                                            borderRadius: "1em",
                                            width: 251,
                                            height: 251,
                                            objectFit: "contain",
                                          }}
                                        />
                                      </Box>

                                      <Button
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                          mt: 3,

                                          // height: 60,

                                          fontSize: 18,

                                          borderRadius: 10,
                                        }}
                                        onClick={() => {
                                          navigate(`/design/${v.id}`);
                                        }}
                                      >
                                        수정하기
                                      </Button>
                                    </Box>
                                  </Paper>
                                </Grid>
                              );
                            },
                          )}
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      ) : null}

      <ImageCreateModal />
    </>
  ));
}

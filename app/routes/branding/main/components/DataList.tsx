import * as React from "react";
import Image from "../../../../common/Image.js";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";

import { ThumbUp } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { getLocaleTime } from "../../../../common/Functions.js";
import { Language } from "../../../../common/Language.js";
import { AppContext } from "../../../../stores/index.js";

export default function DataList(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, workDataStore } = React.useContext(AppContext);

  React.useEffect(() => {
    workDataStore.getOpenEngineData(20, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(
    () =>
      workDataStore.openEngineData && (
        <>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 5,
                  mb: 3,

                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    <Language label="최근 AI를 통해 생성한 브랜드" />
                  </Typography>
                </Box>

                <Pagination
                  count={workDataStore.openEngineData.totalPage}
                  color="primary"
                  onChange={(e, page) => {
                    workDataStore.getOpenEngineData(20, page);
                  }}
                />
              </Box>

              <Grid container spacing={commonStore.isDesktop ? 3 : 1}>
                {workDataStore.openEngineData.pagination.map((v, i) => {
                  const prompt =
                    v.logoAiSelect.length > 0
                      ? v.logoAiSelect[0]?.logoAiSource?.prompt.split("\n")
                      : "";

                  return (
                    <>
                      <Grid item xs={3}>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",

                              mb: 1,
                            }}
                          >
                            <Typography
                              color="secondary"
                              fontSize={14}
                              fontWeight="bold"
                            >
                              <Language label="로고" />
                            </Typography>

                            <Button
                              size="small"
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                window.open(
                                  v.logoAiSelect[0].predictions[
                                    v.logoAiSelect[0].selectPredictions
                                  ],
                                );
                              }}
                            >
                              <Language label="보기" />
                            </Button>
                          </Box>

                          <Image
                            src={
                              v.logoAiSelect[0].predictions[
                                v.logoAiSelect[0].selectPredictions
                              ]
                            }
                            alt="정보이미지1"
                            style={{
                              // borderTopLeftRadius: "1em",
                              // borderTopRightRadius: "1em",
                              width: "100%",
                              height: 270,
                              objectFit: "cover",
                            }}
                          />

                          <Box
                            sx={{
                              p: 1,
                              // height: 200,

                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",

                              position: "absolute",

                              top: 0,
                              left: 0,

                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            ></Box>

                            {/* <Typography
                            gutterBottom
                            variant="h3"
                            component="div"
                            // color={w?.name ? "unset" : "#8f8f8f"}
                            // noWrap
                            fontStyle={"italic"}
                            fontSize={14}
                            color="secondary"
                          >
                            {prompt[0]}
                          </Typography> */}
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            mb: 1,
                          }}
                        >
                          <Typography
                            color="secondary"
                            fontSize={14}
                            fontWeight="bold"
                            sx={{
                              mb: 1,
                            }}
                          >
                            <Language label="프롬프트" />
                          </Typography>
                          <Button
                            color="secondary"
                            size="small"
                            variant="contained"
                            onClick={() => {
                              window.navigator.clipboard
                                .writeText(prompt[0])
                                .then(() => {
                                  alert("프롬프트 복사가 완료되었어요.");
                                });
                            }}
                            // endIcon={<ContentCopy />}
                          >
                            <Language label="복사" />
                          </Button>
                        </Box>
                        <Paper
                          variant="outlined"
                          sx={{
                            width: "100%",
                            p: 1,
                            mb: 3,
                            position: "relative",
                          }}
                        >
                          <Typography color="text.secondary" fontSize={12}>
                            {prompt}
                          </Typography>
                        </Paper>

                        <Typography
                          color="secondary"
                          fontSize={14}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          <Language label="슬로건" />
                        </Typography>

                        <Typography
                          color="text.secondary"
                          fontSize={12}
                          sx={{
                            mb: 3,
                          }}
                        >
                          {
                            v.sloganAiSelect[0].predictions[
                              v.sloganAiSelect[0].selectPredictions
                            ]
                          }
                        </Typography>

                        <Typography
                          color="secondary"
                          fontSize={14}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          <Language label="핵심가치" />
                        </Typography>

                        <Typography
                          color="text.secondary"
                          fontSize={12}
                          sx={{
                            mb: 3,
                          }}
                        >
                          {
                            v.coreValueAiSelect[0].predictions[
                              v.coreValueAiSelect[0].selectPredictions
                            ]
                          }
                        </Typography>

                        <Typography
                          color="secondary"
                          fontSize={14}
                          fontWeight="bold"
                          sx={{
                            mb: 1,
                          }}
                        >
                          <Language label="업종" />
                        </Typography>

                        <Typography color="text.secondary" fontSize={12}>
                          {v.category} {">"} {v.industry}
                        </Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <Typography
                          color="secondary"
                          fontSize={14}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          <Language label="소유자" />
                        </Typography>

                        <Typography color="text.secondary" fontSize={12}>
                          @{v.email}
                        </Typography>

                        <Typography
                          color="secondary"
                          fontSize={14}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          <Language label="함께 생성된 로고" />
                        </Typography>

                        {v.logoAiSelect
                          .flatMap((w) => w.predictions)
                          .map((w, j) => (
                            <img
                              key={j}
                              src={w}
                              width={48}
                              style={{
                                marginRight: 5,
                              }}
                            />
                          ))}

                        <Typography
                          color="secondary"
                          fontSize={14}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          <Language label="생성날짜" />
                        </Typography>

                        <Typography color="text.secondary" fontSize={12}>
                          {getLocaleTime(v.createdAt)}
                        </Typography>

                        <Box
                          sx={{
                            display: "none",
                            // display: "flex",
                            alignItems: "center",
                            mt: 3,
                          }}
                        >
                          <IconButton>
                            <ThumbUp
                              color="secondary"
                              sx={{
                                fontSize: 18,
                              }}
                            />
                          </IconButton>

                          <Typography
                            color="secondary"
                            fontSize={14}
                            fontWeight="bold"
                          >
                            {i}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </>
      ),
  );
}

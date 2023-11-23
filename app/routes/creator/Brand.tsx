import * as React from "react";
import Image from "../../common/Image.js";
import IdentityChallengeModal from "../../layout/modal/IdentityChallengeModal.js";
import IdentityDetailModal from "../../layout/modal/IdentityDetailModal.js";
import IdentityProductModal from "../../layout/modal/IdentityProductModal.js";
import ManualCreateModal from "../../layout/modal/ManualCreateModal.js";

import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Add, Delete, Edit, RunCircle, Upload } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { BigButton } from "../../common/BigButton.js";
import { Language } from "../../common/Language.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
};

const labels = [0, 1, 2, 3, 4, 5, 6];

export const data = {
  labels,
  datasets: [
    // {
    //   label: "Red",
    //   data: labels.map(() => Math.random()),
    //   borderColor: "rgb(255, 99, 132)",
    //   backgroundColor: "rgba(255, 99, 132, 0.5)",
    // },
    // {
    //   label: "Blue",
    //   data: labels.map(() => Math.random()),
    //   borderColor: "rgb(53, 162, 235)",
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

export default function Brand(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, engineStore, identityDataStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["브랜드"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    identityDataStore.getServiceData(10, identityDataStore.page).then(() => {
      commonStore.setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <>
        <Box
          sx={{
            my: "10px",
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                height: 80,

                display: "flex",

                alignItems: "center",

                zIndex: 1,

                mb: 3,
              }}
            >
              {commonStore.isDesktop ? (
                <>
                  <BigButton
                    variant="contained"
                    onClick={() => {
                      engineStore.setManualCreateModal(true);
                    }}
                    endIcon={<Add />}
                  >
                    <Language label="새 브랜드 등록하기" />
                  </BigButton>

                  <BigButton
                    variant="contained"
                    color="secondary"
                    sx={{
                      ml: 1,
                    }}
                    endIcon={<Add />}
                    onClick={() => {
                      window.open(`/ai-branding/intro`);
                    }}
                  >
                    <Language label="AI 브랜딩으로 등록하기" />
                  </BigButton>
                </>
              ) : null}
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontSize={24} fontWeight="bold">
                          <Language label="브랜드" />
                          &nbsp; ({identityDataStore.serviceData?.columnCount})
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Pagination
                          count={identityDataStore.serviceData?.totalPage}
                          color="primary"
                          page={identityDataStore.page}
                          onChange={(e, page) => {
                            identityDataStore.setPage(page);
                            identityDataStore.getServiceData(10, page);
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
                      <Box>
                        <Grid container spacing={2}>
                          {identityDataStore.serviceData?.pagination.map(
                            (v: any, i) => {
                              return v.service.map((w, j) => (
                                <Grid
                                  key={i}
                                  item
                                  xs={commonStore.isDesktop ? 12 : 12}
                                >
                                  <Paper
                                    variant="outlined"
                                    sx={{
                                      borderTopLeftRadius: "1em",
                                      borderBottomLeftRadius: "1em",

                                      borderRadius: "1em",
                                      maxWidth: "100%",

                                      position: "relative",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderTopRightRadius: "1em",
                                        borderTopLeftRadius: "1em",

                                        borderBottom: 1,
                                        borderColor: "divider",

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 1,

                                        px: 2,
                                        py: 1,
                                      }}
                                    >
                                      <Checkbox color="default" />

                                      <Box
                                        sx={{
                                          textAlign: "right",
                                        }}
                                      >
                                        <Button
                                          color="secondary"
                                          variant="contained"
                                          // href={`/identity/${v.id}/detail`}
                                          // component={NavLink}
                                          sx={{
                                            ml: 1,
                                          }}
                                          onClick={async () => {
                                            //

                                            commonStore.setLoading(true);

                                            await identityDataStore.getDetailedData(
                                              v.id,
                                            );

                                            if (
                                              identityDataStore.detailedData
                                                .serviceMarketing?.description
                                            ) {
                                              const descResp = await fetch(
                                                identityDataStore.detailedData
                                                  .serviceMarketing.description,
                                              );

                                              const descText =
                                                await descResp.text();

                                              identityDataStore.setDetailedData(
                                                {
                                                  ...identityDataStore.detailedData,

                                                  serviceMarketing: {
                                                    ...identityDataStore
                                                      .detailedData
                                                      .serviceMarketing,

                                                    descriptionHTML: descText,
                                                  },
                                                },
                                              );
                                            } else {
                                              identityDataStore.setDetailedData(
                                                {
                                                  ...identityDataStore.detailedData,

                                                  serviceMarketing: {
                                                    ...identityDataStore
                                                      .detailedData
                                                      .serviceMarketing,

                                                    descriptionHTML: "",
                                                  },
                                                },
                                              );
                                            }

                                            commonStore.setLoading(false);

                                            identityDataStore.setDetailedInfo({
                                              ...identityDataStore.detailedInfo,

                                              modalDetail: true,
                                              id: v.id,
                                            });
                                          }}
                                          endIcon={<Edit />}
                                        >
                                          <Language label="브랜드수정" />
                                        </Button>

                                        <Button
                                          color="error"
                                          // variant="contained"
                                          onClick={() => {
                                            identityDataStore.deleteServiceData(
                                              v.id,
                                            );
                                          }}
                                          sx={{
                                            ml: 1,
                                          }}
                                          endIcon={<Delete />}
                                        >
                                          <Language label="삭제하기" />
                                        </Button>
                                      </Box>
                                    </Box>

                                    <Box
                                      sx={{
                                        p: 2,

                                        width: "100%",
                                      }}
                                    >
                                      <Grid container spacing={1}>
                                        <Grid item xs={2}>
                                          <Box
                                            // href={`/identity/${v.id}`}
                                            // component={NavLink}
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",

                                              width: 180,
                                              height: 180,

                                              border: 1,
                                              borderColor: "divider",
                                              borderRadius: "1rem",
                                            }}
                                          >
                                            {w.serviceCore.logo ? (
                                              <Image
                                                src={w.serviceCore.logo}
                                                alt="정보이미지1"
                                                style={{
                                                  background: "white",
                                                  borderRadius: "1em",
                                                  width: 180,
                                                  height: 180,
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : (
                                              <Typography color="text.secondary">
                                                NO IMAGE
                                              </Typography>
                                            )}
                                          </Box>
                                        </Grid>

                                        <Grid item xs={4}>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              // mb: 3,
                                            }}
                                          >
                                            <Typography
                                              component="div"
                                              color={
                                                w?.name ? "unset" : "#8f8f8f"
                                              }
                                              noWrap
                                              sx={{
                                                fontSize: 28,
                                                // fontWeight: "bold",
                                              }}
                                            >
                                              {w?.name ? w.name : ""}
                                            </Typography>

                                            <Chip
                                              size="small"
                                              color={"info"}
                                              label={
                                                w.type === "BI" ? (
                                                  <Language label="브랜드" />
                                                ) : (
                                                  <Language label="기업" />
                                                )
                                              }
                                              sx={{
                                                mx: 1,
                                              }}
                                            />
                                          </Box>
                                        </Grid>

                                        <Grid item xs={6}>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "end",
                                            }}
                                          >
                                            <Button
                                              disabled={
                                                w.serviceChallenge &&
                                                w.serviceChallenge.status ===
                                                  "start"
                                              }
                                              color="info"
                                              variant="outlined"
                                              sx={{
                                                ml: 1,
                                              }}
                                              onClick={async () => {
                                                commonStore.setLoading(true);

                                                await identityDataStore.getDetailedData(
                                                  v.id,
                                                );

                                                commonStore.setLoading(false);

                                                identityDataStore.setDetailedInfo(
                                                  {
                                                    ...identityDataStore.detailedInfo,

                                                    modalChallenge: true,
                                                    id: v.id,
                                                  },
                                                );
                                              }}
                                              endIcon={<RunCircle />}
                                            >
                                              {w.serviceChallenge &&
                                              w.serviceChallenge.status ===
                                                "start" ? (
                                                <Language label="도전중" />
                                              ) : (
                                                <Language label="도전하기" />
                                              )}
                                            </Button>

                                            <Button
                                              color="secondary"
                                              variant="outlined"
                                              sx={{
                                                mt: 1,
                                              }}
                                              onClick={async () => {
                                                commonStore.setLoading(true);

                                                await identityDataStore.getDetailedData(
                                                  v.id,
                                                );

                                                if (
                                                  identityDataStore.detailedData
                                                    .serviceMarketing
                                                    ?.description
                                                ) {
                                                  const descResp = await fetch(
                                                    identityDataStore
                                                      .detailedData
                                                      .serviceMarketing
                                                      .description,
                                                  );

                                                  const descText =
                                                    await descResp.text();

                                                  identityDataStore.setDetailedData(
                                                    {
                                                      ...identityDataStore.detailedData,

                                                      serviceProduct: {
                                                        ...identityDataStore
                                                          .detailedData
                                                          .serviceProduct,

                                                        descriptionHTML:
                                                          descText,
                                                      },
                                                    },
                                                  );
                                                } else {
                                                  identityDataStore.setDetailedData(
                                                    {
                                                      ...identityDataStore.detailedData,

                                                      serviceProduct: {
                                                        ...identityDataStore
                                                          .detailedData
                                                          .serviceProduct,

                                                        descriptionHTML: "",
                                                      },
                                                    },
                                                  );
                                                }

                                                commonStore.setLoading(false);

                                                identityDataStore.setDetailedInfo(
                                                  {
                                                    ...identityDataStore.detailedInfo,

                                                    modalProduct: true,
                                                    id: v.id,
                                                  },
                                                );
                                              }}
                                              endIcon={<Upload />}
                                            >
                                              <Language label="마켓등록" />
                                            </Button>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </Paper>
                                </Grid>
                              ));
                            },
                          )}
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <ManualCreateModal />

        <IdentityDetailModal />
        <IdentityProductModal />
        <IdentityChallengeModal />
      </>
    </>
  ));
}

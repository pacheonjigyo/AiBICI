import * as React from "react";
import ManualCreateModal from "../../layout/modal/ManualCreateModal.js";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  Pagination,
  Table,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { BigButton } from "../../common/BigButton.js";
import { Link as NavLink } from "../../common/Link.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

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
import { useNavigate } from "react-router-dom";
import { NewTableCell } from "../../common/NewTableCell.js";
import IdentityDetailModal from "../../layout/modal/IdentityDetailModal.js";
// import faker from 'faker';

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
    {
      label: "Red",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Startup(): JSX.Element {
  const navigate = useNavigate();

  const theme = useTheme();
  const { commonStore, engineStore, identityDataStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["브랜드"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    identityDataStore.getChallengeData(10, 1).then(() => {
      commonStore.setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <>
        {identityDataStore.challengeData && (
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
                        navigate("/startup-challenge/apply");
                      }}
                      endIcon={<Add />}
                    >
                      창업도전 시작하기
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
                            창업도전(
                            {identityDataStore.challengeData?.columnCount})
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Pagination
                            // size="large"
                            count={identityDataStore.challengeData?.totalPage}
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
                          bgcolor: "background.paper",
                          border: 1,
                          borderColor: "divider",

                          p: 3,

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Table
                          sx={{
                            borderCollapse: "collapse",
                          }}
                        >
                          <TableRow>
                            <NewTableCell head width={80}></NewTableCell>

                            <NewTableCell head width={80}>
                              로고
                            </NewTableCell>

                            <NewTableCell head width={200}>
                              네임
                            </NewTableCell>

                            <NewTableCell head>도전내용</NewTableCell>

                            <NewTableCell head width={150}>
                              진행상태
                            </NewTableCell>

                            <NewTableCell head width={300}></NewTableCell>
                          </TableRow>

                          {identityDataStore.challengeData?.changePagination.map(
                            (v: any, i) => {
                              return (
                                <TableRow key={i}>
                                  <NewTableCell>
                                    <Checkbox />
                                  </NewTableCell>

                                  <NewTableCell>
                                    <Avatar
                                      src={
                                        v.serviceGroup.service[0].serviceCore
                                          .logo
                                      }
                                      sx={{
                                        m: "auto",
                                      }}
                                    />
                                  </NewTableCell>

                                  <NewTableCell>
                                    <Typography
                                      component="div"
                                      noWrap
                                      fontSize={14}
                                      align="left"
                                    >
                                      {v.serviceGroup.service[0].name}
                                    </Typography>
                                  </NewTableCell>

                                  <NewTableCell></NewTableCell>

                                  <NewTableCell>
                                    <Chip
                                      color={
                                        v.serviceChallenge.status === "start"
                                          ? "warning"
                                          : "error"
                                      }
                                      size="small"
                                      label={
                                        v.serviceChallenge.status === "start"
                                          ? "승인대기중"
                                          : "반려됨"
                                      }
                                    />
                                  </NewTableCell>

                                  <NewTableCell>
                                    <Box>
                                      <Button
                                        disabled
                                        color="inherit"
                                        variant="contained"
                                        // href={`/identity/${v.id}/detail`}
                                        // component={NavLink}
                                        onClick={async () => {
                                          //

                                          commonStore.setLoading(true);

                                          await identityDataStore.getDetailedData(
                                            v.id,
                                          );

                                          commonStore.setLoading(false);

                                          identityDataStore.setDetailedInfo({
                                            ...identityDataStore.detailedInfo,

                                            modal: true,
                                            id: v.id,
                                          });
                                        }}
                                      >
                                        상품수정
                                      </Button>

                                      <Button
                                        color="info"
                                        variant="contained"
                                        sx={{
                                          ml: 1,
                                        }}
                                        href={`/identity/${v.id}/challenge`}
                                        component={NavLink}
                                      >
                                        과제중지
                                      </Button>

                                      <Button
                                        color="error"
                                        variant="contained"
                                        onClick={() => {
                                          identityDataStore.deleteServiceData(
                                            v.id,
                                          );
                                        }}
                                        sx={{
                                          ml: 1,
                                        }}
                                      >
                                        과제포기
                                      </Button>
                                    </Box>
                                  </NewTableCell>
                                </TableRow>
                              );
                            },
                          )}
                        </Table>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}

        <ManualCreateModal />
        <IdentityDetailModal />
      </>
    </>
  ));
}

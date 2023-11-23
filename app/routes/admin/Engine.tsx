import * as React from "react";
import Image from "../../common/Image.js";

import {
  Box,
  Checkbox,
  Grid,
  Pagination,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function AdminEngine(): JSX.Element {
  const theme = useTheme();
  const { commonStore, adminDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["데이터관리"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    adminDataStore.getUserEngineData(10, 1).then(() => {
      commonStore.setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {adminDataStore.userEngineData?.pagination ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              height: 80,
            }}
          >
            <Typography fontWeight="bold" fontSize={20}>
              {wordList["데이터관리"][commonStore.appInfo.language]}(
              {adminDataStore.userEngineData.columnCount})
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pagination
                count={adminDataStore.userEngineData.totalPage}
                color="primary"
                onChange={(e, page) => {
                  adminDataStore.getUserEngineData(10, page);
                }}
              />
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "background.paper",
                  }}
                >
                  <Table
                    sx={{
                      fontSize: 10,
                    }}
                  >
                    <TableRow>
                      <TableCell
                        width={"5%"}
                        sx={{
                          border: "1px solid black",
                          textAlign: "center",
                          py: 0,
                        }}
                      >
                        <Checkbox />
                      </TableCell>

                      <TableCell
                        width={"10%"}
                        sx={{
                          border: "1px solid black",
                          py: 0,
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        이메일 / 구분 / 업종
                      </TableCell>

                      <TableCell
                        width={"35%"}
                        sx={{
                          border: "1px solid black",
                          py: 0,
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {wordList["로고"][commonStore.appInfo.language]}
                      </TableCell>

                      <TableCell
                        width={"25%"}
                        sx={{
                          border: "1px solid black",
                          py: 0,
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {wordList["슬로건"][commonStore.appInfo.language]}
                      </TableCell>

                      <TableCell
                        width={"25%"}
                        sx={{
                          border: "1px solid black",
                          py: 0,
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {wordList["핵심가치"][commonStore.appInfo.language]}
                      </TableCell>
                    </TableRow>

                    {adminDataStore.userEngineData.pagination.map((v: any) => {
                      const promptLogo =
                        v.logoAiSelect[0]?.logoAiSource.prompt.split("\n") ?? [
                          "",
                          "",
                        ];

                      const promptSlogan =
                        v.sloganAiSelect[0]?.sloganAiSource.input.split(
                          "\n",
                        ) ?? ["", ""];

                      const promptCoreValue =
                        v.coreValueAiSelect[0]?.coreValueAiSource.input.split(
                          "\n",
                        ) ?? ["", ""];

                      return (
                        <>
                          <TableRow>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                textAlign: "center",
                                py: 0,
                              }}
                            >
                              <Checkbox />
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                py: 1,
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              <Typography fontWeight={"bold"} fontSize={14}>
                                {v.email}
                              </Typography>
                              <Typography color="#8f8f8f" fontSize={12}>
                                ({v.type}) {v.category} {">"} {v.industry}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                py: 1,
                                fontSize: 12,
                              }}
                            >
                              <Typography
                                color="green"
                                sx={{
                                  fontSize: 12,
                                  mb: 1,
                                }}
                              >
                                [P]: {promptLogo[0]}
                              </Typography>

                              <Typography
                                color="red"
                                sx={{
                                  fontSize: 12,
                                  mb: 3,
                                }}
                              >
                                [N]: {promptLogo[1]}
                              </Typography>

                              <Paper
                                variant="outlined"
                                sx={{
                                  height: 150,
                                  overflowY: "auto",
                                  p: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    mb: 1,
                                  }}
                                >
                                  <Grid container spacing={1}>
                                    {v.logoAiSelect.map((w) => {
                                      return (
                                        <>
                                          {w.predictions.map((x, k) => (
                                            <>
                                              <Grid item xs={3}>
                                                <Image
                                                  key={k}
                                                  src={x}
                                                  width={"100%"}
                                                  alt={`sample_${k}`}
                                                />
                                              </Grid>
                                            </>
                                          ))}
                                        </>
                                      );
                                    })}
                                  </Grid>
                                </Box>
                              </Paper>
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                py: 1,
                                fontSize: 12,
                              }}
                            >
                              <Typography
                                color="green"
                                sx={{
                                  fontSize: 12,
                                  mb: 1,
                                }}
                              >
                                [P]: {promptSlogan[0]}
                              </Typography>

                              <Typography
                                color="red"
                                sx={{
                                  fontSize: 12,
                                  mb: 3,
                                }}
                              >
                                [N]: {promptSlogan[1]}
                              </Typography>

                              <Paper
                                variant="outlined"
                                sx={{
                                  height: 150,
                                  overflowY: "auto",
                                  p: 1,
                                }}
                              >
                                {v.sloganAiSelect.map((w) => {
                                  return (
                                    <>
                                      <Box>
                                        {w.predictions.map((x) => (
                                          <>
                                            <div>{x}</div>
                                          </>
                                        ))}
                                      </Box>
                                    </>
                                  );
                                })}
                              </Paper>
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                py: 1,
                                fontSize: 12,
                              }}
                            >
                              <Typography
                                color="green"
                                sx={{
                                  fontSize: 12,
                                  mb: 1,
                                }}
                              >
                                [P]: {promptCoreValue[0]}
                              </Typography>

                              <Typography
                                color="red"
                                sx={{
                                  fontSize: 12,
                                  mb: 3,
                                }}
                              >
                                [N]: {promptCoreValue[1]}
                              </Typography>

                              <Paper
                                variant="outlined"
                                sx={{
                                  height: 150,
                                  overflowY: "auto",
                                  p: 1,
                                }}
                              >
                                {v.coreValueAiSelect.map((w) => {
                                  return (
                                    <>
                                      <Box>
                                        {w.predictions.map((x) => (
                                          <>
                                            <div>{x}</div>
                                          </>
                                        ))}
                                      </Box>
                                    </>
                                  );
                                })}
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </Table>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </>
  ));
}

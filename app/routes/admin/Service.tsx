import * as React from "react";
import Image from "../../common/Image.js";

import {
  Box,
  Checkbox,
  Grid,
  Pagination,
  Table,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { getLocaleTime } from "../../common/Functions.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function AdminService(): JSX.Element {
  const theme = useTheme();
  const { commonStore, adminDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["슬롯관리"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    adminDataStore.getUserServiceData(50, 1).then(() => {
      commonStore.setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {adminDataStore.userServiceData?.pagination ? (
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
              {wordList["슬롯관리"][commonStore.appInfo.language]}(
              {adminDataStore.userServiceData.columnCount})
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pagination
                count={adminDataStore.userServiceData.totalPage}
                color="primary"
                onChange={(e, page) => {
                  adminDataStore.getUserServiceData(50, page);
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
                          fontSize: 12,
                          textAlign: "center",
                          py: 0,
                        }}
                      >
                        {wordList["이메일"][commonStore.appInfo.language]}
                      </TableCell>

                      <TableCell
                        width={"10%"}
                        sx={{
                          border: "1px solid black",
                          fontSize: 12,
                          textAlign: "center",
                          py: 0,
                        }}
                      >
                        브랜드 정보
                      </TableCell>

                      <TableCell
                        width={"15%"}
                        sx={{
                          border: "1px solid black",
                          fontSize: 12,
                          textAlign: "center",
                          py: 0,
                        }}
                      >
                        {wordList["네임"][commonStore.appInfo.language]}
                      </TableCell>

                      <TableCell
                        width={"35%"}
                        sx={{
                          border: "1px solid black",
                          fontSize: 12,
                          textAlign: "center",
                          py: 0,
                        }}
                      ></TableCell>

                      <TableCell
                        width={"15%"}
                        sx={{
                          border: "1px solid black",
                          fontSize: 12,
                          textAlign: "center",
                          py: 0,
                        }}
                      >
                        {wordList["게시날짜"][commonStore.appInfo.language]}
                      </TableCell>
                    </TableRow>

                    {adminDataStore.userServiceData.pagination.map(
                      (v: any, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontSize: 12,
                                textAlign: "center",
                                py: 0,
                              }}
                            >
                              <Checkbox />
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontSize: 12,
                                textAlign: "center",
                                py: 0,
                              }}
                            >
                              {v.User.email}
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontSize: 12,
                                textAlign: "center",
                                py: 0,
                              }}
                            >
                              {v.service.map((w: any) => (
                                <>
                                  <Image
                                    src={w.serviceCore.logo}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                  />
                                </>
                              ))}
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontSize: 12,
                                fontWeight: "bold",
                                textAlign: "center",
                                py: 0,
                              }}
                            >
                              {v.service.map((w: any) => (
                                <>{w.name}</>
                              ))}
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontSize: 12,
                                textAlign: "center",
                                py: 0,
                              }}
                            ></TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontSize: 12,
                                textAlign: "center",
                                py: 0,
                              }}
                            >
                              {getLocaleTime(v.createdAt)}
                            </TableCell>
                          </TableRow>
                        );
                      },
                    )}
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

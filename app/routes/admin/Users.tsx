import * as React from "react";

import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

export default function AdminUsers(): JSX.Element {
  const theme = useTheme();
  const { adminUserStore, commonStore } = React.useContext(AppContext);

  usePageEffect({
    title: commonStore.appInfo.language === "ko" ? "유저관리" : "Users",
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    adminUserStore.getUserLists(50, 1).then(() => {
      commonStore.setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",

          // bgcolor: "background.paper",

          // border: 1,
          // borderColor: "divider",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                height: 80,
              }}
            >
              <Typography fontWeight="bold" fontSize={20}>
                {wordList["유저관리"][commonStore.appInfo.language]}(
                {adminUserStore.userListResults?.columnCount})
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Pagination
                  count={adminUserStore.userListResults?.totalPage}
                  color="primary"
                  onChange={(e, page) => {
                    adminUserStore.getUserLists(10, page);
                  }}
                />
              </Box>
            </Box>

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
                <Table>
                  <TableRow>
                    <TableCell
                      width={"5%"}
                      sx={{
                        textAlign: "center",
                        py: 0,
                      }}
                    >
                      <Checkbox />
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: 12,
                        py: 0,
                      }}
                    >
                      {wordList["이메일"][commonStore.appInfo.language]}
                    </TableCell>

                    <TableCell
                      width={"10%"}
                      sx={{
                        fontSize: 12,
                        py: 0,
                      }}
                    >
                      연락처
                    </TableCell>

                    <TableCell
                      width={"10%"}
                      sx={{
                        fontSize: 12,
                        py: 0,
                      }}
                    >
                      {wordList["생성"][commonStore.appInfo.language]}
                    </TableCell>

                    <TableCell
                      width={"10%"}
                      sx={{
                        fontSize: 12,
                        py: 0,
                      }}
                    >
                      {wordList["슬롯"][commonStore.appInfo.language]}
                    </TableCell>

                    <TableCell
                      width={"20%"}
                      sx={{
                        fontSize: 12,
                        py: 0,
                      }}
                    >
                      {wordList["요금제"][commonStore.appInfo.language]}
                    </TableCell>
                  </TableRow>

                  {adminUserStore.userListResults?.pagination.map(
                    (v: any, i: number) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                py: 0,
                              }}
                            >
                              <Checkbox />
                            </TableCell>

                            <TableCell
                              sx={{
                                py: 0,
                                fontSize: 12,
                              }}
                            >
                              {v.userProfile.useremail}
                            </TableCell>

                            <TableCell
                              sx={{
                                py: 0,
                                fontSize: 12,
                              }}
                            >
                              {v.userProfile.phone_number === " "
                                ? "미입력"
                                : v.userProfile.phone_number}
                            </TableCell>

                            <TableCell
                              sx={{
                                py: 0,
                                fontSize: 12,
                              }}
                            >
                              무제한(OBT)
                            </TableCell>

                            <TableCell
                              sx={{
                                py: 0,
                                fontSize: 12,
                              }}
                            >
                              무제한(OBT)
                            </TableCell>

                            <TableCell
                              sx={{
                                py: 1,
                                fontSize: 12,
                              }}
                            >
                              <Select
                                size="small"
                                fullWidth
                                value={v.userGrade.grade}
                                onChange={(e) => {
                                  adminUserStore.updateUserGrade(
                                    i,
                                    v.id,
                                    e.target.value,
                                    commonStore.isDesktop,
                                  );
                                }}
                                sx={{
                                  fontSize: 12,
                                }}
                              >
                                <MenuItem value={1}>
                                  {
                                    wordList["베이직"][
                                      commonStore.appInfo.language
                                    ]
                                  }
                                </MenuItem>
                                <MenuItem value={2}>
                                  {
                                    wordList["비즈니스"][
                                      commonStore.appInfo.language
                                    ]
                                  }
                                </MenuItem>
                                <MenuItem value={3}>
                                  {
                                    wordList["엔터프라이즈"][
                                      commonStore.appInfo.language
                                    ]
                                  }
                                </MenuItem>
                              </Select>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    },
                  )}
                </Table>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}

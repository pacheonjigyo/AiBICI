import * as React from "react";
import NoticeModal from "../../layout/modal/NoticeModal.js";

import { useObserver } from "mobx-react";
import { getLocaleTime } from "../../common/Functions.js";
import { Link as NavLink } from "../../common/Link.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Table,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

export default function AdminBoard(): JSX.Element {
  const theme = useTheme();
  const { commonStore, boardStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["게시글관리"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    boardStore.getBoardData(undefined, 10, 1).then(() => {
      commonStore.setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
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
            {wordList["게시글관리"][commonStore.appInfo.language]}(
            {boardStore.boardAllData?.columnCount})
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              href="/admin/board/create"
              component={NavLink}
              variant="contained"
            >
              {wordList["게시글쓰기"][commonStore.appInfo.language]}
            </Button>
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
                <Table>
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
                      sx={{
                        border: "1px solid black",
                        py: 0,
                      }}
                    >
                      {wordList["게시글제목"][commonStore.appInfo.language]}
                    </TableCell>

                    <TableCell
                      width={"20%"}
                      sx={{
                        border: "1px solid black",
                        py: 0,
                      }}
                    >
                      {wordList["게시자"][commonStore.appInfo.language]}
                    </TableCell>

                    <TableCell
                      width={"20%"}
                      sx={{
                        border: "1px solid black",
                        py: 0,
                      }}
                    >
                      {wordList["게시날짜"][commonStore.appInfo.language]}
                    </TableCell>
                  </TableRow>

                  {boardStore.boardAllData?.pagination.map(
                    (v: any, i: number) => {
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
                                py: 0,
                              }}
                            >
                              <Box
                                key={i}
                                onClick={() => {
                                  boardStore.getBoardDetailed(v.id, "notice");
                                }}
                                sx={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                              >
                                {v.title}
                              </Box>
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                py: 0,
                              }}
                            >
                              <Box key={i}>{v.author}</Box>
                            </TableCell>

                            <TableCell
                              sx={{
                                border: "1px solid black",
                                py: 0,
                              }}
                            >
                              <Box key={i}>{getLocaleTime(v.createdAt)}</Box>
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

      <NoticeModal />
    </>
  ));
}

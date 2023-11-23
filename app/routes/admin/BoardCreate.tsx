import * as React from "react";

import { useObserver } from "mobx-react";
import { readAsDataURLAsync } from "../../common/FileManager.js";
import { uploadToS3, uploadToS3Editor } from "../../common/FileUpload.js";
import { floatingToast } from "../../common/FloatingToast.js";
import { ToastUIEditor } from "../../common/ToastUIEditor.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

export default function AdminBoardCreate(): JSX.Element {
  const theme = useTheme();
  const { commonStore, boardStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["게시글쓰기"][commonStore.appInfo.language],
  });

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",

          height: commonStore.baseInfo.height - 110,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                boxShadow: `0px 3px 7px 0px ${
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,.1)"
                    : "rgba(255,255,255,.1)"
                }`,
                width: "100%",
                height: commonStore.baseInfo.height - 110,
                overflowY: "scroll",
                p: 3,
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
                  <Typography fontWeight="bold">
                    {wordList["게시글쓰기"][commonStore.appInfo.language]}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={async () => {
                        if (!boardStore.boardInput.category) {
                          floatingToast(
                            wordList["카테고리를 선택해주세요."][
                              commonStore.appInfo.language
                            ],
                            "failed",
                            commonStore.isDesktop,
                          );

                          return;
                        }

                        if (!boardStore.boardInput.title) {
                          floatingToast(
                            wordList["게시글 제목을 입력해주세요."][
                              commonStore.appInfo.language
                            ],
                            "failed",
                            commonStore.isDesktop,
                          );

                          return;
                        }

                        const result = await uploadToS3Editor(
                          boardStore.boardInput.content,
                          `admin/board/${
                            boardStore.boardInput.category
                          }/${new Date().getTime()}`,
                        );

                        boardStore.setBoardInput({
                          ...boardStore.boardInput,

                          thumbnail: result.thumbnail,
                          content: result.content,
                        });

                        boardStore.uploadBoardData();
                      }}
                    >
                      {wordList["게시하기"][commonStore.appInfo.language]}
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box sx={{}}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      m: "auto",
                      textAlign: "center",
                    }}
                  >
                    {wordList["카테고리"][commonStore.appInfo.language]}
                  </Grid>

                  <Grid
                    item
                    xs={10}
                    sx={{
                      m: "auto",
                    }}
                  >
                    <Select
                      size="small"
                      placeholder=""
                      sx={{
                        width: "100%",
                      }}
                      onChange={(e) => {
                        boardStore.setBoardInput({
                          ...boardStore.boardInput,

                          category: e.target.value,
                        });
                      }}
                      value={boardStore.boardInput.category}
                    >
                      <MenuItem value={"work"}>Main - WORK</MenuItem>
                      <MenuItem value={"info"}>Main - INFO</MenuItem>
                      <MenuItem value={"notice"}>
                        {wordList["공지사항"][commonStore.appInfo.language]}
                      </MenuItem>
                    </Select>
                  </Grid>

                  <Grid
                    item
                    xs={2}
                    sx={{
                      m: "auto",
                      textAlign: "center",
                    }}
                  >
                    {wordList["제목"][commonStore.appInfo.language]}
                  </Grid>

                  <Grid
                    item
                    xs={10}
                    sx={{
                      m: "auto",
                    }}
                  >
                    <TextField
                      size="small"
                      id="AdminBoard_Title"
                      placeholder=""
                      sx={{
                        width: "100%",
                      }}
                      onChange={(e) => {
                        boardStore.setBoardInput({
                          ...boardStore.boardInput,

                          title: e.target.value,
                        });
                      }}
                      value={boardStore.boardInput.title}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={2}
                    sx={{
                      m: "auto",
                      textAlign: "center",
                    }}
                  >
                    {wordList["내용"][commonStore.appInfo.language]}
                  </Grid>

                  <Grid
                    item
                    xs={10}
                    sx={{
                      m: "auto",
                    }}
                  >
                    <ToastUIEditor
                      onBlur={(e: string) => {
                        boardStore.setBoardInput({
                          ...boardStore.boardInput,
                          content: e,
                        });
                      }}
                      initialValue={boardStore.boardInput.content}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={2}
                    sx={{
                      m: "auto",
                      textAlign: "center",
                    }}
                  >
                    {wordList["첨부파일"][commonStore.appInfo.language]}
                  </Grid>

                  <Grid
                    item
                    xs={10}
                    sx={{
                      m: "auto",
                    }}
                  >
                    <TextField
                      size="small"
                      id="AdminBoard_Attachments"
                      type="file"
                      placeholder=""
                      sx={{
                        width: "100%",
                      }}
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        const attached = e.target.files
                          ? e.target.files[0]
                          : null;

                        if (!attached) {
                          return;
                        }

                        const splitedName = attached.name.split(".");

                        const exts = splitedName.pop();

                        if (!exts) {
                          return;
                        }

                        const attachedBase64 = await readAsDataURLAsync(
                          attached,
                        );

                        if (typeof attachedBase64 !== "string") {
                          return;
                        }

                        const data = attachedBase64.split(",")[1];
                        const url = await uploadToS3(
                          data,
                          `admin/board/${
                            boardStore.boardInput.category
                          }/attached/${splitedName}_${new Date().getTime()}`,
                          exts,
                          exts,
                        );

                        boardStore.setBoardInput({
                          ...boardStore.boardInput,
                          attached: url,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}

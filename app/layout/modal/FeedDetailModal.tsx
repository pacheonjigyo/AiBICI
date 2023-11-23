import * as React from "react";
import BaseModal from "../../common/BaseModal.js";

import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { BigButton } from "../../common/BigButton.js";
import { getLocaleTime } from "../../common/Functions.js";
import { Language } from "../../common/Language.js";
import { stringAvatar } from "../../common/StringAvatar.js";
import { AppContext } from "../../stores/index.js";

export default function FeedDetailModal(): JSX.Element {
  const { feedStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={feedStore.feedDetailModal}
      onClose={() => {
        feedStore.setFeedDetailModal(false);
      }}
    >
      <BaseModal
        width={1200}
        header={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
            }}
          >
            <Typography fontSize={24} fontWeight="bold" sx={{}}>
              <Language label="제목" />
            </Typography>

            <IconButton
              onClick={() => {
                feedStore.setFeedDetailModal(false);
              }}
            >
              <Close />
            </IconButton>
          </Box>
        }
        footer={
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <BigButton disabled color="secondary" variant="contained">
              {/* <Language label="공유하기" /> */}
              Comming Soon
            </BigButton>
          </Box>
        }
      >
        {feedStore.feedInput.index >= 0 ? (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              className="hideScroll"
              sx={{
                border: 1,
                borderColor: "divider",

                p: 3,

                width: 700,
                height: 500,
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Avatar
                  {...stringAvatar(
                    feedStore.feedDetailedData?.select.setFeed.author,
                  )}
                />

                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {feedStore.feedDetailedData?.select.setFeed.author}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: 12,
                    }}
                  >
                    {getLocaleTime(
                      feedStore.feedDetailedData?.select.setFeed.createdAt,
                    )}
                    &nbsp;
                    <Language label="게시됨" />
                  </Typography>
                </Box>
              </Box>

              <div
                dangerouslySetInnerHTML={{
                  __html: feedStore.feedDetailedData?.select.setFeed.content,
                }}
              />
            </Box>

            <Box
              sx={{
                ml: 3,

                width: 500,
                height: 500,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",

                  mb: 1,
                }}
              >
                <Language label="댓글" />
              </Typography>

              <Box
                className="hideScroll"
                sx={{
                  p: 3,

                  border: 1,
                  borderColor: "divider",

                  height: 360,
                  overflowY: "auto",

                  position: "relative",
                }}
              >
                {feedStore.feedDetailedData?.select.initValue.length > 0 ? (
                  feedStore.feedDetailedData?.select.initValue.map((v, i) => {
                    return (
                      <>
                        <Box
                          sx={{
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              mb: 1,
                            }}
                          >
                            <Avatar {...stringAvatar(v?.author)} />

                            <Box
                              sx={{
                                ml: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  cursor: "pointer",
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                              >
                                {v?.author}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 1,
                                  fontSize: 12,
                                }}
                              >
                                {getLocaleTime(v.createdAt)}
                              </Typography>

                              <Typography
                                variant="body2"
                                sx={{
                                  cursor: "pointer",

                                  fontSize: 14,
                                }}
                              >
                                {v?.content}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              cursor: "pointer",

                              fontSize: 12,
                            }}
                            onClick={() => {
                              feedStore.setFeedInput({
                                ...feedStore.feedInput,

                                commentId: v.id,
                              });
                            }}
                          >
                            <Language label="답글" /> &nbsp; {v.comments.length}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              cursor: "pointer",

                              ml: 3,
                              fontSize: 12,
                            }}
                            onClick={() => {
                              feedStore.setFeedInput({
                                ...feedStore.feedInput,

                                commentId: v.id,
                              });
                            }}
                          >
                            <Language label="답글 달기" />
                          </Typography>
                        </Box>

                        {feedStore.feedDetailedData?.select.initValue.length -
                          1 ===
                        i ? null : (
                          <Divider
                            sx={{
                              mb: 2,
                            }}
                          />
                        )}
                      </>
                    );
                  })
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: "pointer",

                      fontSize: 14,
                    }}
                  >
                    <Language label="등록된 댓글이 없습니다." />
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  bgcolor: "background.paper",

                  width: "100%",
                  height: 120,

                  mt: 1,

                  zIndex: 1,
                }}
              >
                {feedStore.feedInput.commentId ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 40,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        <Language label="답글 달기" />
                      </Typography>

                      <IconButton
                        onClick={() => {
                          feedStore.setFeedInput({
                            ...feedStore.feedInput,

                            commentId: null,
                          });
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        width: "100%",

                        mt: 2,
                      }}
                    >
                      <TextField
                        multiline
                        size="small"
                        fullWidth
                        // placeholder={<Language label="답글을 입력해주세요." />}
                        value={
                          feedStore.feedData?.collect.repagination[
                            feedStore.feedInput.index
                          ].comment
                        }
                        onChange={(e) => {
                          feedStore.setFeedCommentData(
                            feedStore.feedInput.index,
                            e.target.value,
                          );
                        }}
                      />

                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          const accept = confirm("댓글을 등록하시겠습니까?");

                          if (!accept) {
                            return;
                          }

                          feedStore.addFeedComment(
                            feedStore.feedInput.feedId,
                            feedStore.feedInput.commentId,
                            feedStore.feedData?.collect.repagination[
                              feedStore.feedInput.index
                            ].comment,
                          );

                          feedStore.setFeedCommentData(
                            feedStore.feedInput.index,
                            "",
                          );
                        }}
                        sx={{
                          ml: 1,
                        }}
                      >
                        <Language label="등록" />
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 40,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        <Language label="댓글 달기" />
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        width: "100%",

                        mt: 2,
                      }}
                    >
                      <TextField
                        multiline
                        size="small"
                        fullWidth
                        placeholder="댓글"
                        value={
                          feedStore.feedData?.collect.repagination[
                            feedStore.feedInput.index
                          ].comment
                        }
                        onChange={(e) => {
                          feedStore.setFeedCommentData(
                            feedStore.feedInput.index,
                            e.target.value,
                          );
                        }}
                      />

                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          const accept = confirm(
                            "Do you want to register a comment?",
                          );

                          if (!accept) {
                            return;
                          }

                          feedStore.addFeedComment(
                            feedStore.feedInput.feedId,
                            feedStore.feedInput.commentId,
                            feedStore.feedData?.collect.repagination[
                              feedStore.feedInput.index
                            ].comment,
                          );

                          feedStore.setFeedCommentData(
                            feedStore.feedInput.index,
                            "",
                          );
                        }}
                        sx={{
                          ml: 1,
                        }}
                      >
                        <Language label="등록" />
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        ) : null}
      </BaseModal>
    </Modal>
  ));
}

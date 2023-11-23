import * as React from "react";
import FeedDetailModal from "../../layout/modal/FeedDetailModal.js";
import FeedUploadModal from "../../layout/modal/FeedUploadModal.js";
import NoticeModal from "../../layout/modal/NoticeModal.js";

import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { getLocaleTime } from "../../common/Functions.js";
import { Language } from "../../common/Language.js";
import { stringAvatar } from "../../common/StringAvatar.js";
import { usePageEffect } from "../../core/page.js";
import { GPTDrawer } from "../../layout/drawer/GPTDrawer.js";
import { AppContext } from "../../stores/index.js";

export default function Home(): JSX.Element {
  const { commonStore, feedStore, boardStore } = React.useContext(AppContext);

  usePageEffect({
    title: "Home",
  });

  React.useEffect(() => {
    commonStore.setLoading(true);

    feedStore.getFeedData(10, 1).then(() => {
      boardStore.getBoardData("notice", 8, 1).then(() => {
        commonStore.setLoading(false);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {feedStore.feedData ? (
        <>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                flexDirection: commonStore.isDesktop ? "row" : "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                className="hideScroll"
                sx={{
                  width: 500,
                  height: commonStore.baseInfo.height,
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    my: 10,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Button
                      color="info"
                      fullWidth
                      sx={{
                        cursor: "pointer",

                        fontSize: 14,

                        p: 0,
                      }}
                      onClick={async () => {
                        const url = `/ai-branding/create`;

                        const result = await commonStore.syncAppInfo(
                          commonStore.appInfo.isAdmin,
                          true,
                          url,
                        );

                        if (!result) {
                          return;
                        }

                        feedStore.setFeedUploadModal(true);
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "1rem",

                          bgcolor: "background.paper",

                          width: "100%",

                          display: "flex",
                          alignItems: "center",

                          p: 2,
                        }}
                      >
                        <IconButton>
                          <Add />
                        </IconButton>

                        <Language label="하고싶은 이야기가 있나요?" />
                      </Box>
                    </Button>
                  </Box>

                  <Grid container spacing={commonStore.isDesktop ? 3 : 1}>
                    {feedStore.feedData?.collect.repagination.map(
                      (v: any, i: number) => (
                        <>
                          <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                            <Card
                              sx={{
                                borderRadius: "1rem",

                                boxShadow: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar {...stringAvatar(v.author)} />

                                  <Typography
                                    variant="body2"
                                    sx={{
                                      ml: 2,
                                      my: 1,
                                      fontSize: 14,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {v.author}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      mx: 1,
                                      fontSize: 12,
                                    }}
                                  >
                                    ·
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    {v.time.years > 0 ? (
                                      <>
                                        {v.time.years}&nbsp;
                                        <Language label="년 전" />
                                      </>
                                    ) : v.time.months > 0 ? (
                                      <>
                                        {v.time.months}&nbsp;
                                        <Language label="개월 전" />
                                      </>
                                    ) : v.time.dates > 0 ? (
                                      <>
                                        {v.time.day}&nbsp;
                                        <Language label="일 전" />
                                      </>
                                    ) : v.time.hours > 0 ? (
                                      <>
                                        {v.time.hours}&nbsp;
                                        <Language label="시간 전" />
                                      </>
                                    ) : v.time.minutes > 0 ? (
                                      <>
                                        {v.time.minutes}&nbsp;
                                        <Language label="분 전" />
                                      </>
                                    ) : v.time.seconds > 0 ? (
                                      <>
                                        {v.time.seconds} &nbsp;
                                        <Language label="초 전" />
                                      </>
                                    ) : (
                                      <Language label="지금" />
                                    )}
                                  </Typography>
                                </Box>

                                <Box
                                  sx={{
                                    my: 3,

                                    maxHeight: 200,
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: v.content ?? "",
                                    }}
                                  />
                                </Box>

                                <Button
                                  color="primary"
                                  variant="contained"
                                  fullWidth
                                  onClick={async () => {
                                    commonStore.setLoading(true);

                                    await feedStore.getFeedDetailedData(v.id, {
                                      all: true,
                                    });

                                    commonStore.setLoading(false);

                                    feedStore.setFeedInput({
                                      ...feedStore.feedInput,

                                      feedId: v.id,
                                      index: i,
                                    });

                                    feedStore.setFeedDetailModal(true);
                                  }}
                                >
                                  <Language label="본문 전체보기" />
                                </Button>
                              </Box>

                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItem: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      feedStore.likeFeedContent(v.id);
                                    }}
                                  >
                                    <Language label="좋아요" /> &nbsp;
                                    {v._count.feedBoardLike}
                                  </Typography>
                                </Box>
                              </Box>

                              <Divider />

                              <Box
                                sx={{
                                  p: 2,
                                  cursor: "pointer",
                                }}
                                onClick={async () => {
                                  commonStore.setLoading(true);

                                  await feedStore.getFeedDetailedData(v.id, {
                                    all: true,
                                  });

                                  commonStore.setLoading(false);

                                  feedStore.setFeedInput({
                                    ...feedStore.feedInput,

                                    feedId: v.id,
                                    index: i,
                                  });

                                  feedStore.setFeedDetailModal(true);
                                }}
                              >
                                {v?.feedBoardComment.length > 0 ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar
                                          {...stringAvatar(
                                            v?.feedBoardComment[0]?.author,
                                          )}
                                        />

                                        <Box>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              ml: 2,
                                              fontSize: 14,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {v?.feedBoardComment[0]?.author}
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Typography
                                        variant="body2"
                                        sx={{
                                          ml: 2,

                                          fontSize: 14,
                                        }}
                                      >
                                        {v?.feedBoardComment[0]?.content}
                                      </Typography>
                                    </Box>
                                  </>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <Language label="작성된 댓글이 없습니다." />
                                  </Typography>
                                )}
                              </Box>
                            </Card>
                          </Grid>
                        </>
                      ),
                    )}
                  </Grid>
                </Box>
              </Box>

              <Box
                className="hideScroll"
                sx={{
                  width: 500,
                  height: commonStore.baseInfo.height,
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "1rem",

                    bgcolor: "background.paper",

                    height: 240,

                    mt: 10,
                    mb: 3,

                    p: 3,
                  }}
                >
                  <Typography fontSize={18} fontWeight="bold">
                    <Language label="공지사항" />
                  </Typography>

                  <List>
                    {boardStore.boardNoticeData?.pagination.map(
                      (v: any, i: number) => {
                        return (
                          <>
                            <ListItem
                              key={i}
                              sx={{
                                px: 0,
                              }}
                            >
                              <Button
                                color="inherit"
                                variant="text"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                                fullWidth
                                onClick={() => {
                                  boardStore.getBoardDetailed(v.id, "notice");
                                }}
                              >
                                <Box>{v.title}</Box>
                                <Box>{getLocaleTime(v.createdAt)}</Box>
                              </Button>
                              <Divider sx={{}} />
                            </ListItem>
                          </>
                        );
                      },
                    )}
                  </List>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{
                        display: "flex",
                        p: 3,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        commonStore.setGptDrawer(true);
                      }}
                    >
                      <Typography fontSize={18} fontWeight="bold">
                        <Language label="Chat-GPT 사용해보기" />
                      </Typography>

                      <Chip
                        clickable
                        color="secondary"
                        size="small"
                        label="BETA"
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      disabled
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        height: 136,
                      }}
                    >
                      <Typography
                        fontSize={18}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        <Language label="내 주변 브랜드/기업" />
                      </Typography>
                      <Chip
                        clickable
                        color="default"
                        size="small"
                        label="COMMING SOON"
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      disabled
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        height: 136,
                      }}
                    >
                      <Typography
                        fontSize={18}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        <Language label="창업 펀딩 & 투자하기" />
                      </Typography>
                      <Chip
                        clickable
                        color="default"
                        size="small"
                        label="COMMING SOON"
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      disabled
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        height: 136,
                      }}
                    >
                      <Typography
                        fontSize={18}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        <Language label="제품/서비스 홍보하기" />
                      </Typography>

                      <Chip
                        clickable
                        color="default"
                        size="small"
                        label="COMMING SOON"
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      disabled
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        height: 136,
                      }}
                    >
                      <Typography
                        fontSize={18}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        <Language label="웹사이트 만들기" />
                      </Typography>
                      <Chip
                        clickable
                        color="default"
                        size="small"
                        label="COMMING SOON"
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      disabled
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        height: 136,
                      }}
                    >
                      <Typography
                        fontSize={18}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        <Language label="인플루언서 매칭하기" />
                      </Typography>

                      <Chip
                        clickable
                        color="default"
                        size="small"
                        label="COMMING SOON"
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </>
      ) : null}

      <FeedUploadModal />
      <FeedDetailModal />

      <NoticeModal />

      <GPTDrawer />
    </>
  ));
}

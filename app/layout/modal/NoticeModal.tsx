import * as React from "react";

import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import BaseModal from "../../common/BaseModal.js";
import { getLocaleTime } from "../../common/Functions.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function NoticeModal(): JSX.Element {
  const { commonStore, boardStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={boardStore.boardNoticeDetailed?.title ? true : false}
      onClose={() => {
        boardStore.initBoardDetailed("notice");
      }}
    >
      <BaseModal
        width={800}
        header={
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={18} fontWeight="bold">
                {boardStore.boardNoticeDetailed?.title}
              </Typography>

              <IconButton
                onClick={() => {
                  boardStore.initBoardDetailed("notice");
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </>
        }
        footer={
          boardStore.boardNoticeDetailed?.attached ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color="text.secondary">
                첨부파일:{" "}
                {
                  boardStore.boardNoticeDetailed?.attached.split("/")[
                    boardStore.boardNoticeDetailed?.attached.split("/").length -
                      1
                  ]
                }
              </Typography>

              <a href={boardStore.boardNoticeDetailed?.attached}>
                첨부파일 다운로드
              </a>
            </Box>
          ) : (
            <Typography color="text.secondary">
              {wordList["첨부파일 없음"][commonStore.appInfo.language]}
            </Typography>
          )
        }
      >
        <Typography color="text.secondary" fontSize={14}>
          {getLocaleTime(boardStore.boardNoticeDetailed?.updatedAt ?? "")}{" "}
          게시됨
        </Typography>

        <Box
          sx={{
            height: 400,
            overflowY: "auto",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: boardStore.boardNoticeDetailed?.content ?? "",
            }}
          />
        </Box>
      </BaseModal>
    </Modal>
  ));
}

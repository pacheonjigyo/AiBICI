import * as React from "react";
import BaseModal from "../../common/BaseModal.js";

import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { BigButton } from "../../common/BigButton.js";
import { readAsDataURLAsync } from "../../common/FileManager.js";
import { uploadToS3, uploadToS3Editor } from "../../common/FileUpload.js";
import { Language } from "../../common/Language.js";
import { ToastUIEditor } from "../../common/ToastUIEditor.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function FeedUploadModal(): JSX.Element {
  const { commonStore, feedStore, identityDataStore } =
    React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={feedStore.feedUploadModal}
      onClose={() => {
        feedStore.setFeedUploadModal(false);
      }}
    >
      <BaseModal
        width={800}
        header={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={18} fontWeight="bold">
              <Language label="하고싶은 이야기가 있나요?" />
            </Typography>

            <IconButton
              onClick={() => {
                feedStore.setFeedUploadModal(false);
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
            <BigButton
              color="secondary"
              variant="contained"
              onClick={async () => {
                const result = await uploadToS3Editor(
                  feedStore.feedInput.content,
                  `user/board/${new Date().getTime()}`,
                );

                feedStore.setFeedInput({
                  ...feedStore.feedInput,

                  thumbnail: result.thumbnail,
                  content: result.content,
                });

                feedStore.addFeedContent();
              }}
            >
              {wordList["게시하기"][commonStore.appInfo.language]}
            </BigButton>
          </Box>
        }
      >
        <Box sx={{}}>
          <ToastUIEditor
            onBlur={(e: string) => {
              feedStore.setFeedInput({
                ...feedStore.feedInput,
                content: e,
              });
            }}
            initialValue={feedStore.feedInput.content}
          />

          <Button
            color="inherit"
            variant="contained"
            component="label"
            sx={{
              mt: 3,
            }}
          >
            <Language label="첨부파일" />

            <input
              hidden
              id="FeedCreate_Attachment"
              type="file"
              placeholder=""
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                const attached = e.target.files ? e.target.files[0] : null;

                if (!attached) {
                  return;
                }

                const splitedName = attached.name.split(".");

                const exts = splitedName.pop();

                if (!exts) {
                  return;
                }

                const attachedBase64 = await readAsDataURLAsync(attached);

                if (typeof attachedBase64 !== "string") {
                  return;
                }

                const data = attachedBase64.split(",")[1];
                const url = await uploadToS3(
                  data,
                  `user/board/attached/${splitedName}_${new Date().getTime()}`,
                  exts,
                  exts,
                );

                feedStore.setFeedInput({
                  ...feedStore.feedInput,
                  attached: url,
                });
              }}
            />
          </Button>
        </Box>
      </BaseModal>
    </Modal>
  ));
}

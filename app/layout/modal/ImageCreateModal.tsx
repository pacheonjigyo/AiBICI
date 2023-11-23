import * as React from "react";

import { Button, ButtonGroup, Modal, Typography } from "@mui/material";

import { useObserver } from "mobx-react";
import BaseModal from "../../common/BaseModal.js";
import { readAsDataURLAsync } from "../../common/FileManager.js";
import { getRealUrl, uploadToS3 } from "../../common/FileUpload.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function ImageCreateModal(): JSX.Element {
  const {
    commonStore,
    engineStore,
    engineDataStore,
    libraryDataStore,
    identityDataStore,
  } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  return useObserver(() => (
    <>
      <Modal
        open={engineStore.imageCreateModal}
        onClose={() => {
          engineStore.setImageCreateModal(false);
        }}
      >
        <>
          <BaseModal
            header={
              <Typography
                fontSize={20}
                fontWeight="bold"
                sx={{
                  mb: 3,
                }}
              >
                이미지를 가져올 방법을 선택해주세요.
              </Typography>
            }
            footer={null}
          >
            <ButtonGroup
              // orientation="vertical"
              color="primary"
              variant="contained"
              sx={{
                width: "100%",
              }}
            >
              {/* <Button
                              sx={{
                                width: "100%",
                                height: 50,
                                mb: 1,
                              }}
                            >
                              <Typography fontSize={16}>AI 이미지</Typography>
                            </Button> */}

              <Button
                component="label"
                sx={{
                  width: "100%",
                  height: 50,
                }}
              >
                <Typography fontSize={16}>파일 업로드</Typography>

                <input
                  type="file"
                  hidden
                  onChange={async (e: any) => {
                    const file = e.target.files[0];

                    if (!file) {
                      return;
                    }

                    const base64: any = await readAsDataURLAsync(file);
                    const url: any = await uploadToS3(
                      base64.split(",")[1],
                      `test/images_${new Date().getTime()}`,
                      file.name.split(".")[1],
                      file.type,
                    );

                    await libraryDataStore.createLibraryData(url);
                  }}
                />
              </Button>

              <Button
                sx={{
                  ml: 1,
                  width: "100%",
                  height: 50,
                }}
                onClick={async () => {
                  const input = prompt("URL을 입력해주세요.");

                  if (!input) {
                    alert("URL이 입력되지 않았습니다.");

                    return;
                  }

                  const realUrl = getRealUrl(input);

                  const urlResp = await fetch(realUrl);
                  const urlBlob = await urlResp.blob();
                  const urlBase64: any = await readAsDataURLAsync(urlBlob);

                  const url: any = await uploadToS3(
                    urlBase64.split(",")[1],
                    `test/images_${new Date().getTime()}`,
                    urlBlob.type.split("/")[1],
                    urlBlob.type,
                  );

                  await libraryDataStore.createLibraryData(url);
                }}
              >
                <Typography fontSize={16}>URL 가져오기</Typography>
              </Button>
            </ButtonGroup>
          </BaseModal>
        </>
      </Modal>
    </>
  ));
}

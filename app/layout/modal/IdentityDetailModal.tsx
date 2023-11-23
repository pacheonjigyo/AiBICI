import * as React from "react";
import BaseModal from "../../common/BaseModal.js";
import IdentityDetail from "./identityModal/Detail.js";

import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { BigButton } from "../../common/BigButton.js";
import { uploadToS3Editor } from "../../common/FileUpload.js";
import { Language } from "../../common/Language.js";
import { AppContext } from "../../stores/index.js";

export default function IdentityDetailModal(): JSX.Element {
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={identityDataStore.detailedInfo.modalDetail}
      onClose={() => {
        identityDataStore.setDetailedInfo({
          ...identityDataStore.detailedInfo,

          modalDetail: false,
        });
      }}
    >
      <BaseModal
        width={1000}
        height={commonStore.baseInfo.height - 300}
        header={
          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={18}
              sx={{
                fontWeight: "bold",
              }}
            >
              <Language label="브랜드 수정하기" />
            </Typography>

            <IconButton
              onClick={() => {
                identityDataStore.setDetailedInfo({
                  ...identityDataStore.detailedInfo,

                  modalDetail: false,
                });
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
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <BigButton
              color="secondary"
              variant="contained"
              onClick={async (e) => {
                const result = await uploadToS3Editor(
                  identityDataStore.detailedData.serviceMarketing
                    .descriptionHTML,
                  `user/service/${
                    identityDataStore.detailedInfo.id
                  }/${new Date().getTime()}`,
                );

                identityDataStore.setDetailedData({
                  ...identityDataStore.detailedData,

                  serviceMarketing: {
                    description: result.content,
                  },
                });

                await identityDataStore.updateDetailedDataAll(
                  identityDataStore.detailedInfo.id,
                );

                await commonStore.setLoading(true);
                await identityDataStore.getServiceData(
                  10,
                  identityDataStore.page,
                );

                commonStore.setLoading(false);
              }}
            >
              <Language label="저장" />
            </BigButton>
          </Box>
        }
      >
        <IdentityDetail />
      </BaseModal>
    </Modal>
  ));
}

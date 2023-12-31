import * as React from "react";
import BaseModal from "../../common/BaseModal.js";

import { Box, IconButton, Modal, Typography } from "@mui/material";

import { Close } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

export default function ConfirmModal(props: any): JSX.Element {
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={commonStore.confirmModal}
      onClose={() => {
        commonStore.setConfirmModal(false);
      }}
    >
      <BaseModal
        header={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography fontSize={24} fontWeight="bold">
                {props.title}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  alert("test");
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
        }
        footer={null}
      >
        정말 삭제하시겠습니까?
      </BaseModal>
    </Modal>
  ));
}

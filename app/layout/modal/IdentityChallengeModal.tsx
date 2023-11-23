import * as React from "react";

import { Box, Modal, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import BaseModal from "../../common/BaseModal.js";
import { BigButton } from "../../common/BigButton.js";
import { Language } from "../../common/Language.js";
import { AppContext } from "../../stores/index.js";
import IdentityChallenge from "./identityModal/Challenge.js";

export default function IdentityChallengeModal(): JSX.Element {
  const { commonStore, identityDataStore, boardStore } =
    React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={identityDataStore.detailedInfo.modalChallenge}
      onClose={() => {
        identityDataStore.setDetailedInfo({
          ...identityDataStore.detailedInfo,

          modalChallenge: false,
        });
      }}
    >
      <BaseModal
        header={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontSize={18}
              sx={{
                fontWeight: "bold",
              }}
            >
              <Language label="창업도전" />
            </Typography>
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
              disabled
              variant="contained"
              onClick={(e) => {
                //
              }}
            >
              {/* <Language label="도전하기" /> */}
              Comming Soon
            </BigButton>
          </Box>
        }
      >
        <IdentityChallenge />
      </BaseModal>
    </Modal>
  ));
}

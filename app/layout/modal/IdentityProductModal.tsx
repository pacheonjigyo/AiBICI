import * as React from "react";
import BaseModal from "../../common/BaseModal.js";
import IdentityProduct from "./identityModal/Product.js";

import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { BigButton } from "../../common/BigButton.js";
import { uploadToS3Editor } from "../../common/FileUpload.js";
import { Language } from "../../common/Language.js";
import { AppContext } from "../../stores/index.js";

export default function IdentityProductModal(): JSX.Element {
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={identityDataStore.detailedInfo.modalProduct}
      onClose={() => {
        identityDataStore.setDetailedInfo({
          ...identityDataStore.detailedInfo,

          modalProduct: false,
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
              <Language label="마켓등록" />
            </Typography>

            <IconButton
              onClick={() => {
                identityDataStore.setDetailedInfo({
                  ...identityDataStore.detailedInfo,

                  modalProduct: false,
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
            {/* <BigButton
              variant="contained"
              onClick={(e) => {
                connectViaMetaMask();
              }}
            >
              MetaMask 연결
            </BigButton>

            <BigButton
              variant="contained"
              onClick={(e) => {
                mintNFTViaMetaMask(
                  "0x90755D6bd765212c12d575A511510460B43AB066",
                  "QmZ7V13FAxsq2s7YzpwGZ9pzr9yJUKJqHLUjtppjmcMTGJ",
                );
              }}
              sx={{
                mx: 1,
              }}
            >
              NFT 민팅
            </BigButton>

            <BigButton
              variant="contained"
              onClick={async (e) => {
                const price = await convertKRWToMATIC(3);

                console.log(price);

                listNFTViaMetaMask(
                  "0x35e6838f2213731334671F0f644B598696429796",
                  0,
                  price,
                );
              }}
            >
              판매시작
            </BigButton>

            <BigButton
              variant="contained"
              onClick={(e) => {
                unlistNFTViaMetaMask(
                  "0x90755D6bd765212c12d575A511510460B43AB066",
                  0,
                );
              }}
              sx={{
                mx: 1,
              }}
            >
              판매중지
            </BigButton>

            <BigButton
              variant="contained"
              onClick={(e) => {
                buyNFTViaMetamask(
                  "0x35e6838f2213731334671F0f644B598696429796",
                  0,
                );
              }}
              sx={{
                mr: 1,
              }}
            >
              구매하기
            </BigButton> */}

            <BigButton
              color="secondary"
              variant="contained"
              onClick={async (e) => {
                console.log(
                  identityDataStore.detailedData.serviceProduct.descriptionHTML,
                );

                const result = await uploadToS3Editor(
                  identityDataStore.detailedData.serviceProduct.descriptionHTML,
                  `user/service/${
                    identityDataStore.detailedInfo.id
                  }/${new Date().getTime()}`,
                );

                identityDataStore.setDetailedData({
                  ...identityDataStore.detailedData,

                  serviceProduct: {
                    ...identityDataStore.detailedData.serviceProduct,

                    description: result.content,
                  },
                });

                identityDataStore.createProduct(identityDataStore.detailedData);
              }}
            >
              <Language label="등록" />
            </BigButton>
          </Box>
        }
      >
        <IdentityProduct />
      </BaseModal>
    </Modal>
  ));
}

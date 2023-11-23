import * as React from "react";
import BaseModal from "../../common/BaseModal.js";
import Image from "../../common/Image.js";

import {
  Box,
  Button,
  Grid,
  Modal,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { Language } from "../../common/Language.js";
import { AppContext } from "../../stores/index.js";

export default function BrandListModal(): JSX.Element {
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  React.useEffect(() => {
    commonStore.setLoading(true);

    identityDataStore.getServiceData(10, identityDataStore.page).then(() => {
      commonStore.setLoading(false);
    });
  }, []);

  return useObserver(() => (
    <Modal
      open={identityDataStore.serviceInfo.modal}
      onClose={() => {
        identityDataStore.setServiceInfo({
          ...identityDataStore.serviceInfo,

          modal: false,
        });
      }}
    >
      <BaseModal
        width={1200}
        height={commonStore.baseInfo.height - 300}
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
              <Typography fontSize={18} fontWeight="bold">
                <Language label="어떤 브랜드를 키워볼까요?" />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pagination
                count={identityDataStore.serviceData?.totalPage}
                color="primary"
                page={identityDataStore.page}
                onChange={(e, page) => {
                  identityDataStore.setPage(page);
                  identityDataStore.getServiceData(10, page);
                }}
              />
            </Box>
          </Box>
        }
        footer={null}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3}>
            {identityDataStore.serviceData?.pagination.map((v: any, i) => {
              return v.service.map((w) => (
                <Grid key={i} item xs={commonStore.isDesktop ? 3 : 12}>
                  <Paper
                    variant="outlined"
                    sx={{
                      borderTopLeftRadius: "1em",
                      borderBottomLeftRadius: "1em",

                      borderRadius: "1em",
                      boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                      maxWidth: "100%",

                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        p: 3,

                        width: "100%",
                      }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{
                          position: "relative",

                          left: 0,
                          top: 0,

                          width: 216,
                          height: 216,

                          fontSize: 18,

                          borderRadius: "1em",
                        }}
                        onClick={() => {
                          identityDataStore.applyChallenge(w.id);
                        }}
                      >
                        <Image
                          src={w.serviceCore.logo}
                          alt="정보이미지1"
                          style={{
                            position: "absolute",

                            background: "white",
                            borderRadius: "1em",
                            width: 216,
                            height: 216,
                            objectFit: "contain",

                            opacity:
                              w.serviceChallenge &&
                              w.serviceChallenge.status === "start"
                                ? 0.1
                                : 1,
                          }}
                        />

                        <Button
                          color={
                            w.serviceChallenge &&
                            w.serviceChallenge.status === "start"
                              ? "primary"
                              : "secondary"
                          }
                          variant="contained"
                          sx={{
                            position: "absolute",

                            left: "50%",
                            bottom: 10,

                            transform: "translateX(-50%)",

                            zIndex: 10,

                            width: 200,
                          }}
                        >
                          {w.serviceChallenge &&
                          w.serviceChallenge.status === "start" ? (
                            <Language label="도전중" />
                          ) : (
                            <Language label="도전하기" />
                          )}
                        </Button>
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ));
            })}
          </Grid>
        </Box>
      </BaseModal>
    </Modal>
  ));
}

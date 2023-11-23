import * as React from "react";
import BrandListModal from "../../../layout/modal/BrandListModal.js";

import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../../common/Language.js";
import { SoftButton } from "../../../common/SoftButton.js";
import { AppContext } from "../../../stores/index.js";

export default function ApplyChallenge(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, engineStore, identityDataStore } =
    React.useContext(AppContext);

  React.useEffect(() => {
    engineStore.setStep(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          pt: 5,
        }}
      >
        <Container maxWidth={"lg"}>
          <Grid container spacing={3}>
            <Grid item xs={commonStore.isDesktop ? 12 : 12}>
              <SoftButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    borderRadius: "1rem",

                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      color="text.primary"
                      fontSize={commonStore.isDesktop ? 24 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                      }}
                    >
                      <Language label="기본정보 완성하기" />

                      <Chip
                        size="small"
                        color="success"
                        label={<Language label="쉬움" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Language label="기본정보 완성하기 - 상세" />
                    </Typography>

                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        width: 180,
                        height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        identityDataStore.setServiceInfo({
                          ...identityDataStore.serviceInfo,

                          modal: true,
                        });
                      }}
                    >
                      <Language label="시작하기" />
                    </Button>
                  </Box>
                </Box>
              </SoftButton>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 12 : 12}>
              <SoftButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      color="text.primary"
                      fontSize={commonStore.isDesktop ? 24 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                      }}
                    >
                      <Language label="마케팅 준비하기" />

                      <Chip
                        size="small"
                        color="warning"
                        label={<Language label="보통" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Language label="마케팅 준비하기 - 상세" />
                    </Typography>

                    <Button
                      disabled
                      variant="contained"
                      color="info"
                      sx={{
                        width: 180,
                        height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        navigate("/startup-challenge/apply/marketer");
                      }}
                    >
                      Comming Soon
                    </Button>
                  </Box>
                </Box>
              </SoftButton>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 12 : 12}>
              <SoftButton>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      color="text.primary"
                      fontSize={commonStore.isDesktop ? 24 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                      }}
                    >
                      <Language label="상표권 출원/등록하기" />

                      <Chip
                        size="small"
                        color="error"
                        label={<Language label="어려움" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Language label="상표권 출원/등록하기 - 상세" />
                    </Typography>

                    <Button
                      disabled
                      variant="contained"
                      color="info"
                      sx={{
                        width: 180,
                        height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        navigate("/startup-challenge/apply/copyrighter");
                      }}
                    >
                      Comming Soon
                    </Button>
                  </Box>
                </Box>
              </SoftButton>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 12 : 12}>
              <SoftButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      color="text.primary"
                      fontSize={commonStore.isDesktop ? 24 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                      }}
                    >
                      <Language label="견고화 및 확장하기" />

                      <Chip
                        size="small"
                        color="error"
                        label={<Language label="어려움" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Language label="견고화 및 확장하기 - 상세" />
                    </Typography>

                    <Button
                      disabled
                      variant="contained"
                      color="info"
                      sx={{
                        width: 180,
                        height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        navigate("/startup-challenge/apply/venture");
                      }}
                    >
                      Comming Soon
                    </Button>
                  </Box>
                </Box>
              </SoftButton>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <BrandListModal />
    </>
  ));
}

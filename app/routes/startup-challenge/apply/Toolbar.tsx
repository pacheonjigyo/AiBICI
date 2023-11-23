import * as React from "react";

import { Home, KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { APIGateway } from "../../../common/Gateway.js";
import { GPTDrawer } from "../../../layout/drawer/GPTDrawer.js";
import { AppContext } from "../../../stores/index.js";

export default function Toolbar(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, engineStore, engineDataStore } =
    React.useContext(AppContext);

  React.useEffect(() => {
    engineStore.setStep(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "#e5e5e5",
          borderTop: 1,
          borderRight: 1,
          borderColor: "divider",

          width: "100%",
          height: commonStore.isDesktop ? 110 : "auto",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          p: 3,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              sx={{
                fontSize: 18,
                width: commonStore.isDesktop ? 180 : "100%",
                height: 60,
              }}
              onClick={() => {
                // onPrevious();

                engineStore.setStep(0);

                navigate("/ai-branding/create");
              }}
              startIcon={<KeyboardArrowLeft />}
            >
              뒤로가기
            </Button>

            <Button
              color="inherit"
              variant="contained"
              sx={{
                ml: 1,

                fontSize: 18,
                fontWeight: "bold",

                height: 60,
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Home />
            </Button>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <Button
              color="info"
              variant="contained"
              sx={{
                mr: 1,

                fontSize: 18,
                fontWeight: "bold",

                height: 60,
              }}
              onClick={() => {
                commonStore.setGptDrawer(true);
              }}
            >
              GPT
            </Button>

            {window.location.pathname === "/ai-branding/create/quest" ? (
              <>
                <Button
                  disabled={engineStore.step < 5}
                  variant="contained"
                  color="secondary"
                  sx={{
                    fontSize: 18,
                    width: 180,
                    height: 60,
                  }}
                  onClick={async () => {
                    engineStore.setLogoSaveModal(true);
                  }}
                >
                  브랜드 저장하기
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    fontSize: 18,
                    width: 180,
                    height: 60,
                  }}
                  onClick={async () => {
                    const brandJson = await APIGateway(
                      {
                        query: "serviceRegisters/upload",
                        method: "POST",
                        data: {
                          service: {
                            type: engineDataStore.brandInfo.identity,
                            category: engineDataStore.brandInfo.category,
                            industry: engineDataStore.brandInfo.industry,
                            name: engineDataStore.brandInfo.name,
                            color: engineDataStore.brandInfo.color,
                            font_family: engineDataStore.brandInfo.fontFamily,

                            logo: engineDataStore.brandInfo.logo,
                            slogan: engineDataStore.brandInfo.slogan,
                            core_value: engineDataStore.brandInfo.coreValue,

                            story: engineDataStore.brandInfo.story,
                            mission: engineDataStore.brandInfo.mission,
                            vision: engineDataStore.brandInfo.vision,

                            special: {
                              name: "",
                              nameKor: "",
                            },

                            description: "",
                          },
                        },
                        auth: true,
                      },
                      false,
                    );

                    if (brandJson.error) {
                      alert(brandJson.error.message);

                      return;
                    }

                    const accept = confirm(
                      "브랜드 정보가 저장되었어요.\n생성된 브랜드는 [마이페이지]에서 계속 관리할 수 있어요.\n\n[확인] 버튼을 클릭하시면 해당 브랜드의 프로필로 이동할게요.",
                    );

                    if (!accept) {
                      navigate(`/ai-branding/create`);

                      return;
                    }

                    navigate(`/identity/${brandJson.serviceInput.serviceId}`);
                  }}
                >
                  브랜드 저장하기
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>

      <GPTDrawer />
    </>
  ));
}

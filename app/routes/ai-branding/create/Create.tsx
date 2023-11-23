import * as React from "react";

import { Chat, Create, Image, Quiz } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { SoftButton } from "../../../common/SoftButton.js";
import { AppContext } from "../../../stores/index.js";

export default function CreateIdentity(): JSX.Element {
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          my: "60px",
          pt: 5,
        }}
      >
        <Container maxWidth={"lg"}>
          <Grid container spacing={3}>
            <Grid item xs={commonStore.isDesktop ? 6 : 12}>
              <SoftButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "80%",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Typography
                      fontSize={commonStore.isDesktop ? 32 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      스케치 브랜딩
                    </Typography>

                    <Typography
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      직접 밑그림부터 브랜드 만들어보기
                      <br />
                      <br />
                      <span style={{ color: "gray" }}>
                        소요시간: 약 1분
                        <br />
                        원하는 로고를 만들어보세요.
                      </span>
                    </Typography>

                    <Button
                      variant="contained"
                      color="info"
                      sx={{
                        width: 180,
                        // height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        navigate("/ai-branding/create/sketch");
                      }}
                    >
                      시작하기
                    </Button>
                  </Box>

                  <Create
                    sx={{
                      fontSize: 80,
                    }}
                  />
                </Box>
              </SoftButton>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 6 : 12}>
              <SoftButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "80%",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Typography
                      fontSize={commonStore.isDesktop ? 32 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      챗 브랜딩
                    </Typography>

                    <Typography
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      Chat-GPT를 활용해 영감 얻기
                      <br />
                      <br />
                      <span style={{ color: "gray" }}>
                        소요시간: 약 5분
                        <br />
                        좋은 질의 스토리를 얻을 수 있어요.
                      </span>
                    </Typography>

                    <Button
                      variant="contained"
                      color="info"
                      sx={{
                        width: 180,
                        // height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        navigate("/ai-branding/create/chat");
                      }}
                    >
                      시작하기
                    </Button>
                  </Box>

                  <Chat
                    sx={{
                      fontSize: 80,
                    }}
                  />
                </Box>
              </SoftButton>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 6 : 12}>
              <SoftButton>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "80%",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Typography
                      fontSize={commonStore.isDesktop ? 32 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      이미지 브랜딩
                    </Typography>

                    <Typography
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      기존 롤모델/이미지 리디자인하기
                      <br />
                      <br />
                      <span style={{ color: "gray" }}>
                        소요시간: 약 1분
                        <br />
                        기존 디자인의 특징을 반영할 수 있어요.
                      </span>
                    </Typography>

                    <Button
                      variant="contained"
                      color="info"
                      sx={{
                        width: 180,
                        // height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        navigate("/ai-branding/create/image");
                      }}
                    >
                      시작하기
                    </Button>
                  </Box>

                  <Image
                    sx={{
                      fontSize: 80,
                    }}
                  />
                </Box>
              </SoftButton>
            </Grid>

            <Grid item xs={commonStore.isDesktop ? 6 : 12}>
              <SoftButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "80%",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Typography
                      fontSize={commonStore.isDesktop ? 32 : 20}
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      자동생성 브랜딩
                    </Typography>

                    <Typography
                      fontSize={commonStore.isDesktop ? 16 : 12}
                      sx={{
                        mb: 3,
                      }}
                    >
                      퀘스트를 수행하고 빠르게 만들기
                      <br />
                      <br />
                      <span style={{ color: "gray" }}>
                        소요시간: 약 3분
                        <br />
                        전체적으로 무난한 결과가 나타나요.
                      </span>
                    </Typography>

                    <Button
                      variant="contained"
                      color="info"
                      sx={{
                        width: 180,
                        // height: 60,
                        fontSize: 18,
                      }}
                      onClick={() => {
                        navigate("/ai-branding/create/quest");
                      }}
                    >
                      시작하기
                    </Button>
                  </Box>

                  <Quiz
                    sx={{
                      fontSize: 80,
                    }}
                  />
                </Box>
              </SoftButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  ));
}

import * as React from "react";

import { Close, Refresh } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { floatingToast } from "../../common/FloatingToast.js";
import { usePageEffect } from "../../core/page.js";
import { artists } from "../../data/artists.js";
import { colorList } from "../../data/colorList.js";
import { emotions } from "../../data/emotions.js";
import { materials } from "../../data/materials.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function LogoGenerationModal(): JSX.Element {
  const { id } = useParams();
  const {
    commonStore,
    canvasStore,
    engineStore,
    engineDataStore,
    identityDataStore,
  } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    if (!id) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Modal
        open={engineStore.logoGeneratorModal}
        onClose={() => {
          engineStore.setLogoGeneratorModal(false);
        }}
      >
        <>
          <Paper
            variant="outlined"
            sx={{
              position: "fixed",

              top: "50%",
              left: "50%",

              transform: "translate(-50%, -50%)",

              p: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight={"bold"}>
                  로고 재생성 - 전문가용
                </Typography>

                <IconButton
                  onClick={() => {
                    engineStore.setLogoGeneratorModal(false);
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                mb: 3,
              }}
            >
              {engineDataStore.brandIdentity.logo.length > 0 ? (
                <Paper
                  variant="outlined"
                  sx={{
                    width: 800,
                    mr: 3,
                    p: 3,
                  }}
                >
                  <Grid container spacing={1} sx={{}}>
                    {engineDataStore.brandIdentity.logo.map((v, i) => (
                      <>
                        {v?.result.predictions.map((w, j) => {
                          return (
                            <Grid
                              key={i}
                              item
                              xs={3}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Card
                                sx={{
                                  boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                                }}
                                onClick={() => {
                                  if (!id) {
                                    return;
                                  }

                                  engineDataStore.setBrandInfo({
                                    ...engineDataStore.brandInfo,

                                    logo: w,

                                    selected: {
                                      ...engineDataStore.brandInfo.selected,

                                      logo: j,
                                    },

                                    resulted: {
                                      ...engineDataStore.brandInfo.resulted,

                                      logo: i,
                                    },
                                  });

                                  identityDataStore.setDetailedData({
                                    ...identityDataStore.detailedData,

                                    serviceCore: {
                                      ...identityDataStore.detailedData
                                        .serviceCore,

                                      logo: w,
                                    },
                                  });
                                }}
                              >
                                <CardActionArea>
                                  <Box
                                    sx={{
                                      border:
                                        engineDataStore.brandInfo.resulted
                                          .logo === i &&
                                        engineDataStore.brandInfo.selected
                                          .logo === j
                                          ? "3px solid #8265ff"
                                          : "3px solid white",
                                      position: "relative",
                                      width: "100%",
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      image={w}
                                      width={"100%"}
                                      // height={100}
                                      alt={`로고결과이미지${i + 1}`}
                                    />
                                  </Box>
                                </CardActionArea>
                              </Card>
                            </Grid>
                          );
                        })}
                      </>
                    ))}
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Button
                      color="inherit"
                      variant="contained"
                      disabled={engineDataStore.isEngineBusy}
                      disableElevation
                      sx={{
                        height: 48,
                      }}
                      onClick={() => {
                        const accept = confirm(
                          "현재 생성결과는 내 라이브러리에서 확인하실 수 있습니다.\n생성을 다시하시겠습니까?",
                        );

                        if (!accept) {
                          return;
                        }

                        engineDataStore.setBrandIdentity({
                          ...engineDataStore.brandIdentity,

                          logo: [],
                        });
                      }}
                    >
                      처음부터 다시만들기
                    </Button>

                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Button
                        color="info"
                        variant="contained"
                        disabled={engineDataStore.isEngineBusy}
                        disableElevation
                        sx={{
                          height: 48,
                        }}
                        onClick={() => {
                          engineDataStore.getIdentity(
                            identityDataStore.detailedData.serviceCore.engineId,
                            true,
                            "logo",
                            false,
                          );
                        }}
                      >
                        {!engineDataStore.isEngineBusy ? (
                          <>다시시도</>
                        ) : (
                          <>
                            <CircularProgress color="secondary" size="1rem" />
                            &nbsp; 다시 만드는 중...
                          </>
                        )}
                      </Button>
                      &nbsp;
                      <Button
                        variant="contained"
                        disabled={engineDataStore.isEngineBusy}
                        disableElevation
                        sx={{
                          height: 48,
                        }}
                        onClick={() => {
                          if (!id) {
                            return;
                          }

                          const accept = confirm(
                            "기존 로고에 적용된 에디터 작업이 초기화됩니다.\n로고를 변경하시겠습니까?",
                          );

                          if (!accept) {
                            return;
                          }

                          identityDataStore.updateDetailedData(
                            id,
                            {
                              indexLogo_selected:
                                engineDataStore.brandInfo.selected.logo,
                              indexLogo:
                                engineDataStore.brandInfo.engineIndex.logo[
                                  engineDataStore.brandInfo.resulted.logo
                                ],
                              logo: engineDataStore.brandInfo.logo,
                            },
                            "logo",
                          );

                          floatingToast(
                            wordList["로고가 저장되었어요."][
                              commonStore.appInfo.language
                            ],
                            "success",
                            commonStore.isDesktop,
                          );

                          canvasStore.canvas.initDB(id);

                          // window.location.reload();
                        }}
                      >
                        로고에 적용하기
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ) : (
                <>
                  <Paper
                    variant="outlined"
                    sx={{
                      height: 474,
                      overflowY: "auto",
                      p: 3,
                      width: 500,
                      mr: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        mb: 3,
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Chip
                            label={
                              commonStore.appInfo.language === "ko"
                                ? "특징"
                                : "Features"
                            }
                            size="small"
                          />
                        </Box>

                        <TextField
                          id="LogoGeneration_Features"
                          fullWidth
                          color="secondary"
                          size="small"
                          disabled={Boolean(
                            engineDataStore.brandInfo.disableSymbols,
                          )}
                          value={engineDataStore.brandInfo.symbols}
                          onChange={(e) => {
                            engineDataStore.setBrandInfo({
                              ...engineDataStore.brandInfo,

                              symbols: e.target.value,
                            });
                          }}
                          onBlur={() => {
                            engineDataStore.getPrompts();
                          }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: "100%",

                        mb: 3,
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Chip
                            label={
                              commonStore.appInfo.language === "ko"
                                ? "색깔"
                                : "Colors"
                            }
                            size="small"
                          />
                        </Box>

                        <Select
                          fullWidth
                          color="secondary"
                          size="small"
                          disabled={Boolean(
                            engineDataStore.brandInfo.disableLogoColor,
                          )}
                          value={
                            engineDataStore.brandInfo.logoColor
                              ? engineDataStore.brandInfo.logoColor
                              : "auto"
                          }
                          onChange={(e) => {
                            if (e.target.value === "auto") {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                logoColor: "",
                              });
                            } else {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                logoColor: e.target.value,
                              });
                            }

                            engineDataStore.getPrompts();
                          }}
                        >
                          <MenuItem key={-1} value={"auto"}>
                            {commonStore.appInfo.language === "ko"
                              ? "자동으로 설정"
                              : "Auto"}
                          </MenuItem>

                          {colorList.map((v, i) => {
                            return (
                              <MenuItem key={i} value={v.value}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      background: v.value,
                                      width: 20,
                                      height: 20,
                                    }}
                                  ></Box>{" "}
                                  &nbsp;{" "}
                                  {commonStore.appInfo.language === "ko"
                                    ? v.nameKor
                                    : v.name}
                                </Box>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Box>
                    </Box>

                    <ListItem
                      key={"느낌"}
                      disablePadding
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Chip
                            label={
                              commonStore.appInfo.language === "ko"
                                ? "느낌"
                                : "Feelings"
                            }
                            size="small"
                          />
                        </Box>

                        <Paper
                          variant="outlined"
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            height: 100,
                            overflowY: "auto",
                          }}
                        >
                          {emotions.map((v, i) => {
                            return (
                              <Button
                                disabled={Boolean(
                                  engineDataStore.brandInfo.disableEmotion,
                                )}
                                color={
                                  JSON.parse(
                                    engineDataStore.brandInfo.emotion,
                                  ).includes(v.value)
                                    ? "primary"
                                    : "inherit"
                                }
                                variant="contained"
                                size="small"
                                key={i}
                                children={
                                  commonStore.appInfo.language === "ko"
                                    ? v.nameKor
                                    : v.name
                                }
                                sx={{ m: 1 }}
                                onClick={() => {
                                  let emotion = JSON.parse(
                                    engineDataStore.brandInfo.emotion,
                                  );

                                  if (emotion.includes(v.value)) {
                                    emotion = emotion.filter(
                                      (w) => w !== v.value,
                                    );
                                  } else {
                                    if (emotion.length > 1) {
                                      floatingToast(
                                        "복수 선택은 최대 2개까지만 선택할 수 있어요.",
                                        "warning",
                                        commonStore.isDesktop,
                                      );

                                      return;
                                    }

                                    emotion.push(v.value);
                                  }

                                  engineDataStore.setBrandInfo({
                                    ...engineDataStore.brandInfo,

                                    emotion: JSON.stringify(emotion),
                                  });

                                  engineDataStore.getPrompts();
                                }}
                              />
                            );
                          })}
                        </Paper>
                      </Box>
                    </ListItem>

                    <ListItem
                      key={"재료"}
                      disablePadding
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Chip
                            label={
                              commonStore.appInfo.language === "ko"
                                ? "재료"
                                : "Materials"
                            }
                            size="small"
                          />
                        </Box>

                        <Paper
                          variant="outlined"
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            height: 100,
                            overflowY: "auto",
                          }}
                        >
                          {materials.map((v, i) => {
                            return (
                              <Button
                                disabled={Boolean(
                                  engineDataStore.brandInfo.disableMaterial,
                                )}
                                color={
                                  JSON.parse(
                                    engineDataStore.brandInfo.material,
                                  ).includes(v.value)
                                    ? "primary"
                                    : "inherit"
                                }
                                variant="contained"
                                size="small"
                                key={i}
                                children={
                                  commonStore.appInfo.language === "ko"
                                    ? v.nameKor
                                    : v.name
                                }
                                sx={{ m: 1 }}
                                onClick={() => {
                                  let material = JSON.parse(
                                    engineDataStore.brandInfo.material,
                                  );

                                  if (material.includes(v.value)) {
                                    material = material.filter(
                                      (w) => w !== v.value,
                                    );
                                  } else {
                                    if (material.length > 1) {
                                      floatingToast(
                                        "복수 선택은 최대 2개까지만 선택할 수 있어요.",
                                        "warning",
                                        commonStore.isDesktop,
                                      );

                                      return;
                                    }

                                    material.push(v.value);
                                  }

                                  engineDataStore.setBrandInfo({
                                    ...engineDataStore.brandInfo,

                                    material: JSON.stringify(material),
                                  });

                                  engineDataStore.getPrompts();
                                }}
                              />
                            );
                          })}
                        </Paper>
                      </Box>
                    </ListItem>

                    <ListItem
                      key={"스타일"}
                      disablePadding
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Chip
                            label={
                              commonStore.appInfo.language === "ko"
                                ? "스타일"
                                : "Styles"
                            }
                            size="small"
                          />
                        </Box>

                        <Paper
                          variant="outlined"
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            height: 100,
                            overflowY: "auto",
                          }}
                        >
                          {artists.map((v, i) => {
                            return (
                              <Button
                                disabled={Boolean(
                                  engineDataStore.brandInfo.disableStyle,
                                )}
                                color={
                                  JSON.parse(
                                    engineDataStore.brandInfo.style,
                                  ).includes(v.value)
                                    ? "primary"
                                    : "inherit"
                                }
                                variant="contained"
                                size="small"
                                key={i}
                                children={v.value}
                                sx={{ m: 1 }}
                                onClick={() => {
                                  let style = JSON.parse(
                                    engineDataStore.brandInfo.style,
                                  );

                                  if (style.includes(v.value)) {
                                    style = style.filter((w) => w !== v.value);
                                  } else {
                                    if (style.length > 1) {
                                      floatingToast(
                                        "복수 선택은 최대 2개까지만 선택할 수 있어요.",
                                        "warning",
                                        commonStore.isDesktop,
                                      );

                                      return;
                                    }

                                    style.push(v.value);
                                  }

                                  engineDataStore.setBrandInfo({
                                    ...engineDataStore.brandInfo,

                                    style: JSON.stringify(style),
                                  });

                                  engineDataStore.getPrompts();
                                }}
                              />
                            );
                          })}
                        </Paper>
                      </Box>
                    </ListItem>
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{
                      width: 400,
                      height: 474,
                      p: 3,
                    }}
                  >
                    <ListItem
                      key={"생성 키워드"}
                      disablePadding
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            my: 1,
                          }}
                        >
                          <Chip
                            label={
                              commonStore.appInfo.language === "ko"
                                ? "생성 키워드"
                                : "Generation Keywords"
                            }
                            size="small"
                            sx={{}}
                          />
                        </Box>

                        <TextField
                          id="LogoGeneration_PositivePrompt"
                          color="secondary"
                          size="small"
                          multiline
                          rows={5}
                          fullWidth
                          value={engineDataStore.prompts.positive}
                          onChange={(e) => {
                            engineDataStore.setPrompts({
                              ...engineDataStore.prompts,

                              positive: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </ListItem>

                    <ListItem
                      key={"필터 키워드"}
                      disablePadding
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Chip
                          label={
                            commonStore.appInfo.language === "ko"
                              ? "필터 키워드"
                              : "Not-Allowed Keywords"
                          }
                          size="small"
                          sx={{
                            mb: 1,
                          }}
                        />

                        <TextField
                          id="LogoGeneration_NegativePrompt"
                          color="secondary"
                          size="small"
                          multiline
                          rows={5}
                          fullWidth
                          value={engineDataStore.prompts.negative}
                          onChange={(e) => {
                            engineDataStore.setPrompts({
                              ...engineDataStore.prompts,

                              negative: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </ListItem>

                    <Button
                      color="info"
                      variant="contained"
                      disabled={engineDataStore.isEngineBusy}
                      disableElevation
                      fullWidth
                      sx={{
                        height: 48,
                      }}
                      onClick={() => {
                        engineDataStore.getIdentity(
                          identityDataStore.detailedData.serviceCore.engineId,
                          true,
                          "logo",
                          false,
                        );
                      }}
                    >
                      {!engineDataStore.isEngineBusy ? (
                        <>
                          <Refresh />
                          &nbsp;
                          {commonStore.appInfo.language === "ko"
                            ? "로고 재생성"
                            : "Regenerate"}
                        </>
                      ) : (
                        <>
                          <CircularProgress color="secondary" size="1rem" />
                          &nbsp; 생성 중...
                        </>
                      )}
                    </Button>
                  </Paper>
                </>
              )}
            </Box>
          </Paper>
        </>
      </Modal>
    </>
  ));
}

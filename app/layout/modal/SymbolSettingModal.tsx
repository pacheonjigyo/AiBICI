import * as React from "react";
import Image from "../../common/Image.js";

import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  IconButton,
  ListItem,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { colorList } from "../../data/colorList.js";
import { emotions } from "../../data/emotions.js";
import { materials } from "../../data/materials.js";
import { AppContext } from "../../stores/index.js";

export default function SymbolSettingModal(): JSX.Element {
  const { commonStore, engineStore, engineDataStore } =
    React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={engineStore.symbolSettingModal}
      onClose={() => {
        engineStore.setSymbolSettingModal(false);
      }}
    >
      <Paper
        sx={{
          borderRadius: "1rem",
          position: "fixed",

          top: "50%",
          left: "50%",

          transform: "translate(-50%, -50%)",

          p: 3,

          width: commonStore.isDesktop ? "auto" : "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>추가 설정</h3>

          <IconButton
            onClick={() => {
              engineStore.setSymbolSettingModal(false);
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Chip
          size="medium"
          label={
            <>
              <Box>
                {engineDataStore.brandInfo.logoShape === "image" ? (
                  <Typography fontSize={16}>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {JSON.parse(engineDataStore.brandInfo.emotion)
                        .map((v) => {
                          return emotions.find((w) => w.value === v)?.nameKor;
                        })
                        .join("/")}{" "}
                      {engineDataStore.brandInfo.symbols
                        .split(",")
                        .filter((v) => v)
                        .join(" 또는 ")}{" "}
                      {
                        materials.find(
                          (v) =>
                            v.value ===
                            JSON.parse(engineDataStore.brandInfo.material)[0],
                        )?.nameKor
                      }
                    </span>{" "}
                    <span
                      style={{
                        color: engineDataStore.brandInfo.logoColor,
                        fontWeight: "bold",
                      }}
                    >
                      {
                        colorList.find(
                          (v) =>
                            v.value === engineDataStore.brandInfo.logoColor,
                        )?.nameKor
                      }
                    </span>{" "}
                    로고를 표현할게요.
                  </Typography>
                ) : (
                  <Typography fontSize={16}>
                    알파벳{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {engineDataStore.brandInfo.symbols}
                    </span>
                    이(가) 이니셜로 새겨진{" "}
                    <span
                      style={{
                        color: engineDataStore.brandInfo.logoColor,
                        fontWeight: "bold",
                      }}
                    >
                      {
                        colorList.find(
                          (v) =>
                            v.value === engineDataStore.brandInfo.logoColor,
                        )?.nameKor
                      }
                    </span>{" "}
                    로고를 표현할게요.
                  </Typography>
                )}
              </Box>
            </>
          }
          sx={{
            p: 3,
            mb: 3,
            width: "100%",
          }}
        />

        <Paper
          variant="outlined"
          sx={{
            width: commonStore.isDesktop ? 600 : "100%",

            p: 3,
            mb: 3,
          }}
        >
          <ListItem key={"타입"} disablePadding>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  로고에 반드시 들어가야 하는 요소가 있나요?
                </Typography>

                <Box>
                  <Button
                    color={
                      engineDataStore.brandInfo.disableSymbols
                        ? "inherit"
                        : "primary"
                    }
                    variant="contained"
                    onClick={() => {
                      engineDataStore.setBrandInfo({
                        ...engineDataStore.brandInfo,

                        disableSymbols: 0,
                      });
                    }}
                  >
                    예
                  </Button>
                  &nbsp;
                  <Button
                    color={
                      engineDataStore.brandInfo.disableSymbols
                        ? "primary"
                        : "inherit"
                    }
                    variant="contained"
                    onClick={() => {
                      engineDataStore.setBrandInfo({
                        ...engineDataStore.brandInfo,

                        disableSymbols: 1,
                      });
                    }}
                  >
                    아니오
                  </Button>
                </Box>
              </Box>
            </Box>
          </ListItem>

          {engineDataStore.brandInfo.disableSymbols ? null : (
            <>
              <Divider sx={{ my: 3 }} />

              <ListItem key={"타입"} disablePadding>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        mb: 3,
                      }}
                    >
                      마음에 드는 로고 형태가 있다면 선택해주세요.
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          color={
                            engineDataStore.brandInfo.logoShape === "image"
                              ? "primary"
                              : "inherit"
                          }
                          startIcon={
                            <Image
                              src="https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/4a14e7b2de7f6eaf5a6c98cb8c00b8de.png"
                              height={48}
                              style={{
                                borderRadius: "50%",
                              }}
                            />
                          }
                          fullWidth
                          onClick={() => {
                            engineDataStore.setBrandInfo({
                              ...engineDataStore.brandInfo,

                              logoShape: "image",
                              symbols: "",
                            });
                          }}
                        >
                          이미지
                        </Button>
                        <Button
                          variant="contained"
                          color={
                            engineDataStore.brandInfo.logoShape === "initial"
                              ? "primary"
                              : "inherit"
                          }
                          startIcon={
                            <Image
                              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-initial-logo-design-template-f5fcf76aecd8a5b6395cbd37c87bcd6c_screen.jpg?ts=1602166737"
                              height={48}
                              style={{
                                borderRadius: "50%",
                              }}
                            />
                          }
                          fullWidth
                          onClick={() => {
                            engineDataStore.setBrandInfo({
                              ...engineDataStore.brandInfo,

                              logoShape: "initial",
                              symbols: "",
                            });
                          }}
                        >
                          이니셜
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Box>
                </Box>
              </ListItem>

              <Divider sx={{ my: 3 }} />

              <ListItem
                key={"특징"}
                disablePadding
                sx={{
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:
                      engineDataStore.brandInfo.logoShape === "image"
                        ? "column"
                        : "row",
                    alignItems:
                      engineDataStore.brandInfo.logoShape === "image"
                        ? "start"
                        : "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      mb:
                        engineDataStore.brandInfo.logoShape === "image" ? 3 : 0,
                    }}
                  >
                    {engineDataStore.brandInfo.logoShape === "image"
                      ? "로고에 반드시 들어가야하는 이미지를 적어주세요."
                      : "이니셜로 사용할 알파벳을 입력해주세요."}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {engineDataStore.brandInfo.logoShape === "image" ? (
                      <>
                        <TextField
                          id="SymbolSetting_Symbol1"
                          color="secondary"
                          size="small"
                          disabled={Boolean(
                            engineDataStore.brandInfo.disableSymbols,
                          )}
                          value={
                            engineDataStore.brandInfo.symbols.split(",")[0]
                          }
                          onChange={(e) => {
                            engineDataStore.setBrandInfo({
                              ...engineDataStore.brandInfo,

                              symbols: `${e.target.value},${
                                engineDataStore.brandInfo.symbols.split(",")[1]
                              }`,
                            });
                          }}
                        />
                        <Typography
                          sx={{
                            width: 50,
                          }}
                          align="center"
                        >
                          또는
                        </Typography>
                        <TextField
                          id="SymbolSetting_Symbol2"
                          color="secondary"
                          size="small"
                          disabled={Boolean(
                            engineDataStore.brandInfo.disableSymbols,
                          )}
                          value={
                            engineDataStore.brandInfo.symbols.split(",")[1]
                          }
                          onChange={(e) => {
                            engineDataStore.setBrandInfo({
                              ...engineDataStore.brandInfo,

                              symbols: `${
                                engineDataStore.brandInfo.symbols.split(",")[0]
                              },${e.target.value}`,
                            });
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <TextField
                          id="SymbolSetting_Symbol3"
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
                        />
                      </>
                    )}
                  </Box>
                </Box>
              </ListItem>

              <Divider sx={{ my: 3 }} />

              <ListItem key={"색상"} disablePadding>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>
                    로고에 적용할 색상이 있다면 선택해주세요.
                  </Typography>

                  <Select
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
                    }}
                    sx={{
                      width: 200,
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
              </ListItem>
            </>
          )}
        </Paper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="inherit"
            variant="contained"
            onClick={() => {
              engineStore.setSymbolSettingModal(false);
            }}
          >
            창 닫기
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              engineStore.setSymbolSettingModal(false);

              engineStore.setStep(engineStore.step + 1);
            }}
          >
            다음 단계로 이동
          </Button>
        </Box>
      </Paper>
    </Modal>
  ));
}

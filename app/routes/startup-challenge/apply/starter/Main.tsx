import * as React from "react";
import LogoSaveModal from "../../../../layout/modal/LogoSaveModal.js";
import ChatScreen from "./Screen.js";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { AutoAwesome, CheckCircle, Warning } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { getPaletteAsync } from "../../../../common/ColorThief.js";
import { readAsDataURLAsync } from "../../../../common/FileManager.js";
import { getRealUrl, uploadToS3 } from "../../../../common/FileUpload.js";
import { hexToRgb } from "../../../../common/Functions.js";
import { usePageEffect } from "../../../../core/page.js";
import { fontList } from "../../../../data/fontList.js";
import { industry } from "../../../../data/industry.js";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";
import { ColorRGBType, Industry, IndustryCategory } from "../../../../types.js";
import Toolbar from "../Toolbar.js";

export default function ApplyStarter(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, engineStore, engineChatStore, engineDataStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    engineDataStore.setBrandingType("chat");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPrevious = () => {
    if (engineStore.step === 1) {
      navigate("/ai-branding/create");

      return;
    }

    engineStore.setStep(engineStore.step - 1);
  };

  return useObserver(() => (
    <>
      <Box
        sx={{
          borderColor: "divider",
          width: commonStore.baseInfo.width,
          height: commonStore.baseInfo.height - 110,
        }}
      >
        <Grid container>
          <Grid item xs={commonStore.isDesktop ? 6 : 12}>
            <Box
              sx={{
                bgcolor: "background.paper",

                borderRight: 1,
                borderColor: "divider",
                width: "100%",
                height: commonStore.baseInfo.height - 110,
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  position: "relative",
                }}
                role="presentation"
              >
                <Box
                  sx={
                    {
                      // display: "flex",
                    }
                  }
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      // height: 552,
                      overflowY: "auto",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 5,
                      }}
                    >
                      <Typography
                        color="info"
                        fontWeight={"bold"}
                        sx={{
                          mr: 1,
                        }}
                      >
                        STEP <span style={{ fontSize: 24 }}>01.</span> 브랜드
                        기본정보
                      </Typography>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
                        <Box
                          sx={{
                            width: "100%",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.category &&
                              engineDataStore.brandInfo.industry.Industry &&
                              engineDataStore.brandInfo.industry[
                                "Industry Ko"
                              ] ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                업종
                              </Typography>
                            </Box>

                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                const brandCategory = industry.find(
                                  (v) =>
                                    v.Category ===
                                    engineDataStore.brandInfo.category,
                                );

                                const brandIndustry =
                                  brandCategory?.SubCategory.find(
                                    (v) =>
                                      v.Industry ===
                                      engineDataStore.brandInfo.industry
                                        .Industry,
                                  );

                                engineChatStore.setChatData({
                                  ...engineChatStore.chatData,

                                  prompt: `국내 업종 및 산업에 대한 아이디어를 하나만 추천해줘.`,
                                });
                              }}
                            >
                              GPT
                            </Button>
                          </Box>

                          <Autocomplete
                            size="small"
                            options={industry.map((v: IndustryCategory) =>
                              commonStore.appInfo.language === "ko"
                                ? v.CategoryKor
                                : v.Category,
                            )}
                            sx={{ width: "100%", mb: 1 }}
                            renderInput={(params) => (
                              <TextField
                                color="info"
                                {...params}
                                autoFocus
                                label={
                                  commonStore.appInfo.language === "ko"
                                    ? "카테고리를 선택해주세요."
                                    : "Select a category."
                                }
                              />
                            )}
                            onChange={(e, value: string | null) => {
                              const data = industry.find(
                                (v: IndustryCategory) =>
                                  commonStore.appInfo.language === "ko"
                                    ? v.CategoryKor === value
                                    : v.Category === value,
                              )?.Category;

                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                category: data ?? "",
                                industry: {
                                  Industry: "",
                                  "Industry Ko": "",
                                },
                              });
                            }}
                            onFocus={() => engineStore.setKeypadOpen(true)}
                            onBlur={() => engineStore.setKeypadOpen(false)}
                            value={
                              commonStore.appInfo.language === "ko"
                                ? industry.find(
                                    (v: IndustryCategory) =>
                                      v.Category ===
                                      engineDataStore.brandInfo.category,
                                  )?.CategoryKor ?? ""
                                : industry.find(
                                    (v: IndustryCategory) =>
                                      v.Category ===
                                      engineDataStore.brandInfo.category,
                                  )?.Category ?? ""
                            }
                          />

                          <Autocomplete
                            size="small"
                            disabled={!engineDataStore.brandInfo.category}
                            options={
                              industry.find(
                                (v: IndustryCategory) =>
                                  engineDataStore.brandInfo.category ===
                                  v.Category,
                              )?.SubCategory ?? []
                            }
                            getOptionLabel={(option: Industry) =>
                              `${
                                commonStore.appInfo.language === "ko"
                                  ? option["Industry Ko"]
                                  : option["Industry"]
                              }`
                            }
                            sx={{ width: "100%" }}
                            renderInput={(params) => (
                              <TextField
                                color="info"
                                {...params}
                                label={
                                  engineDataStore.brandInfo.category
                                    ? commonStore.appInfo.language === "ko"
                                      ? "세부업종을 선택해주세요."
                                      : "And now, select a detailed industry."
                                    : commonStore.appInfo.language === "ko"
                                    ? "카테고리를 먼저 선택해주세요."
                                    : "Please select a category first."
                                }
                              />
                            )}
                            renderOption={(props, option) => {
                              return (
                                <li
                                  {...props}
                                  key={
                                    commonStore.appInfo.language === "ko"
                                      ? option["Industry Ko"]
                                      : option["Industry"]
                                  }
                                >
                                  {`${
                                    commonStore.appInfo.language === "ko"
                                      ? option["Industry Ko"]
                                      : option["Industry"]
                                  }`}
                                </li>
                              );
                            }}
                            isOptionEqualToValue={(
                              option: Industry,
                              value: Industry,
                            ) => option["Industry"] === value["Industry"]}
                            onChange={(e, value: Industry | null) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                industry: value ?? {
                                  Industry: "",
                                  "Industry Ko": "",
                                },
                              });
                            }}
                            onFocus={() => engineStore.setKeypadOpen(true)}
                            onBlur={() => engineStore.setKeypadOpen(false)}
                            value={
                              engineDataStore.brandInfo.industry["Industry"]
                                ? engineDataStore.brandInfo.industry
                                : null
                            }
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.name &&
                              engineDataStore.brandInfo.identity ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                브랜드/기업명
                              </Typography>
                            </Box>

                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                const brandCategory = industry.find(
                                  (v) =>
                                    v.Category ===
                                    engineDataStore.brandInfo.category,
                                );

                                if (!brandCategory) {
                                  alert("카테고리를 선택해주세요.");

                                  return;
                                }

                                const brandIndustry =
                                  brandCategory?.SubCategory.find(
                                    (v) =>
                                      v.Industry ===
                                      engineDataStore.brandInfo.industry
                                        .Industry,
                                  );

                                if (!brandIndustry) {
                                  alert("업종을 선택해주세요.");

                                  return;
                                }

                                engineChatStore.setChatData({
                                  ...engineChatStore.chatData,

                                  prompt: `${brandCategory?.CategoryKor} - ${brandIndustry?.["Industry Ko"]}업에 어울리는 국내 브랜드명을 추천해줘.`,
                                });
                              }}
                            >
                              GPT
                            </Button>
                          </Box>

                          <Select
                            size="small"
                            color="info"
                            fullWidth
                            value={engineDataStore.brandInfo.identity}
                            onChange={(e: any) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                identity: e.target.value,
                              });
                            }}
                            sx={{
                              mb: 1,
                            }}
                          >
                            <MenuItem value="Brand">브랜드</MenuItem>
                            <MenuItem value="Corporate">기업</MenuItem>
                          </Select>

                          <TextField
                            color="info"
                            fullWidth
                            size="small"
                            label="브랜드/기업명을 입력해주세요."
                            value={engineDataStore.brandInfo.name}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                name: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{
                      mt: 3,
                      p: 3,
                      overflowY: "auto",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 5,
                      }}
                    >
                      <Typography
                        color="info"
                        fontWeight={"bold"}
                        sx={{
                          mr: 1,
                        }}
                      >
                        STEP <span style={{ fontSize: 24 }}>02.</span> 브랜드
                        아이덴티티 만들기
                      </Typography>

                      <Button
                        disabled={engineDataStore.isEngineBusy}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          engineDataStore.getIdentity(
                            null,
                            false,
                            "all",
                            false,
                          );
                        }}
                      >
                        {engineDataStore.isEngineBusy ? (
                          <>
                            <CircularProgress size="1rem" /> &nbsp; 생성 중...
                          </>
                        ) : (
                          <>
                            <AutoAwesome /> &nbsp; 브랜드 아이덴티티 자동생성
                          </>
                        )}
                      </Button>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.fontFamily ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                서체
                              </Typography>
                            </Box>

                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                if (!engineDataStore.brandInfo.name) {
                                  alert("브랜드명을 입력해주세요.");

                                  return;
                                }

                                engineChatStore.setChatData({
                                  ...engineChatStore.chatData,

                                  prompt: `"${engineDataStore.brandInfo.name}"에 어울리는 서체를 추천해줘.`,
                                });
                              }}
                            >
                              GPT
                            </Button>
                          </Box>

                          <Select
                            color="info"
                            size="small"
                            fullWidth
                            value={engineDataStore.brandInfo.fontFamily}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                fontFamily: e.target.value,
                              });
                            }}
                          >
                            {fontList.map((v: any, i: number) => {
                              return (
                                <MenuItem key={i} value={v.value}>
                                  <Typography
                                    sx={{
                                      fontFamily: v.value,
                                      fontSize: 24,

                                      height: 69,

                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {engineDataStore.brandInfo.name
                                      ? engineDataStore.brandInfo.name
                                      : commonStore.appInfo.language === "ko"
                                      ? v.nameKor
                                      : v.name}
                                  </Typography>
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Box>
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
                        <Box
                          sx={{
                            width: "100%",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.story ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                스토리
                              </Typography>
                            </Box>

                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                if (!engineDataStore.brandInfo.name) {
                                  alert("브랜드명을 입력해주세요.");

                                  return;
                                }

                                engineChatStore.setChatData({
                                  ...engineChatStore.chatData,

                                  prompt: `"${engineDataStore.brandInfo.name}"의 브랜드 스토리를 100자 내외로 만들어줘.`,
                                });
                              }}
                            >
                              GPT
                            </Button>
                          </Box>

                          <TextField
                            multiline
                            rows={3}
                            color="info"
                            fullWidth
                            size="small"
                            value={engineDataStore.brandInfo.story}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                story: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.slogan ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                슬로건
                              </Typography>
                            </Box>
                          </Box>

                          <TextField
                            color="info"
                            fullWidth
                            size="small"
                            label="직접입력"
                            value={engineDataStore.brandInfo.slogan}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                slogan: e.target.value,
                              });
                            }}
                            sx={{
                              mb: 1,
                            }}
                          />

                          <Select
                            size="small"
                            fullWidth
                            value={JSON.stringify({
                              slogan: engineDataStore.brandInfo.slogan,
                              selected: engineDataStore.brandInfo.selected,
                              resulted: engineDataStore.brandInfo.resulted,
                            })}
                            onChange={(e) => {
                              const value = JSON.parse(e.target.value);

                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,
                                ...value,
                              });
                            }}
                          >
                            {engineDataStore.brandIdentity.slogan.map((v, i) =>
                              v.result.predictions.map((w, j) => {
                                const value = {
                                  slogan: w,

                                  selected: {
                                    ...engineDataStore.brandInfo.selected,

                                    slogan: j,
                                  },

                                  resulted: {
                                    ...engineDataStore.brandInfo.resulted,

                                    slogan: i,
                                  },
                                };

                                return (
                                  <MenuItem
                                    key={j}
                                    value={JSON.stringify(value)}
                                  >
                                    {w}
                                  </MenuItem>
                                );
                              }),
                            )}
                          </Select>
                        </Box>
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.coreValue ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                핵심가치
                              </Typography>
                            </Box>
                          </Box>

                          <TextField
                            color="info"
                            fullWidth
                            size="small"
                            label="직접입력"
                            value={engineDataStore.brandInfo.coreValue}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                coreValue: e.target.value,
                              });
                            }}
                            sx={{
                              mb: 1,
                            }}
                          />

                          <Select
                            size="small"
                            fullWidth
                            value={JSON.stringify({
                              coreValue: engineDataStore.brandInfo.coreValue,
                              selected: engineDataStore.brandInfo.selected,
                              resulted: engineDataStore.brandInfo.resulted,
                            })}
                            onChange={(e) => {
                              const value = JSON.parse(e.target.value);

                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,
                                ...value,
                              });
                            }}
                          >
                            {engineDataStore.brandIdentity.coreValue.map(
                              (v, i) =>
                                v.result.predictions.map((w, j) => {
                                  const value = {
                                    coreValue: w,

                                    selected: {
                                      ...engineDataStore.brandInfo.selected,

                                      coreValue: j,
                                    },

                                    resulted: {
                                      ...engineDataStore.brandInfo.resulted,

                                      coreValue: i,
                                    },
                                  };

                                  return (
                                    <MenuItem
                                      key={j}
                                      value={JSON.stringify(value)}
                                    >
                                      {w}
                                    </MenuItem>
                                  );
                                }),
                            )}
                          </Select>
                        </Box>
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.logo ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                로고
                              </Typography>
                            </Box>

                            <Button
                              variant="contained"
                              color="info"
                              component="label"
                            >
                              업로드
                              <input
                                type="file"
                                hidden
                                onChange={async (e: any) => {
                                  const file = e.target.files[0];

                                  if (!file) {
                                    return;
                                  }

                                  const base64: any = await readAsDataURLAsync(
                                    file,
                                  );
                                  const url: any = await uploadToS3(
                                    base64.split(",")[1],
                                    `test/images_${new Date().getTime()}`,
                                    file.name.split(".")[1],
                                    file.type,
                                  );

                                  engineDataStore.setBrandInfo({
                                    ...engineDataStore.brandInfo,

                                    logo: url,
                                  });
                                }}
                              />
                            </Button>
                          </Box>

                          {engineDataStore.brandInfo.logo ? (
                            <img
                              src={engineDataStore.brandInfo.logo}
                              width="100%"
                              height={257}
                              style={{
                                objectFit: "contain",
                              }}
                            />
                          ) : null}
                        </Box>
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.color.main.hex &&
                              engineDataStore.brandInfo.color.main.rgb &&
                              engineDataStore.brandInfo.color.sub.hex &&
                              engineDataStore.brandInfo.color.sub.rgb ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                색상
                              </Typography>
                            </Box>

                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                if (!engineDataStore.brandInfo.name) {
                                  alert("브랜드명을 입력해주세요.");

                                  return;
                                }

                                engineChatStore.setChatData({
                                  ...engineChatStore.chatData,

                                  prompt: `"${engineDataStore.brandInfo.name}"에 어울리는 주색상과 보조색상을 RGB 코드로 알려줘.`,
                                });
                              }}
                            >
                              GPT
                            </Button>
                          </Box>

                          <Box>
                            <Paper
                              variant="outlined"
                              sx={{
                                p: 1,

                                mb: 1,
                              }}
                            >
                              <div id="swatch" className="large">
                                <input
                                  type="color"
                                  id="color"
                                  name="color"
                                  value={
                                    engineDataStore.brandInfo.color.main.hex
                                  }
                                  onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                  ) => {
                                    const rgb: ColorRGBType | null = hexToRgb(
                                      e.target.value,
                                    );

                                    if (!rgb) {
                                      return;
                                    }

                                    engineDataStore.setBrandInfo({
                                      ...engineDataStore.brandInfo,

                                      color: {
                                        ...engineDataStore.brandInfo.color,

                                        main: {
                                          hex: e.target.value,
                                          rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
                                        },
                                      },
                                    });
                                  }}
                                />
                                <div className="info">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Chip
                                      size="small"
                                      label={
                                        <>
                                          <Typography fontSize={12}>
                                            RGB:{" "}
                                            {
                                              engineDataStore.brandInfo.color
                                                .main.rgb
                                            }
                                          </Typography>
                                        </>
                                      }
                                    />
                                    &nbsp;
                                    <Chip
                                      size="small"
                                      label={
                                        <>
                                          <Typography fontSize={12}>
                                            HEX:{" "}
                                            {
                                              engineDataStore.brandInfo.color
                                                .main.hex
                                            }
                                          </Typography>
                                        </>
                                      }
                                    />
                                  </Box>
                                </div>
                              </div>
                            </Paper>

                            <Paper
                              variant="outlined"
                              sx={{
                                p: 1,
                              }}
                            >
                              <div id="swatch" className="large">
                                <input
                                  type="color"
                                  id="color"
                                  name="color"
                                  value={
                                    engineDataStore.brandInfo.color.sub.hex
                                  }
                                  onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                  ) => {
                                    const rgb: ColorRGBType | null = hexToRgb(
                                      e.target.value,
                                    );

                                    if (!rgb) {
                                      return;
                                    }

                                    engineDataStore.setBrandInfo({
                                      ...engineDataStore.brandInfo,

                                      color: {
                                        ...engineDataStore.brandInfo.color,

                                        sub: {
                                          hex: e.target.value,
                                          rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
                                        },
                                      },
                                    });
                                  }}
                                />
                                <div className="info">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Chip
                                      size="small"
                                      label={
                                        <>
                                          <Typography fontSize={12}>
                                            RGB:{" "}
                                            {
                                              engineDataStore.brandInfo.color
                                                .sub.rgb
                                            }
                                          </Typography>
                                        </>
                                      }
                                    />
                                    &nbsp;
                                    <Chip
                                      size="small"
                                      label={
                                        <>
                                          <Typography fontSize={12}>
                                            HEX:{" "}
                                            {
                                              engineDataStore.brandInfo.color
                                                .sub.hex
                                            }
                                          </Typography>
                                        </>
                                      }
                                    />
                                  </Box>
                                </div>
                              </div>
                            </Paper>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        {engineDataStore.brandIdentity.logo.length > 0 ? (
                          <>
                            <Typography
                              fontWeight="bold"
                              sx={{
                                mb: 1,
                              }}
                            >
                              AI가 추천하는 다른 로고들도 확인해보세요.
                            </Typography>

                            <Paper
                              variant="outlined"
                              sx={{
                                p: 1,
                              }}
                            >
                              <Grid container spacing={1} sx={{}}>
                                {engineDataStore.brandIdentity.logo.map(
                                  (v, i) =>
                                    v.result.predictions.map((w, j) => {
                                      return (
                                        <Grid
                                          key={j}
                                          item
                                          xs={1.5}
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Card
                                            sx={{
                                              border:
                                                engineDataStore.brandInfo
                                                  .resulted.logo === i &&
                                                engineDataStore.brandInfo
                                                  .selected.logo === j
                                                  ? "2px solid #8265ff"
                                                  : "2px solid whitesmoke",
                                              boxShadow:
                                                "0px 3px 7px 0px rgba(0,0,0,.1)",
                                            }}
                                            onClick={async () => {
                                              engineDataStore.setBrandInfo({
                                                ...engineDataStore.brandInfo,

                                                logo: w,

                                                selected: {
                                                  ...engineDataStore.brandInfo
                                                    .selected,

                                                  logo: j,
                                                },

                                                resulted: {
                                                  ...engineDataStore.brandInfo
                                                    .resulted,

                                                  logo: i,
                                                },
                                              });

                                              const realUrl = getRealUrl(
                                                engineDataStore.brandInfo.logo,
                                              );

                                              const color =
                                                await getPaletteAsync(realUrl);

                                              engineDataStore.setBrandInfo({
                                                ...engineDataStore.brandInfo,

                                                color,
                                              });
                                            }}
                                          >
                                            <CardActionArea>
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  position: "relative",
                                                }}
                                              >
                                                <CardMedia
                                                  component="img"
                                                  image={w}
                                                  alt={`로고결과이미지${j + 1}`}
                                                />

                                                {v.result.recommend ? (
                                                  <>
                                                    {Math.ceil(
                                                      v.result.recommend[j]
                                                        .order,
                                                    ) < 9 ? (
                                                      <Box
                                                        sx={{
                                                          position: "absolute",
                                                          bottom: 0,
                                                          left: "50%",

                                                          transform:
                                                            "translateX(-50%)",

                                                          // rotate:
                                                          //   "-30deg",

                                                          border: 1,
                                                          borderRadius: 1,

                                                          bgcolor: "yellow",

                                                          px: 1,

                                                          width: "100%",

                                                          textAlign: "center",
                                                        }}
                                                      >
                                                        <Typography
                                                          fontSize={13}
                                                          fontWeight="bold"
                                                          color="red"
                                                        >
                                                          AI 추천{" "}
                                                          {Math.ceil(
                                                            v.result.recommend[
                                                              j
                                                            ].order,
                                                          )}
                                                          위
                                                        </Typography>
                                                      </Box>
                                                    ) : null}
                                                  </>
                                                ) : null}
                                              </Box>
                                            </CardActionArea>
                                          </Card>
                                        </Grid>
                                      );
                                    }),
                                )}
                              </Grid>
                            </Paper>
                          </>
                        ) : null}
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
                        <Box
                          sx={{
                            width: "100%",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.mission ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                미션
                              </Typography>
                            </Box>

                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                if (!engineDataStore.brandInfo.name) {
                                  alert("브랜드명을 입력해주세요.");

                                  return;
                                }

                                engineChatStore.setChatData({
                                  ...engineChatStore.chatData,

                                  prompt: `"${engineDataStore.brandInfo.name}"의 미션을 두 단어로 요약해줘.`,
                                });
                              }}
                            >
                              GPT
                            </Button>
                          </Box>

                          <TextField
                            multiline
                            rows={3}
                            color="info"
                            fullWidth
                            size="small"
                            value={engineDataStore.brandInfo.mission}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                mission: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={commonStore.isDesktop ? 6 : 12}>
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

                              width: "100%",

                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {engineDataStore.brandInfo.vision ? (
                                <CheckCircle sx={{ color: "green" }} />
                              ) : (
                                <Warning sx={{ color: "orange" }} />
                              )}
                              <Typography
                                sx={{
                                  ml: 1,
                                }}
                              >
                                비전
                              </Typography>
                            </Box>

                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                if (!engineDataStore.brandInfo.name) {
                                  alert("브랜드명을 입력해주세요.");

                                  return;
                                }

                                engineChatStore.setChatData({
                                  ...engineChatStore.chatData,

                                  prompt: `"${engineDataStore.brandInfo.name}"의 비전을 두 단어로 요약해줘.`,
                                });
                              }}
                            >
                              GPT
                            </Button>
                          </Box>

                          <TextField
                            multiline
                            rows={3}
                            color="info"
                            fullWidth
                            size="small"
                            value={engineDataStore.brandInfo.vision}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                vision: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Box>
            </Box>

            <Toolbar />

            {/* <Box
              sx={{
                bgcolor: "background.paper",
                borderTop: 1,
                borderRight: 1,

                borderColor: "divider",

                width: "100%",
                height: 110,

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                p: 3,
              }}
            ></Box> */}
          </Grid>

          <Grid item xs={commonStore.isDesktop ? 6 : 12}>
            <ChatScreen />
          </Grid>
        </Grid>
      </Box>

      <LogoSaveModal />
    </>
  ));
}

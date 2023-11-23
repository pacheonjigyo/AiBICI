import * as React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Close, ExpandCircleDown } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import BaseModal from "../../common/BaseModal.js";
import { BigButton } from "../../common/BigButton.js";
import { readAsDataURLAsync } from "../../common/FileManager.js";
import { uploadToS3, uploadToS3Editor } from "../../common/FileUpload.js";
import { hexToRgb } from "../../common/Functions.js";
import { APIGateway } from "../../common/Gateway.js";
import Image from "../../common/Image.js";
import { Language } from "../../common/Language.js";
import { ToastUIEditor } from "../../common/ToastUIEditor.js";
import { usePageEffect } from "../../core/page.js";
import { fontList } from "../../data/fontList.js";
import { industry } from "../../data/industry.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";
import { ColorRGBType, Industry, IndustryCategory } from "../../types.js";

export default function ManualCreateModal(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, engineStore, engineDataStore, identityDataStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  return useObserver(() => (
    <>
      <Modal
        open={engineStore.manualCreateModal}
        onClose={() => {
          engineStore.setManualCreateModal(false);
        }}
      >
        <BaseModal
          width={1000}
          height={500}
          header={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={18} fontWeight={"bold"}>
                <Language label="새 브랜드 등록하기" />
              </Typography>

              <IconButton
                onClick={() => {
                  engineStore.setManualCreateModal(false);
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
                justifyContent: "right",
              }}
            >
              <BigButton
                color="primary"
                variant="contained"
                disabled={engineDataStore.isEngineBusy}
                disableElevation
                onClick={async () => {
                  const result = await uploadToS3Editor(
                    engineDataStore.brandInfo.serviceMarketing.descriptionHtml,
                    `user/service/${
                      identityDataStore.detailedInfo.id
                    }/${new Date().getTime()}`,
                  );

                  const brandJson = await APIGateway(
                    {
                      query: "apirest/service/register",
                      method: "POST",
                      data: {
                        data: {
                          service: {
                            retryOption: false,
                            userData: 0,

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

                            marketing: {
                              innerWebsite:
                                engineDataStore.brandInfo.serviceMarketing
                                  .innerWebsite,
                              websiteUrl:
                                engineDataStore.brandInfo.serviceMarketing
                                  .websiteUrl,
                              description: result.content,
                              descriptionHtml:
                                engineDataStore.brandInfo.serviceMarketing
                                  .descriptionHtml,
                            },

                            copyright: {
                              type: "",
                              applyNo: "",
                              registerNo: "",
                              startDate: "",
                              expireDate: "",
                            },
                          },
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

                  await commonStore.setLoading(true);
                  await identityDataStore.getServiceData(
                    10,
                    identityDataStore.page,
                  );

                  commonStore.setLoading(false);
                  engineStore.setManualCreateModal(false);

                  const accept = confirm(
                    "브랜드 정보가 저장되었어요.\n생성된 브랜드는 [마이페이지]에서 계속 관리할 수 있어요.\n\n[확인] 버튼을 클릭하시면 해당 브랜드의 프로필로 이동할게요.",
                  );

                  if (!accept) {
                    return;
                  }

                  navigate(`/identity/${brandJson.serviceInput.serviceId}`);
                }}
              >
                <Language label="생성" />
              </BigButton>
            </Box>
          }
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box sx={{}}>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="구분" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <Select
                            color="info"
                            fullWidth
                            value={engineDataStore.brandInfo.identity}
                            onChange={(e: any) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                identity: e.target.value,
                              });
                            }}
                          >
                            <MenuItem value="BI">
                              <Language label="브랜드" />
                            </MenuItem>
                            <MenuItem value="CI">
                              <Language label="기업" />
                            </MenuItem>
                          </Select>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded={true} variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="업종" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <Autocomplete
                            options={industry.map((v: IndustryCategory) =>
                              commonStore.appInfo.language === "ko"
                                ? v.CategoryKor
                                : v.Category,
                            )}
                            sx={{ width: "100%", mb: 3 }}
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
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="브랜드명" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <TextField
                            id="BrandDetail_Name"
                            fullWidth
                            value={engineDataStore.brandInfo.name}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                name: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
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
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography fontWeight="bold" fontSize={18}>
                              <Language label="디자인" />
                            </Typography>
                          </Box>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="로고" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 128,
                            }}
                          >
                            <Image
                              src={engineDataStore.brandInfo.logo}
                              width={"100%"}
                              style={{
                                background: "dimgray",
                                objectFit: "contain",
                                borderRadius: 8,
                              }}
                            />

                            <Button
                              color="primary"
                              component="label"
                              variant="contained"
                              href={`/identity/${identityDataStore.detailedInfo.id}/editor`}
                              sx={{
                                mt: 1,

                                minWidth: 128,
                              }}
                            >
                              <Language label="업로드" />

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
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            my: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="색상" /> 1
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                id="swatch"
                                className="small"
                                style={{
                                  marginBottom: 8,
                                }}
                              >
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
                              </div>

                              <Typography
                                sx={{
                                  ml: 3,
                                }}
                              >
                                {engineDataStore.brandInfo.color.main.hex}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            my: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="색상" /> 2
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div id="swatch" className="small">
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
                              </div>

                              <Typography
                                sx={{
                                  ml: 3,
                                }}
                              >
                                {engineDataStore.brandInfo.color.sub.hex}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mt: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Language label="서체" />
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                              bgcolor: "background.paper",
                            }}
                          >
                            <RadioGroup
                              value={engineDataStore.brandInfo.fontFamily}
                              onChange={(e) => {
                                engineDataStore.setBrandInfo({
                                  ...engineDataStore.brandInfo,

                                  fontFamily: e.target.value,
                                });
                              }}
                              row
                            >
                              <Grid container spacing={1}>
                                {fontList.map((v: any, i: number) => {
                                  return (
                                    <Grid key={i} item xs={4}>
                                      <Box>
                                        <FormControlLabel
                                          value={v.value}
                                          control={<Radio />}
                                          label={
                                            <Typography
                                              sx={{
                                                fontFamily: v.value,
                                              }}
                                            >
                                              {engineDataStore.brandInfo.name
                                                ? engineDataStore.brandInfo.name
                                                : v.name}
                                            </Typography>
                                          }
                                        />
                                      </Box>
                                    </Grid>
                                  );
                                })}
                              </Grid>
                            </RadioGroup>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="슬로건" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <TextField
                            id="BrandDetail_Slogan"
                            fullWidth
                            value={engineDataStore.brandInfo.slogan}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                slogan: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="핵심가치" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <TextField
                            id="BrandDetail_CoreValue"
                            fullWidth
                            value={engineDataStore.brandInfo.coreValue}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                coreValue: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="스토리" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <TextField
                            id="BrandDetail_Story"
                            placeholder={
                              wordList["스토리를 입력해주세요."][
                                commonStore.appInfo.language
                              ]
                            }
                            multiline
                            rows={5}
                            variant="outlined"
                            sx={{}}
                            fullWidth
                            value={engineDataStore.brandInfo.story}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                story: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="미션" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <TextField
                            id="BrandDetail_Mission"
                            placeholder={
                              wordList["미션을 입력해주세요."][
                                commonStore.appInfo.language
                              ]
                            }
                            multiline
                            rows={5}
                            variant="outlined"
                            sx={{}}
                            fullWidth
                            value={engineDataStore.brandInfo.mission}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                mission: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="비전" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <TextField
                            id="BrandDetail_Vision"
                            placeholder={
                              wordList["비전을 입력해주세요."][
                                commonStore.appInfo.language
                              ]
                            }
                            multiline
                            rows={5}
                            variant="outlined"
                            sx={{}}
                            fullWidth
                            value={engineDataStore.brandInfo.vision}
                            onChange={(e) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                vision: e.target.value,
                              });
                            }}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="마케팅" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="홈페이지" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",

                              width: 512,
                            }}
                          >
                            <TextField
                              id="BrandDetail_Website"
                              fullWidth
                              onChange={(e) => {
                                engineDataStore.setBrandInfo({
                                  ...engineDataStore.brandInfo,

                                  serviceMarketing: {
                                    ...engineDataStore.brandInfo
                                      .serviceMarketing,

                                    websiteUrl: e.target.value,
                                  },
                                });
                              }}
                            />

                            <Button
                              color="secondary"
                              variant="contained"
                              sx={{
                                ml: 1,

                                width: 100,
                              }}
                            >
                              <Language label="검증" />
                            </Button>
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mt: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="캠페인" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <Button
                              disabled
                              // sx={{ width: 128 }}
                              variant="contained"
                            >
                              Comming Soon
                            </Button>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="상세설명" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <ToastUIEditor
                            onBlur={async (e: string) => {
                              engineDataStore.setBrandInfo({
                                ...engineDataStore.brandInfo,

                                serviceMarketing: {
                                  ...engineDataStore.brandInfo.serviceMarketing,

                                  descriptionHtml: e,
                                },
                              });
                            }}
                            initialValue={""}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={commonStore.isDesktop ? 12 : 12}>
                    <Accordion expanded variant="outlined">
                      <AccordionSummary
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",

                          px: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            width: "100%",
                          }}
                        >
                          <Typography fontWeight="bold" fontSize={18}>
                            <Language label="상표권 등록" />
                          </Typography>

                          <ExpandCircleDown />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={{
                          p: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="권리구분" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <Select fullWidth value="unregistered">
                              <MenuItem value="inbound">
                                <Language label="국내" />
                              </MenuItem>
                              <MenuItem value="outbound">
                                <Language label="해외" />
                              </MenuItem>
                              <MenuItem value="etc">
                                <Language label="로고/심볼/캐릭터" />
                              </MenuItem>
                            </Select>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="출원번호" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <TextField id="BrandDetail_ETC1" fullWidth />
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="등록번호" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <TextField id="BrandDetail_ETC2" fullWidth />
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 256,
                            }}
                          >
                            <Typography fontSize={14}>
                              <Language label="존속기간" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <TextField id="BrandDetail_ETC3" fullWidth />
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </BaseModal>
      </Modal>
    </>
  ));
}

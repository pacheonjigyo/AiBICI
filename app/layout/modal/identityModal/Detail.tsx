import * as React from "react";
import Image from "../../../common/Image.js";
import Preview from "../../../routes/ai-branding/create/Preview.js";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { Delete, Download, Edit, ExpandCircleDown } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { downloadImage, hexToRgb } from "../../../common/Functions.js";
import { Language } from "../../../common/Language.js";
import { Link as NavLink } from "../../../common/Link.js";
import { ToastUIEditor } from "../../../common/ToastUIEditor.js";
import { fontList } from "../../../data/fontList.js";
import { wordList } from "../../../data/words.js";
import { AppContext } from "../../../stores/index.js";
import { ColorRGBType } from "../../../types.js";

export default function IdentityDetail(): JSX.Element {
  const { id } = useParams();
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box sx={{}}>
          {identityDataStore.detailedData && (
            <>
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
                        {identityDataStore.detailedData.category} {">"}{" "}
                        {identityDataStore.detailedData.industry}
                        <Chip
                          size="small"
                          label={<Language label="변경 불가" />}
                          color="error"
                          sx={{
                            ml: 1,
                          }}
                        />
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
                            value={identityDataStore.detailedData.name}
                            onChange={(e) => {
                              identityDataStore.setDetailedData({
                                ...identityDataStore.detailedData,

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
                            alignItems: "start",
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
                              width: 264,
                            }}
                          >
                            <Image
                              src={
                                identityDataStore.detailedData.serviceCore?.logo
                              }
                              width={"100%"}
                              style={{
                                background: "dimgray",
                                objectFit: "contain",
                                borderRadius: 8,
                              }}
                            />

                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                              }}
                            >
                              <Button
                                color="secondary"
                                href={`/identity/${identityDataStore.detailedInfo.id}/editor`}
                                component={NavLink}
                                sx={{
                                  minWidth: 128,
                                }}
                                onClick={() => {
                                  //
                                }}
                                endIcon={<Edit />}
                              >
                                <Language label="수정" />
                              </Button>

                              <Button
                                color="error"
                                href={`/identity/${identityDataStore.detailedInfo.id}/editor`}
                                component={NavLink}
                                sx={{
                                  ml: 1,
                                  minWidth: 128,
                                }}
                                onClick={() => {
                                  //
                                }}
                                endIcon={<Delete />}
                              >
                                <Language label="삭제" />
                              </Button>
                            </Box>

                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                              }}
                            >
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  fontSize: 14,
                                  minWidth: 128,
                                  height: 40,
                                }}
                                onClick={() => {
                                  downloadImage(
                                    identityDataStore.detailedData?.serviceCore
                                      .logo,
                                    identityDataStore.detailedData.name,
                                    false,
                                  );
                                }}
                                endIcon={<Download />}
                              >
                                <Language label="다운로드" />
                              </Button>

                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  ml: 1,
                                  fontSize: 14,
                                  minWidth: 128,
                                  height: 40,
                                }}
                                endIcon={<Download />}
                                onClick={() => {
                                  downloadImage(
                                    identityDataStore.detailedData?.serviceCore
                                      .logo,
                                    identityDataStore.detailedData.name,
                                    true,
                                  );
                                }}
                              >
                                <Language label="벡터화" />
                              </Button>
                            </Box>
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
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
                                    identityDataStore.detailedData
                                      .serviceBasicBrand?.colorMHex
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

                                    identityDataStore.setDetailedData({
                                      ...identityDataStore.detailedData,

                                      serviceBasicBrand: {
                                        ...identityDataStore.detailedData
                                          .serviceBasicBrand,

                                        colorMHex: e.target.value,
                                        colorMRgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
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
                                {
                                  identityDataStore.detailedData
                                    .serviceBasicBrand.colorMHex
                                }
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
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
                                    identityDataStore.detailedData
                                      .serviceBasicBrand?.colorSHex
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

                                    identityDataStore.setDetailedData({
                                      ...identityDataStore.detailedData,

                                      serviceBasicBrand: {
                                        ...identityDataStore.detailedData
                                          .serviceBasicBrand,

                                        colorSHex: e.target.value,
                                        colorSRgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
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
                                {
                                  identityDataStore.detailedData
                                    .serviceBasicBrand.colorSHex
                                }
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
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
                              <Language label="서체" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                              bgcolor: "background.paper",
                            }}
                          >
                            <RadioGroup
                              value={
                                identityDataStore.detailedData.serviceBasicBrand
                                  .fontFamily
                              }
                              onChange={(e) => {
                                identityDataStore.setDetailedData({
                                  ...identityDataStore.detailedData,

                                  serviceBasicBrand: {
                                    ...identityDataStore.detailedData,

                                    fontFamily: e.target.value,
                                  },
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
                                              {identityDataStore.detailedData
                                                .name
                                                ? identityDataStore.detailedData
                                                    .name
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
                            value={
                              identityDataStore.detailedData.serviceCore.slogan
                            }
                            onChange={(e) => {
                              identityDataStore.setDetailedData({
                                ...identityDataStore.detailedData,

                                serviceCore: {
                                  ...identityDataStore.detailedData.serviceCore,

                                  slogan: e.target.value,
                                },
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
                            value={
                              identityDataStore.detailedData.serviceCore
                                .coreValue
                            }
                            onChange={(e) => {
                              identityDataStore.setDetailedData({
                                ...identityDataStore.detailedData,

                                serviceCore: {
                                  ...identityDataStore.detailedData.serviceCore,

                                  coreValue: e.target.value,
                                },
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
                            value={
                              identityDataStore.detailedData.serviceCommon
                                ?.story
                            }
                            onChange={(e) => {
                              identityDataStore.setDetailedData({
                                ...identityDataStore.detailedData,

                                serviceCommon: {
                                  ...identityDataStore.detailedData
                                    .serviceCommon,

                                  story: e.target.value,
                                },
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
                            value={
                              identityDataStore.detailedData.serviceCommon
                                ?.mission
                            }
                            onChange={(e) => {
                              identityDataStore.setDetailedData({
                                ...identityDataStore.detailedData,

                                serviceCommon: {
                                  ...identityDataStore.detailedData
                                    .serviceCommon,

                                  mission: e.target.value,
                                },
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
                            value={
                              identityDataStore.detailedData.serviceCommon
                                ?.vision
                            }
                            onChange={(e) => {
                              identityDataStore.setDetailedData({
                                ...identityDataStore.detailedData,

                                serviceCommon: {
                                  ...identityDataStore.detailedData
                                    .serviceCommon,

                                  vision: e.target.value,
                                },
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
                              width: 512,
                            }}
                          >
                            <TextField id="BrandDetail_Website" fullWidth />
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
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
                              <Language label="노출" />
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 512,
                            }}
                          >
                            <Switch
                              color="secondary"
                              sx={{ mb: 0.5 }}
                              checked={
                                identityDataStore.detailedData.engine?.share ===
                                "y"
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                if (!id) {
                                  return;
                                }

                                identityDataStore.setDetailedData({
                                  ...identityDataStore.detailedData,

                                  engine: {
                                    share: e.target.checked ? "y" : "n",
                                  },
                                });

                                identityDataStore.updateDetailedData(
                                  id,
                                  {
                                    share: e.target.checked ? "y" : "n",
                                  },
                                  "aiengine",
                                );
                              }}
                            />
                          </Box>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
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
                            <Button disabled variant="contained">
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
                              identityDataStore.setDetailedData({
                                ...identityDataStore.detailedData,

                                serviceMarketing: {
                                  ...identityDataStore.detailedData
                                    .serviceMarketing,

                                  descriptionHTML: e,
                                },
                              });
                            }}
                            initialValue={
                              identityDataStore.detailedData.serviceMarketing
                                .descriptionHTML
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
                            <Select fullWidth value="etc">
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

              <Preview
                logo={identityDataStore.detailedData?.serviceCore.logo}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  ));
}

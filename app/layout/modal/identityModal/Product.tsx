import * as React from "react";
import Image from "../../../common/Image.js";
import Preview from "../../../routes/ai-branding/create/Preview.js";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { ExpandCircleDown } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { ToastUIEditor } from "../../../common/ToastUIEditor.js";
import { Token } from "../../../common/Token.js";
import { AppContext } from "../../../stores/index.js";

export default function IdentityProduct(): JSX.Element {
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box>
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
                          <Chip
                            size="small"
                            label={<Language label="필수" />}
                            color="primary"
                            sx={{ mr: 1 }}
                          />

                          <Language label="상품명" />
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
                          id="Product_Name"
                          fullWidth
                          onChange={(e) => {
                            identityDataStore.setDetailedData({
                              ...identityDataStore.detailedData,

                              serviceProduct: {
                                ...identityDataStore.detailedData
                                  .serviceProduct,

                                name: e.target.value,
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
                          <Chip
                            size="small"
                            label={<Language label="필수" />}
                            color="primary"
                            sx={{ mr: 1 }}
                          />

                          <Language label="판매가격" />
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

                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="Product_Price"
                          type="number"
                          sx={{
                            width: 256,
                          }}
                          onChange={(e) => {
                            identityDataStore.setDetailedData({
                              ...identityDataStore.detailedData,

                              serviceProduct: {
                                ...identityDataStore.detailedData
                                  .serviceProduct,

                                price: e.target.value,
                              },
                            });
                          }}
                        />

                        <Token
                          sx={{
                            ml: 1,
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
                            <Chip
                              size="small"
                              label={<Language label="필수" />}
                              color="primary"
                              sx={{ mr: 1 }}
                            />

                            <Language label="대표이미지" />
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
                          alignItems: "start",
                          mb: 3,
                        }}
                      >
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
                          <Chip
                            size="small"
                            label={<Language label="필수" />}
                            color="primary"
                            sx={{ mr: 1 }}
                          />

                          <Language label="상세설명" />
                        </Typography>
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
                          onBlur={(e: string) => {
                            //
                            identityDataStore.setDetailedData({
                              ...identityDataStore.detailedData,

                              serviceProduct: {
                                ...identityDataStore.detailedData
                                  .serviceProduct,

                                descriptionHTML: e,
                              },
                            });
                          }}
                          initialValue={
                            identityDataStore.detailedData.serviceProduct
                              .descriptionHTML
                          }
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Box>

            <Preview logo={identityDataStore.detailedData?.serviceCore.logo} />
          </>
        )}
      </Box>
    </>
  ));
}

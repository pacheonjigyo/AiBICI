import * as React from "react";
import Image from "../../../common/Image.js";

import {
  Box,
  Chip,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { BigButton } from "../../../common/BigButton.js";
import { AppContext } from "../../../stores/index.js";

export default function Automatic(): JSX.Element {
  const { commonStore, logoStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "background.default",

          width: commonStore.baseInfo.width - 700,
          height: commonStore.baseInfo.height - 60,

          position: "relative",

          px: 2,
        }}
      >
        {logoStore.isEngineBusy ? (
          <Box
            sx={{
              // bgcolor: "rgba(0, 0, 0, 0.7)",

              width: "100%",
              height: commonStore.baseInfo.height - 60,

              position: "absolute",

              zIndex: 10,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="/resources/loading.gif" height={500} />
          </Box>
        ) : null}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            width: "100%",
            height: 134,

            p: 3,
          }}
        >
          <Typography fontSize={24}>Comming Soon</Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: commonStore.baseInfo.height - 328,
            overflowY: "auto",
          }}
        >
          <Grid container spacing={2} padding={2}>
            {logoStore.testResult.map((v) => {
              return (
                <>
                  {v.result.predictions.map((w, j) => {
                    return (
                      <>
                        <Grid item key={j} xs={4}>
                          <div
                            style={{
                              textAlign: "right",
                              margin: 10,
                            }}
                          >
                            {w ? (
                              <Box
                                sx={{
                                  position: "relative",
                                }}
                              >
                                <Image
                                  src={w}
                                  width={"100%"}
                                  // height={84}
                                  alt="로고생성결과이미지"
                                  style={{
                                    background: "lightgray",
                                    borderRadius: "1rem",
                                  }}
                                />

                                <Box
                                  sx={{
                                    position: "absolute",

                                    left: 10,
                                    bottom: 10,
                                  }}
                                >
                                  <Chip
                                    color="secondary"
                                    label={`${v.result.ms}s`}
                                  />
                                </Box>
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  bgcolor: "background.paper",
                                  borderRadius: "1rem",

                                  p: 3,
                                  width: "100%",
                                  minHeight: 350,

                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography color="text.secondary">
                                  NO IMAGE
                                </Typography>
                              </Box>
                            )}
                          </div>
                        </Grid>
                      </>
                    );
                  })}
                </>
              );
            })}
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "100%",
            height: 134,

            p: 3,
          }}
        >
          <BigButton color="primary" variant="contained">
            이전
          </BigButton>
          <BigButton color="secondary" variant="contained">
            다음
          </BigButton>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "background.default",
          width: 350,
          height: commonStore.baseInfo.height - 60,

          p: 3,
        }}
      >
        <Box
          sx={{
            height: commonStore.baseInfo.height - 108,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 3,
            }}
          >
            <Typography fontSize={14}>구분</Typography>

            <Select
              size="small"
              sx={{
                width: 120,
              }}
              defaultValue={"BI"}
              // value={testStore.inputData.num_images}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value < 1 || value > 10) {
                  alert("The value cannot be x < 1 or x > 10.");

                  return;
                }

                logoStore.setInputData({
                  ...logoStore.inputData,

                  num_images: e.target.value,
                });
              }}
            >
              <MenuItem value="BI">브랜드</MenuItem>
              <MenuItem value="CI">기업</MenuItem>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography fontSize={14}>명칭</Typography>

            <TextField
              size="small"
              id="test-input-02"
              // type="number"
              // value={testStore.inputData.num_inference_steps}
              sx={{
                width: 120,
              }}
              onChange={(e) => {
                // const value = Number(e.target.value);
                // if (value < 1 || value > 50) {
                //   alert("The value cannot be x < 1 or x > 50.");
                //   return;
                // }
                // testStore.setInputData({
                //   ...testStore.inputData,
                //   num_inference_steps: e.target.value,
                // });
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  ));
}

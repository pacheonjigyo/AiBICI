import * as React from "react";
import Image from "../../../common/Image.js";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { AppContext } from "../../../stores/index.js";

export default function Customize(): JSX.Element {
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
        <Box
          sx={{
            width: "100%",
            height: commonStore.baseInfo.height - 194,
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
                        <Grid item key={j} xs={6}>
                          <div
                            style={{
                              textAlign: "right",
                              margin: 10,
                            }}
                          >
                            {logoStore.isEngineBusy ? (
                              <Box
                                sx={{
                                  bgcolor: "background.paper",
                                  borderRadius: "1rem",

                                  p: 3,
                                  width: "100%",
                                  minHeight: 512,

                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  src="/resources/loading.gif"
                                  height={300}
                                />
                              </Box>
                            ) : w ? (
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
                                  minHeight: 512,

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

            width: "100%",

            p: 3,
          }}
        >
          <TextField
            size="small"
            rows={3}
            multiline
            id="test-input-13"
            placeholder="어떤 로고를 만들어볼까요?"
            fullWidth
            value={logoStore.inputData.positive_prompt}
            onChange={(e) => {
              logoStore.setInputData({
                ...logoStore.inputData,

                positive_prompt: e.target.value,
              });
            }}
          />

          <Button
            disabled={logoStore.isEngineBusy}
            color="secondary"
            variant="contained"
            // fullWidth
            sx={{
              ml: 1,
              width: 130,
              height: 86,
              fontSize: 18,
            }}
            onClick={() => {
              logoStore.getIdentity(commonStore.isDesktop);
            }}
          >
            {logoStore.isEngineBusy ? (
              <CircularProgress size="1.5rem" />
            ) : (
              "생성하기"
            )}
          </Button>
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
            <Typography fontSize={14}>출력 이미지 수</Typography>

            <Select
              size="small"
              sx={{
                width: 120,
              }}
              value={logoStore.inputData.num_images}
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
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 1,
            }}
          >
            <Typography fontSize={14}>출력 포맷</Typography>

            <Select
              size="small"
              fullWidth
              sx={{
                width: 120,
              }}
              value={logoStore.inputData.compression_format}
              onChange={(e) => {
                logoStore.setInputData({
                  ...logoStore.inputData,

                  compression_format: e.target.value,
                });
              }}
            >
              <MenuItem value="JPEG">JPG</MenuItem>
              <MenuItem value="PNG">PNG</MenuItem>
            </Select>
          </Box>

          <Divider sx={{ my: 3, fontSize: 14 }}>고급 설정</Divider>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography fontSize={14}>노이즈 제거 수</Typography>

            <TextField
              size="small"
              id="test-input-02"
              type="number"
              value={logoStore.inputData.num_inference_steps}
              sx={{
                width: 120,
              }}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value < 1 || value > 50) {
                  alert("The value cannot be x < 1 or x > 50.");

                  return;
                }

                logoStore.setInputData({
                  ...logoStore.inputData,

                  num_inference_steps: e.target.value,
                });
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 3,
            }}
          >
            <Typography fontSize={14}>픽셀 해상도</Typography>

            <Select
              size="small"
              sx={{
                width: 120,
              }}
              value={logoStore.inputData.pixel_resolution}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value < 1 || value > 2048) {
                  alert("The value cannot be x < 1 or x > 2048.");

                  return;
                }

                logoStore.setInputData({
                  ...logoStore.inputData,

                  pixel_resolution: e.target.value,
                });
              }}
            >
              <MenuItem value="512">512x512</MenuItem>
              <MenuItem value="768">768x768</MenuItem>
            </Select>
          </Box>

          <Box
            sx={{
              alignItems: "center",
              width: "100%",
              mb: 3,
            }}
          >
            <Typography
              fontSize={14}
              sx={{
                width: "100%",
                mb: 1,
              }}
            >
              필터
            </Typography>

            <TextField
              id="test-input-13"
              placeholder="Negative prompt"
              multiline
              rows={3}
              fullWidth
              sx={{
                mb: 1,
              }}
              value={logoStore.inputData.negative_prompt}
              onChange={(e) => {
                logoStore.setInputData({
                  ...logoStore.inputData,

                  negative_prompt: e.target.value,
                });
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  ));
}

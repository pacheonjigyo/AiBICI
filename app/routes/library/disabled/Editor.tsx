import * as React from "react";
import Image from "../../../common/Image.js";
import LogoGenerationModal from "../../../layout/modal/LogoGenerationModal.js";
import EditorCore from "./EditorCore.js";

import {
  Add,
  AddCircle,
  AutoAwesome,
  AutoAwesomeOutlined,
  BorderAll,
  ChangeHistory,
  CircleOutlined,
  DeleteOutline,
  FormatAlignCenter,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  InterestsOutlined,
  LayersOutlined,
  LockOpenOutlined,
  LockOutlined,
  RectangleOutlined,
  RedoOutlined,
  RemoveCircle,
  ShapeLine,
  UndoOutlined,
} from "@mui/icons-material";

import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Slider,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { CanvasEditor } from "../../../common/CanvasEditor.js";
import { EngineGateway } from "../../../common/Gateway.js";
import { usePageEffect } from "../../../core/page.js";
import { fontList } from "../../../data/fontList.js";
import { wordList } from "../../../data/words.js";
import { EditorAlignPopOver } from "../../../layout/popover/EditorAlignPopOver.js";
import { EditorPlacePopOver } from "../../../layout/popover/EditorPlacePopOver.js";
import { AppContext } from "../../../stores/index.js";

export default function Editor(props: any): JSX.Element {
  const theme = useTheme();

  const placeRef = React.useRef(null);
  const alignRef = React.useRef(null);

  const {
    commonStore,
    identityDataStore,
    engineDataStore,
    engineStore,
    canvasStore,
    libraryDataStore,
  } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["소개"][commonStore.appInfo.language],
  });

  let test = 0;

  React.useEffect(() => {
    test++;

    if (test === 2) {
      return;
    }

    const editor = new CanvasEditor(
      canvasStore,
      engineStore,
      identityDataStore,
    );

    editor.init(props.logo, props.name, props.slogan, props.fontFamily, 0);

    canvasStore.setCanvas(editor);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          height: commonStore.baseInfo.height - 110,
        }}
      >
        <Box
          sx={{
            // bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
            height: 60,

            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: commonStore.baseInfo.width - 80,
            }}
          >
            <Grid container padding={2}>
              <Grid
                item
                xs={10}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                <Typography
                  fontSize={12}
                  sx={{
                    p: 1,
                  }}
                >
                  확대/축소
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <IconButton
                    color="info"
                    size="small"
                    onClick={async () => {
                      canvasStore.canvas.zoomOut();
                      canvasStore.updateZoom();
                    }}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <Typography
                    sx={{
                      width: 40,
                      fontSize: 12,
                    }}
                    align="center"
                  >
                    {canvasStore.canvasPreview} %
                  </Typography>
                  <IconButton
                    color="info"
                    size="small"
                    onClick={async () => {
                      canvasStore.canvas.zoomIn();
                      canvasStore.updateZoom();
                    }}
                  >
                    <AddCircle />
                  </IconButton>
                </Box>

                <Divider orientation="vertical" />

                <Typography
                  fontSize={12}
                  sx={{
                    p: 1,
                  }}
                >
                  캔버스 크기
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <Select
                    disabled
                    size="small"
                    fullWidth
                    value={0}
                    sx={{
                      fontSize: 12,
                    }}
                  >
                    <MenuItem value={0}>512x512 (기본)</MenuItem>
                  </Select>
                </Box>

                <Divider orientation="vertical" />

                <Typography
                  fontSize={12}
                  sx={{
                    p: 1,
                  }}
                >
                  작업
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <IconButton
                    disabled={canvasStore.canvasState.undo.length < 1}
                    size="small"
                    onClick={() => {
                      canvasStore.canvas.playCanvas("undo");
                    }}
                  >
                    <UndoOutlined />
                  </IconButton>

                  <IconButton
                    disabled={canvasStore.canvasState?.redo.length < 1}
                    size="small"
                    onClick={() => {
                      canvasStore.canvas.playCanvas("redo");
                    }}
                  >
                    <RedoOutlined />
                  </IconButton>
                </Box>

                <Divider orientation="vertical" />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                {canvasStore.layerCurrentId < 0 ? null : (
                  <>
                    <Divider orientation="vertical" />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Chip
                        label={`${
                          canvasStore.layers[canvasStore.layerCurrentId]?.width
                        }x${
                          canvasStore.layers[canvasStore.layerCurrentId]?.height
                        }`}
                      />
                    </Box>

                    <Divider orientation="vertical" />
                  </>
                )}

                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      mr: 1,
                      fontSize: 14,
                      width: 100,
                      height: 40,
                    }}
                    size="small"
                    onClick={async () => {
                      // const data = canvasStore.canvas.getCanvasDataURL();
                      // const logoGraphic =
                      //   await canvasStore.canvas.uploadCanvasGraphic(id);
                      // const logo = await uploadToS3(
                      //   data,
                      //   `brand/${id}/logo`,
                      //   "png",
                      //   "image/png",
                      // );
                      // dataStore.setDetailedData({
                      //   ...identityDataStore.detailedData,
                      //   serviceCore: {
                      //     ...identityDataStore.detailedData.serviceCore,
                      //     logo,
                      //   },
                      // });
                      // identityDataStore.updateDetailedData(
                      //   id,
                      //   {
                      //     logo,
                      //     logoGraphic,
                      //   },
                      //   "logo",
                      // );
                      // floatingToast(
                      //   wordList["로고가 저장되었어요."][
                      //     commonStore.appInfo.language
                      //   ],
                      //   "success",
                      //   commonStore.isDesktop,
                      // );
                    }}
                  >
                    저장
                  </Button>

                  <Button
                    disabled
                    color="info"
                    variant="contained"
                    sx={{
                      fontSize: 14,
                      width: 100,
                      height: 40,
                    }}
                    size="small"
                  >
                    공유
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            position: "relative",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              className="hideScroll"
              sx={{
                // bgcolor: "background.paper",
                // borderRight: 1,
                // borderColor: "divider",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // boxShadow: `0px 3px 7px 0px ${
                //   theme.palette.mode === "light"
                //     ? "rgba(0,0,0,.1)"
                //     : "rgba(255,255,255,.1)"
                // }`,

                overflowY: "auto",
                width: 60,
                height: commonStore.baseInfo.height - 60,
              }}
            >
              <Box
                sx={{
                  pt: 1,
                }}
              >
                <Tooltip title="개체 설정" arrow placement="right">
                  <Button
                    color={canvasStore.logoMenu === 0 ? "secondary" : "inherit"}
                    variant={canvasStore.logoMenu === 0 ? "text" : "text"}
                    sx={{
                      minWidth: 44,
                      height: 44,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(0);
                    }}
                  >
                    <InterestsOutlined />
                  </Button>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  pt: 1,
                }}
              >
                <Tooltip title="AI 이미지" arrow placement="right">
                  <Button
                    color={canvasStore.logoMenu === 1 ? "secondary" : "inherit"}
                    variant={canvasStore.logoMenu === 1 ? "text" : "text"}
                    sx={{
                      minWidth: 44,
                      height: 44,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(1);
                    }}
                  >
                    <AutoAwesome />
                    {/* <Typography fontSize={12} fontWeight="bold">
                      AI
                    </Typography> */}
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                borderRight: 1,
                borderColor: "divider",
                // bgcolor: "background.paper",
                p: 1,
                width: 260,
                height: commonStore.baseInfo.height - 60,
                overflowY: "scroll",
              }}
            >
              {canvasStore.group ||
              canvasStore.layerCurrentId > -1 ||
              (canvasStore.layerCurrentId === -1 &&
                canvasStore.logoMenu === 0) ? (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mb: 1,
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        bgcolor: "whitesmoke",
                        mb: 1,
                      }}
                    >
                      <Typography
                        fontSize={12}
                        sx={{
                          p: 1,
                        }}
                      >
                        색상
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: "background.paper",
                          overflowY: "auto",
                          p: 1,
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={4} sx={{}}>
                            <Button
                              component="label"
                              color="info"
                              variant="text"
                              fullWidth
                              sx={{
                                p: 0,
                              }}
                            >
                              <Box
                                sx={{
                                  p: 1,
                                  width: "100%",
                                  height: 80,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div id="swatch" className="small">
                                  <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={
                                      canvasStore.layerCurrentId < 0
                                        ? "#ffffff"
                                        : canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.colorMain
                                    }
                                    onInput={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                      canvasStore.canvas.setMainColor(
                                        canvasStore.layers[
                                          canvasStore.layerCurrentId
                                        ]?.id,
                                        e.target.value,
                                      );
                                    }}
                                  />
                                </div>

                                <Box
                                  sx={{
                                    mt: 1,
                                    fontSize: 12,
                                  }}
                                >
                                  배경색
                                </Box>
                              </Box>
                            </Button>
                          </Grid>

                          <Grid item xs={4} sx={{}}>
                            <Button
                              component="label"
                              color="info"
                              variant="text"
                              fullWidth
                              sx={{
                                p: 0,
                              }}
                            >
                              <Box
                                sx={{
                                  p: 1,
                                  width: "100%",
                                  height: 80,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div id="swatch" className="small">
                                  <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={
                                      canvasStore.layerCurrentId < 0
                                        ? "#ffffff"
                                        : canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.colorText
                                    }
                                    onInput={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                      canvasStore.canvas.setTextColor(
                                        canvasStore.layers[
                                          canvasStore.layerCurrentId
                                        ]?.id,
                                        e.target.value,
                                      );
                                    }}
                                  />
                                </div>

                                <Box
                                  sx={{
                                    mt: 1,
                                    fontSize: 12,
                                  }}
                                >
                                  글자색
                                </Box>
                              </Box>
                            </Button>
                          </Grid>

                          <Grid item xs={4}>
                            <Button
                              component="label"
                              color="info"
                              variant="text"
                              fullWidth
                              sx={{
                                p: 0,
                              }}
                            >
                              <Box
                                sx={{
                                  p: 1,
                                  width: "100%",
                                  height: 80,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div id="swatch" className="small">
                                  <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={
                                      canvasStore.layerCurrentId < 0
                                        ? "#ffffff"
                                        : canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.colorSub
                                    }
                                    onInput={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                      canvasStore.canvas.setSubColor(
                                        canvasStore.layers[
                                          canvasStore.layerCurrentId
                                        ]?.id,
                                        e.target.value,
                                      );
                                    }}
                                  />
                                </div>

                                <Box
                                  sx={{
                                    mt: 1,
                                    fontSize: 12,
                                  }}
                                >
                                  테두리색
                                </Box>
                              </Box>
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>

                    <Paper
                      variant="outlined"
                      sx={{
                        display:
                          canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "i-text" ||
                          canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "image"
                            ? "none"
                            : "",
                        bgcolor: "whitesmoke",
                        mb: 1,
                      }}
                    >
                      <Typography
                        fontSize={12}
                        sx={{
                          p: 1,
                        }}
                      >
                        도형
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: "background.paper",
                          overflowY: "auto",
                          p: 1,
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <ButtonGroup
                              sx={{
                                width: "100%",
                                height: 80,
                              }}
                            >
                              <Button
                                color="info"
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.createRect();
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                  }}
                                >
                                  <Box>
                                    <RectangleOutlined />
                                  </Box>

                                  <Divider
                                    sx={{
                                      mb: 1,
                                    }}
                                  />

                                  <Box
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    사각형
                                  </Box>
                                </Box>
                              </Button>

                              <Button
                                color="info"
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.createTriangle();
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                  }}
                                >
                                  <Box>
                                    <ChangeHistory />
                                  </Box>

                                  <Divider
                                    sx={{
                                      mb: 1,
                                    }}
                                  />

                                  <Box
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    삼각형
                                  </Box>
                                </Box>
                              </Button>

                              <Button
                                color="info"
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.createOval();
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                  }}
                                >
                                  <Box>
                                    <CircleOutlined />
                                  </Box>

                                  <Divider
                                    sx={{
                                      mb: 1,
                                    }}
                                  />

                                  <Box
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    원
                                  </Box>
                                </Box>
                              </Button>
                            </ButtonGroup>
                          </Grid>

                          <Grid
                            item
                            xs={4}
                            sx={{
                              m: "auto",
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: 12,
                              }}
                            >
                              라운드
                            </Box>
                          </Grid>

                          <Grid item xs={8}>
                            <Slider
                              color="secondary"
                              aria-label="Default"
                              valueLabelDisplay="auto"
                              value={
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.rounded
                              }
                              onChange={(e: any) => {
                                canvasStore.canvas.setRoundBorder(
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                  e.target.value,
                                );
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>

                    <Paper
                      variant="outlined"
                      sx={{
                        display:
                          canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "rect" ||
                          canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "triangle" ||
                          canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "circle" ||
                          canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "image"
                            ? "none"
                            : "",
                        bgcolor: "whitesmoke",
                        mb: 1,
                      }}
                    >
                      <Typography
                        fontSize={12}
                        sx={{
                          p: 1,
                        }}
                      >
                        텍스트
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: "background.paper",
                          p: 1,
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              value={canvasStore.textData}
                              onChange={(e) => {
                                canvasStore.setTextData(e.target.value);
                              }}
                              inputProps={{
                                style: {
                                  fontSize: 12,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              color="inherit"
                              fullWidth
                              onClick={() => {
                                canvasStore.canvas.createText(
                                  canvasStore.textData,
                                  engineDataStore.brandInfo.fontFamily,
                                );
                              }}
                              sx={{
                                fontSize: 12,
                              }}
                            >
                              새 텍스트 생성하기
                            </Button>
                          </Grid>

                          <Grid
                            item
                            xs={4}
                            sx={{
                              m: "auto",
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: 12,
                              }}
                            >
                              크기
                            </Box>
                          </Grid>

                          <Grid item xs={8}>
                            <Slider
                              color="secondary"
                              aria-label="Default"
                              valueLabelDisplay="auto"
                              min={0}
                              max={500}
                              value={
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.fontSize
                              }
                              onChange={(e: any) => {
                                canvasStore.canvas.setFontSize(
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                  e.target.value,
                                );
                              }}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={4}
                            sx={{
                              m: "auto",
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: 12,
                              }}
                            >
                              서체
                            </Box>
                          </Grid>

                          <Grid item xs={8}>
                            <Select
                              color="secondary"
                              size="small"
                              fullWidth
                              sx={{
                                fontSize: 12,
                              }}
                              onChange={(e) => {
                                canvasStore.canvas.setFontFamily(
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                  e.target.value,
                                );
                              }}
                              value={
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.fontFamily ?? ""
                              }
                            >
                              {fontList.map((v, i) => {
                                return (
                                  <MenuItem key={i} value={v.value}>
                                    {v.nameKor}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </Grid>

                          <Grid item xs={12}>
                            <Divider />
                          </Grid>

                          <Grid item xs={12}>
                            <ButtonGroup
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Button
                                color={
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.fontBold
                                    ? "secondary"
                                    : "info"
                                }
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.setFontBold(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                  );
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                    height: 40,
                                  }}
                                >
                                  <Box>
                                    <FormatBold />
                                  </Box>
                                </Box>
                              </Button>
                              <Button
                                color={
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.fontStyle
                                    ? "secondary"
                                    : "info"
                                }
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.setFontItalic(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                  );
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                    height: 40,
                                  }}
                                >
                                  <Box>
                                    <FormatItalic />
                                  </Box>
                                </Box>
                              </Button>
                              <Button
                                color={
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.fontUnderline
                                    ? "secondary"
                                    : "info"
                                }
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.setFontUnderline(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                  );
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                    height: 40,
                                  }}
                                >
                                  <Box>
                                    <FormatUnderlined />
                                  </Box>
                                </Box>
                              </Button>
                            </ButtonGroup>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              ) : null}

              {canvasStore.logoMenu === 0 && canvasStore.layerCurrentId > -1 ? (
                <>
                  <Box sx={{}}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mb: 1,
                      }}
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          bgcolor: "whitesmoke",
                        }}
                      >
                        <Typography
                          fontSize={12}
                          sx={{
                            p: 1,
                          }}
                        >
                          개체 설정(
                          {canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "image"
                            ? "이미지"
                            : canvasStore.layers[canvasStore.layerCurrentId]
                                ?.type === "i-text"
                            ? "텍스트"
                            : "도형"}
                          )
                        </Typography>

                        <Box
                          sx={{
                            bgcolor: "background.paper",
                            p: 1,
                          }}
                        >
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <Button
                                disabled={canvasStore.layerCurrentId < 0}
                                color={
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.locked
                                    ? "secondary"
                                    : "info"
                                }
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.setLocked(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                  );
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                    height: 80,
                                  }}
                                >
                                  <Box>
                                    {canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.locked ? (
                                      <LockOutlined />
                                    ) : (
                                      <LockOpenOutlined />
                                    )}
                                  </Box>

                                  <Divider
                                    sx={{
                                      mb: 1,
                                    }}
                                  />

                                  <Box
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    {canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.locked
                                      ? "보호중"
                                      : "보호"}
                                  </Box>
                                </Box>
                              </Button>
                            </Grid>

                            <Grid
                              item
                              xs={4}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                ref={placeRef}
                                disabled={canvasStore.layerCurrentId < 0}
                                color="info"
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.setPlacePopOver(true);
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                    height: 80,
                                  }}
                                >
                                  <Box>
                                    <LayersOutlined />
                                  </Box>

                                  <Divider
                                    sx={{
                                      mb: 1,
                                    }}
                                  />

                                  <Box
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    배치
                                  </Box>
                                </Box>
                              </Button>
                            </Grid>

                            <Grid
                              item
                              xs={4}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                ref={alignRef}
                                disabled={true}
                                color="info"
                                variant="outlined"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.setAlignPopOver(true);
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                    height: 80,
                                  }}
                                >
                                  <Box>
                                    <FormatAlignCenter />
                                  </Box>

                                  <Divider
                                    sx={{
                                      mb: 1,
                                    }}
                                  />

                                  <Box
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    정렬
                                  </Box>
                                </Box>
                              </Button>
                            </Grid>

                            {canvasStore.layers[canvasStore.layerCurrentId]
                              ?.type === "image" ? null : (
                              <Grid
                                item
                                xs={4}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  disabled={canvasStore.layerCurrentId < 0}
                                  color={
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.stroke
                                      ? "secondary"
                                      : "info"
                                  }
                                  variant="outlined"
                                  fullWidth
                                  sx={{
                                    p: 0,
                                  }}
                                  onClick={() => {
                                    canvasStore.canvas.setStroke(
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.id,
                                    );
                                  }}
                                >
                                  <Box
                                    sx={{
                                      p: 1,
                                      width: "100%",
                                      height: 80,
                                    }}
                                  >
                                    <Box>
                                      <BorderAll />
                                    </Box>

                                    <Divider
                                      sx={{
                                        mb: 1,
                                      }}
                                    />

                                    <Box
                                      sx={{
                                        fontSize: 12,
                                      }}
                                    >
                                      테두리
                                    </Box>
                                  </Box>
                                </Button>
                              </Grid>
                            )}

                            {canvasStore.layers[canvasStore.layerCurrentId]
                              ?.type === "image" ? (
                              <Grid
                                item
                                xs={4}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  disabled={canvasStore.layerCurrentId < 0}
                                  variant="outlined"
                                  color={
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.morph === "rectangle"
                                      ? "info"
                                      : "secondary"
                                  }
                                  fullWidth
                                  sx={{
                                    p: 0,
                                  }}
                                  onClick={() => {
                                    switch (
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.morph
                                    ) {
                                      case "rectangle": {
                                        canvasStore.canvas.setLogoShape(
                                          canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.id,
                                          "circle",
                                        );

                                        break;
                                      }

                                      case "circle": {
                                        canvasStore.canvas.setLogoShape(
                                          canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.id,
                                          "triangle",
                                        );

                                        break;
                                      }

                                      case "triangle": {
                                        canvasStore.canvas.setLogoShape(
                                          canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.id,
                                          "heart",
                                        );

                                        break;
                                      }

                                      case "heart": {
                                        canvasStore.canvas.setLogoShape(
                                          canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.id,
                                          "rectangle",
                                        );

                                        break;
                                      }
                                    }
                                  }}
                                >
                                  <Box
                                    sx={{
                                      p: 1,
                                      width: "100%",
                                      height: 80,
                                    }}
                                  >
                                    <Box>
                                      <ShapeLine />
                                    </Box>

                                    <Divider
                                      sx={{
                                        mb: 1,
                                      }}
                                    />

                                    <Box
                                      sx={{
                                        fontSize: 12,
                                      }}
                                    >
                                      {canvasStore.layerCurrentId < 0
                                        ? "변형"
                                        : canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.morph === "circle"
                                        ? "원"
                                        : canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.morph === "triangle"
                                        ? "삼각형"
                                        : canvasStore.layers[
                                            canvasStore.layerCurrentId
                                          ]?.morph === "heart"
                                        ? "하트"
                                        : "변형"}
                                    </Box>
                                  </Box>
                                </Button>
                              </Grid>
                            ) : null}

                            {canvasStore.layers[canvasStore.layerCurrentId]
                              ?.type === "image" ? (
                              <Grid
                                item
                                xs={4}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  disabled={
                                    canvasStore.layerCurrentId < 0 ||
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.backgroundRemoved
                                  }
                                  variant="outlined"
                                  color="info"
                                  fullWidth
                                  sx={{
                                    p: 0,
                                  }}
                                  onClick={() => {
                                    canvasStore.canvas.setImageRemoveBackground(
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.id,
                                    );
                                  }}
                                >
                                  <Box
                                    sx={{
                                      p: 1,
                                      width: "100%",
                                      height: 80,
                                    }}
                                  >
                                    {canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.backgroundRemoved ? (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          // height: 64,
                                        }}
                                      >
                                        <CircularProgress
                                          color="secondary"
                                          size="2rem"
                                        />
                                      </Box>
                                    ) : (
                                      <>
                                        <Box>
                                          <AutoAwesomeOutlined />
                                        </Box>

                                        <Divider
                                          sx={{
                                            mb: 1,
                                          }}
                                        />

                                        <Box
                                          sx={{
                                            fontSize: 12,
                                          }}
                                        >
                                          배경제거
                                        </Box>
                                      </>
                                    )}
                                  </Box>
                                </Button>
                              </Grid>
                            ) : null}

                            <Grid
                              item
                              xs={4}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                disabled={
                                  canvasStore.layerCurrentId < 0 ||
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.backgroundRemoved
                                }
                                variant="outlined"
                                color="error"
                                fullWidth
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => {
                                  canvasStore.canvas.removeObject(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                  );
                                }}
                              >
                                <Box
                                  sx={{
                                    p: 1,
                                    width: "100%",
                                    height: 80,
                                  }}
                                >
                                  <Box>
                                    <DeleteOutline />
                                  </Box>

                                  <Divider
                                    sx={{
                                      mb: 1,
                                    }}
                                  />

                                  <Box
                                    sx={{
                                      fontSize: 12,
                                    }}
                                  >
                                    삭제
                                  </Box>
                                </Box>
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Box>
                  </Box>
                </>
              ) : null}

              {canvasStore.logoMenu === 1 ? (
                <Box sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mb: 1,
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        bgcolor: "whitesmoke",
                        p: 1,
                        mb: 3,
                      }}
                    >
                      <Typography fontSize={12}>
                        키워드를 입력하여 필요한 일러스트를 생성해보세요.
                      </Typography>
                    </Paper>

                    <Box
                      sx={{
                        mb: 1,
                      }}
                    >
                      <TextField
                        disabled={engineStore.drawingData.loading}
                        color="secondary"
                        label="키워드"
                        fullWidth
                        size="small"
                        sx={{
                          mb: 1,
                        }}
                        onChange={(e) => {
                          engineStore.setDrawingData({
                            ...engineStore.drawingData,

                            prompt: e.target.value,
                          });
                        }}
                        value={engineStore.drawingData.prompt}
                      />

                      <Button
                        disabled={engineStore.drawingData.loading}
                        color="info"
                        onClick={async () => {
                          engineStore.setDrawingData({
                            ...engineStore.drawingData,

                            data: "",
                            loading: true,
                          });

                          const output = await EngineGateway({
                            query: "logo/v1",
                            method: "POST",
                            data: {
                              category: "Stable-Diffusion-v1.5",
                              num_images: "4",
                              num_inference_steps: "50",
                              engine: "test_v2",
                              prompt: `${engineStore.drawingData.prompt} illustration`,
                              pixel_resolution: "512",
                              compression_format: "PNG",
                            },
                            auth: false,
                          });

                          engineStore.setDrawingData({
                            ...engineStore.drawingData,

                            data: output.result.predictions,
                            loading: false,
                          });
                        }}
                        variant="contained"
                        fullWidth
                      >
                        {engineStore.drawingData.loading ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress size="0.8rem" color="inherit" />
                            &nbsp; 생성 중...
                          </Box>
                        ) : (
                          "AI 일러스트 생성"
                        )}
                      </Button>
                    </Box>

                    <Paper
                      variant="outlined"
                      sx={{
                        bgcolor: "whitesmoke",
                        p: 1,
                        mb: 1,
                      }}
                    >
                      {engineStore.drawingData.data ? (
                        <>
                          <Typography
                            fontSize={12}
                            sx={{
                              mb: 1,
                            }}
                          >
                            일러스트 선택 후 [로고에 넣기] 버튼을 클릭해주세요.
                          </Typography>

                          <Grid container>
                            {engineStore.drawingData.data.map((v, i) => {
                              return (
                                <Grid key={i} xs={6}>
                                  <Image
                                    src={v}
                                    width={"100%"}
                                    style={{
                                      border:
                                        engineStore.drawingData.selected === i
                                          ? "2px solid #8265ff"
                                          : "2px solid white",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      engineStore.setDrawingData({
                                        ...engineStore.drawingData,

                                        selected: i,
                                      });
                                    }}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                        </>
                      ) : (
                        <Typography fontSize={12}>
                          [AI 일러스트 생성] 버튼을 클릭하여 일러스트를
                          생성해주세요.
                        </Typography>
                      )}
                    </Paper>

                    <Button
                      disabled={engineStore.drawingData.loading}
                      color="secondary"
                      onClick={async () => {
                        canvasStore.canvas.createImage(
                          engineStore.drawingData.data[
                            engineStore.drawingData.selected
                          ],
                          true,
                          null,
                        );
                      }}
                      variant="contained"
                      fullWidth
                    >
                      로고에 넣기
                    </Button>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>

          <EditorCore />

          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              // position: "relative",
            }}
          >
            <Box
              sx={{
                // bgcolor: "background.paper",

                display: engineDataStore.prompts.detailed ? "" : "none",
                // boxShadow: `0px 3px 7px 0px ${
                //   theme.palette.mode === "light"
                //     ? "rgba(0,0,0,.1)"
                //     : "rgba(255,255,255,.1)"
                // }`,
                width: 400,
                height: commonStore.baseInfo.height - 60,
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  borderLeft: 1,
                  borderColor: "divider",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography fontWeight={"bold"} fontSize={20}>
                    라이브러리(
                    {libraryDataStore.libraryData.columnCount})
                  </Typography>

                  <Pagination
                    count={libraryDataStore.libraryData.totalPage}
                    color="primary"
                    onChange={(e, page) => {
                      libraryDataStore.getLibraryData(10, page);
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    height: 40,
                    mb: 3,
                  }}
                  startIcon={<Add />}
                  onClick={() => {
                    engineStore.setImageCreateModal(true);
                  }}
                >
                  이미지 추가
                </Button>

                {libraryDataStore.libraryData ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Paper
                            variant="outlined"
                            sx={{
                              // boxShadow: `0px 3px 7px 0px ${
                              //   theme.palette.mode === "light"
                              //     ? "rgba(0,0,0,.1)"
                              //     : "rgba(255,255,255,.1)"
                              // }`,
                              width: "100%",
                              p: 1,
                            }}
                          >
                            <Box sx={{}}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "100%",
                                    overflow: "auto",
                                  }}
                                >
                                  <Grid container spacing={1}>
                                    {libraryDataStore.libraryData.pagination.map(
                                      (v: any, i) => {
                                        return (
                                          <Grid
                                            key={i}
                                            item
                                            xs={commonStore.isDesktop ? 4 : 12}
                                          >
                                            <Paper
                                              variant="outlined"
                                              sx={{
                                                // borderRadius: "1em",
                                                border:
                                                  libraryDataStore.libraryData
                                                    .pagination[
                                                    libraryDataStore
                                                      .currentImageIndex
                                                  ].selectLogo === v.selectLogo
                                                    ? "3px solid #fadc65"
                                                    : "3px solid white",
                                                // boxShadow:
                                                //   "0px 3px 7px 0px rgba(0,0,0,.1)",
                                                maxWidth: "100%",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                libraryDataStore.setCurrentImageIndex(
                                                  i,
                                                );

                                                canvasStore.canvas.init(
                                                  v.selectLogo,
                                                  "",
                                                  "",
                                                  "",
                                                  0,
                                                );
                                              }}
                                            >
                                              <Image
                                                src={v.selectLogo}
                                                alt="정보이미지1"
                                                style={{
                                                  // borderTopLeftRadius:
                                                  // "1em",
                                                  // borderTopRightRadius:
                                                  // "1em",
                                                  width: 99,
                                                  height: 99,
                                                  objectFit: "cover",
                                                }}
                                              />
                                            </Paper>
                                          </Grid>
                                        );
                                      },
                                    )}
                                  </Grid>
                                </Box>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <EditorPlacePopOver placeRef={placeRef} />
      <EditorAlignPopOver alignRef={alignRef} />

      <LogoGenerationModal />
    </>
  ));
}

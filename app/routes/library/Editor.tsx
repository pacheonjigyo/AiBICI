import * as React from "react";
import Image from "../../common/Image.js";
import LogoGenerationModal from "../../layout/modal/LogoGenerationModal.js";
import EditorCore from "./EditorCore.js";

import {
  Add,
  AddCircle,
  ArrowBack,
  AutoAwesome,
  AutoAwesomeOutlined,
  BorderAll,
  DeleteOutline,
  FormatAlignCenter,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  ImageOutlined,
  InterestsOutlined,
  LayersOutlined,
  LockOpenOutlined,
  LockOutlined,
  RedoOutlined,
  RemoveCircle,
  ShapeLine,
  TextFieldsOutlined,
  UndoOutlined,
} from "@mui/icons-material";

import {
  Box,
  Button,
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
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { BigButton } from "../../common/BigButton.js";
import { CanvasEditor } from "../../common/CanvasEditor.js";
import { readAsDataURLAsync } from "../../common/FileManager.js";
import { uploadToS3 } from "../../common/FileUpload.js";
import { floatingToast } from "../../common/FloatingToast.js";
import { EngineGateway } from "../../common/Gateway.js";
import { useHorizontalScroll } from "../../common/HorizontalScroll.js";
import { Link as NavLink } from "../../common/Link.js";
import { usePageEffect } from "../../core/page.js";
import { fontList } from "../../data/fontList.js";
import { wordList } from "../../data/words.js";
import { EditorAlignPopOver } from "../../layout/popover/EditorAlignPopOver.js";
import { EditorPlacePopOver } from "../../layout/popover/EditorPlacePopOver.js";
import { AppContext } from "../../stores/index.js";

export default function Editor(props: any): JSX.Element {
  const { id } = useParams();

  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const scrollRef3 = useHorizontalScroll();

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

    if (!id) {
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
          height: commonStore.baseInfo.height,
        }}
      >
        <Box
          sx={{
            height: 80,

            display: "flex",
          }}
        >
          <Box
            sx={{
              width: commonStore.baseInfo.width,

              display: "flex",
              alignItems: "center",
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
                <IconButton
                  size="small"
                  sx={{
                    ml: 1,
                    mr: 3,
                  }}
                  href="/creator/design"
                  component={NavLink}
                >
                  <ArrowBack />
                </IconButton>

                <Typography
                  fontSize={11}
                  fontWeight="bold"
                  sx={{
                    mr: 1,
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
                  <Typography fontSize={11} fontWeight="bold">
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

                <Typography
                  fontSize={11}
                  fontWeight="bold"
                  sx={{
                    ml: 3,
                    mr: 1,
                  }}
                >
                  템플릿
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <Select
                    size="small"
                    fullWidth
                    value={0}
                    sx={{
                      fontSize: 11,
                      fontWeight: "bold",
                    }}
                  >
                    <MenuItem value={0}>기본 (512x512)</MenuItem>
                  </Select>
                </Box>

                <Typography
                  fontSize={11}
                  fontWeight="bold"
                  sx={{
                    ml: 3,
                    mr: 1,
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
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                  }}
                >
                  <BigButton
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={async () => {
                      if (!id) {
                        return;
                      }

                      const data = canvasStore.canvas.getCanvasDataURL();

                      const logoGraphic =
                        await canvasStore.canvas.uploadCanvasGraphic(id);
                      const logo = await uploadToS3(
                        data,
                        `brand/${id}/logo`,
                        "png",
                        "image/png",
                      );

                      identityDataStore.setDetailedData({
                        ...identityDataStore.detailedData,

                        serviceCore: {
                          ...identityDataStore.detailedData.serviceCore,

                          logo,
                        },
                      });

                      identityDataStore.updateDetailedData(
                        id,
                        {
                          logo,
                          logoGraphic,
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
                    }}
                  >
                    저장하기
                  </BigButton>
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
          <Box
            sx={{
              height: commonStore.baseInfo.height - 80,
            }}
          >
            <Box
              className="hideScroll"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",

                overflowY: "auto",
                width: 80,
              }}
            >
              <Box
                sx={{
                  height: commonStore.baseInfo.height - 80,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    px: 1,
                    mt: 1,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 1 ? "info" : "inherit"}
                    variant={
                      canvasStore.logoMenu === 1 ? "contained" : "contained"
                    }
                    sx={{
                      minWidth: 64,
                      height: 64,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(1);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <ImageOutlined />

                      <Typography fontSize={11} fontWeight="bold">
                        이미지
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: 80,
                    px: 1,
                    mt: 1,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 2 ? "info" : "inherit"}
                    variant={
                      canvasStore.logoMenu === 2 ? "contained" : "contained"
                    }
                    sx={{
                      minWidth: 64,
                      height: 64,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(2);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <InterestsOutlined />

                      <Typography fontSize={11} fontWeight="bold">
                        도형
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: 80,
                    px: 1,
                    mt: 1,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 3 ? "info" : "inherit"}
                    variant={
                      canvasStore.logoMenu === 3 ? "contained" : "contained"
                    }
                    sx={{
                      minWidth: 64,
                      height: 64,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(3);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <TextFieldsOutlined />

                      <Typography fontSize={11} fontWeight="bold">
                        텍스트
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: 80,
                    px: 1,
                    mt: 1,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 4 ? "info" : "inherit"}
                    variant={
                      canvasStore.logoMenu === 4 ? "contained" : "contained"
                    }
                    sx={{
                      minWidth: 64,
                      height: 64,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(4);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <AutoAwesome />

                      <Typography fontSize={11} fontWeight="bold">
                        AI 툴
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            className="hideScroll"
            sx={{
              bgcolor: "#ebebeb",
              // borderRight: 1,
              // borderColor: "divider",

              width: 260,
              height: commonStore.baseInfo.height - 80,
              overflowY: "scroll",
            }}
          >
            {(canvasStore.logoMenu === 1 ||
              canvasStore.logoMenu === 2 ||
              canvasStore.logoMenu === 3) &&
            canvasStore.layerCurrentId > -1 ? (
              <>
                <Box
                  sx={{
                    px: 3,
                    pt: 3,
                    pb: 0,
                  }}
                >
                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                    }}
                  >
                    {canvasStore.layers[canvasStore.layerCurrentId]?.type ===
                    "image"
                      ? "이미지"
                      : canvasStore.layers[canvasStore.layerCurrentId]?.type ===
                        "i-text"
                      ? "텍스트"
                      : "도형"}
                  </Typography>

                  <Box sx={{}}>
                    <Typography
                      fontSize={12}
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                      }}
                    >
                      개체 설정
                    </Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Button
                          disabled={canvasStore.layerCurrentId < 0}
                          color={
                            canvasStore.layers[canvasStore.layerCurrentId]
                              ?.locked
                              ? "secondary"
                              : "inherit"
                          }
                          variant="contained"
                          fullWidth
                          sx={{
                            p: 0,
                          }}
                          onClick={() => {
                            canvasStore.canvas.setLocked(
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.id,
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
                              {canvasStore.layers[canvasStore.layerCurrentId]
                                ?.locked ? (
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
                              {canvasStore.layers[canvasStore.layerCurrentId]
                                ?.locked
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
                          color="inherit"
                          variant="contained"
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
                          color="inherit"
                          variant="contained"
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

                      {canvasStore.layers[canvasStore.layerCurrentId]?.type ===
                      "image" ? null : (
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
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.stroke
                                ? "secondary"
                                : "inherit"
                            }
                            variant="contained"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.setStroke(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
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

                      {canvasStore.layers[canvasStore.layerCurrentId]?.type ===
                      "image" ? (
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
                            variant="contained"
                            color={
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.morph === "rectangle"
                                ? "inherit"
                                : "secondary"
                            }
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              switch (
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.morph
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

                      {canvasStore.layers[canvasStore.layerCurrentId]?.type ===
                      "image" ? (
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
                            variant="contained"
                            color="inherit"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.setImageRemoveBackground(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
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
                              {canvasStore.layers[canvasStore.layerCurrentId]
                                ?.backgroundRemoved ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 64,
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
                          variant="contained"
                          color="inherit"
                          fullWidth
                          sx={{
                            p: 0,
                          }}
                          onClick={() => {
                            canvasStore.canvas.removeObject(
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.id,
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
                </Box>
              </>
            ) : null}

            {canvasStore.group ||
            canvasStore.layerCurrentId > -1 ||
            canvasStore.layerCurrentId === -1 ? (
              <Box>
                <Box>
                  {canvasStore.logoMenu === 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 3,
                      }}
                    >
                      <Typography fontSize={12} fontWeight="bold">
                        이미지 업로드
                      </Typography>

                      <Button
                        component="label"
                        color="inherit"
                        variant="contained"
                        // fullWidth
                        sx={{
                          fontSize: 12,
                        }}
                        endIcon={<Add />}
                      >
                        파일 업로드
                        <input
                          type="file"
                          hidden
                          onChange={async (e: any) => {
                            const file = e.target.files[0];

                            if (!file) {
                              return;
                            }

                            const base64: any = await readAsDataURLAsync(file);
                            const url: any = await uploadToS3(
                              base64.split(",")[1],
                              `test/images_${new Date().getTime()}`,
                              file.name.split(".")[1],
                              file.type,
                            );

                            canvasStore.canvas.createImage(url, true, null);
                          }}
                        />
                      </Button>
                    </Box>
                  )}

                  {canvasStore.logoMenu === 2 && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",

                        p: 3,
                      }}
                    >
                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        도형 생성
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          color="inherit"
                          variant="contained"
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
                              height: 40,
                            }}
                          >
                            사각형
                          </Box>
                        </Button>

                        <Button
                          color="inherit"
                          variant="contained"
                          fullWidth
                          sx={{
                            ml: 1,
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
                              height: 40,
                            }}
                          >
                            삼각형
                          </Box>
                        </Button>

                        <Button
                          color="inherit"
                          variant="contained"
                          fullWidth
                          sx={{
                            ml: 1,
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
                              height: 40,
                            }}
                          >
                            원
                          </Box>
                        </Button>
                      </Box>

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mt: 3,
                          mb: 1,
                        }}
                      >
                        라운드 설정
                      </Typography>

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
                            canvasStore.layers[canvasStore.layerCurrentId]?.id,
                            e.target.value,
                          );
                        }}
                      />
                    </Box>
                  )}

                  {canvasStore.logoMenu === 3 && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",

                        px: 3,
                        pt: 0,
                        pb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",

                          mt: 3,
                          mb: 1,
                        }}
                      >
                        <Typography fontSize={12} fontWeight="bold">
                          텍스트 생성
                        </Typography>

                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => {
                            canvasStore.canvas.createText(
                              canvasStore.textData,
                              engineDataStore.brandInfo.fontFamily,
                            );
                          }}
                          endIcon={<Add />}
                        >
                          생성
                        </Button>
                      </Box>

                      <TextField
                        multiline
                        rows={3}
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

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mt: 3,
                          mb: 1,
                        }}
                      >
                        크기 설정
                      </Typography>

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
                            canvasStore.layers[canvasStore.layerCurrentId]?.id,
                            e.target.value,
                          );
                        }}
                      />

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mt: 3,
                          mb: 1,
                        }}
                      >
                        폰트 설정
                      </Typography>

                      <Select
                        color="secondary"
                        size="small"
                        fullWidth
                        sx={{
                          fontSize: 12,
                        }}
                        onChange={(e) => {
                          canvasStore.canvas.setFontFamily(
                            canvasStore.layers[canvasStore.layerCurrentId]?.id,
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

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mt: 3,
                          mb: 1,
                        }}
                      >
                        스타일 설정
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          color={
                            canvasStore.layers[canvasStore.layerCurrentId]
                              ?.fontBold
                              ? "secondary"
                              : "inherit"
                          }
                          variant="contained"
                          fullWidth
                          sx={{
                            p: 0,
                          }}
                          onClick={() => {
                            canvasStore.canvas.setFontBold(
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.id,
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
                              : "inherit"
                          }
                          variant="contained"
                          fullWidth
                          sx={{
                            ml: 1,

                            p: 0,
                          }}
                          onClick={() => {
                            canvasStore.canvas.setFontItalic(
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.id,
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
                              : "inherit"
                          }
                          variant="contained"
                          fullWidth
                          sx={{
                            ml: 1,
                            p: 0,
                          }}
                          onClick={() => {
                            canvasStore.canvas.setFontUnderline(
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.id,
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
                      </Box>
                    </Box>
                  )}

                  {(canvasStore.logoMenu === 1 ||
                    canvasStore.logoMenu === 2 ||
                    canvasStore.logoMenu === 3) && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",

                        p: 3,
                      }}
                    >
                      <Typography
                        fontSize={16}
                        fontWeight="bold"
                        sx={{
                          mb: 3,
                        }}
                      >
                        색상
                      </Typography>

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        배경색
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: "#f5f5f5",
                          borderRadius: 1,

                          display: "flex",
                          alignItems: "center",

                          p: 1,
                        }}
                      >
                        <Button
                          component="label"
                          color="info"
                          variant="text"
                          sx={{
                            p: 0,
                            minWidth: 40,
                            height: 40,
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
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                  e.target.value,
                                );
                              }}
                            />

                            <div className="info">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography fontSize={12}>
                                  {
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.colorMain
                                  }
                                </Typography>
                              </Box>
                            </div>
                          </div>
                        </Button>
                      </Box>

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mt: 3,
                          mb: 1,
                        }}
                      >
                        글자색
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: "#f5f5f5",
                          borderRadius: 1,

                          display: "flex",
                          alignItems: "center",

                          p: 1,
                        }}
                      >
                        <Button
                          component="label"
                          color="info"
                          variant="text"
                          sx={{
                            p: 0,
                            minWidth: 40,
                            height: 40,
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
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                  e.target.value,
                                );
                              }}
                            />

                            <div className="info">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography fontSize={12}>
                                  {
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.colorText
                                  }
                                </Typography>
                              </Box>
                            </div>
                          </div>
                        </Button>
                      </Box>

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mt: 3,
                          mb: 1,
                        }}
                      >
                        테두리색
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: "#f5f5f5",
                          borderRadius: 1,

                          display: "flex",
                          alignItems: "center",

                          p: 1,
                        }}
                      >
                        <Button
                          component="label"
                          color="info"
                          variant="text"
                          sx={{
                            p: 0,
                            minWidth: 40,
                            height: 40,
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
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                  e.target.value,
                                );
                              }}
                            />

                            <div className="info">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography fontSize={12}>
                                  {
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.colorSub
                                  }
                                </Typography>
                              </Box>
                            </div>
                          </div>
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : null}

            {canvasStore.logoMenu === 4 ? (
              <Box sx={{}}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                    }}
                  >
                    AI 이미지 만들기
                  </Typography>

                  <Paper
                    variant="outlined"
                    sx={{
                      bgcolor: "whitesmoke",
                      p: 1,
                      mb: 3,
                    }}
                  >
                    <Typography fontSize={12}>
                      아래 입력창에 키워드를 입력하여 필요한 일러스트를
                      생성해보세요.
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
                      onChange={(e) => {
                        engineStore.setDrawingData({
                          ...engineStore.drawingData,

                          prompt: e.target.value,
                        });
                      }}
                      value={engineStore.drawingData.prompt}
                      InputLabelProps={{
                        style: {
                          fontSize: 12,
                        },
                      }}
                      inputProps={{
                        style: {
                          fontSize: 12,
                        },
                      }}
                    />

                    <Button
                      disabled={engineStore.drawingData.loading}
                      color="inherit"
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

                  {engineStore.drawingData.data ? (
                    <>
                      <Paper
                        variant="outlined"
                        sx={{
                          bgcolor: "whitesmoke",
                          p: 1,
                          mb: 1,
                        }}
                      >
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
                          sx={{
                            mt: 1,
                          }}
                        >
                          로고에 넣기
                        </Button>
                      </Paper>
                    </>
                  ) : null}
                </Box>
              </Box>
            ) : null}
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
                bgcolor: "#ebebeb",

                display: engineDataStore.prompts.detailed ? "" : "none",
                // boxShadow: `0px 3px 7px 0px ${
                //   theme.palette.mode === "light"
                //     ? "rgba(0,0,0,.1)"
                //     : "rgba(255,255,255,.1)"
                // }`,
                width: 400,
                height: commonStore.baseInfo.height - 80,
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
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
                  <Typography fontWeight={"bold"}>
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

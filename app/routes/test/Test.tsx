import * as React from "react";
import Image from "../../common/Image.js";

import { useObserver } from "mobx-react";
import { a11yProps, TabPanel } from "../../common/Tabpanel.js";
import { AppContext } from "../../stores/index.js";

import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

export default function Test(): JSX.Element {
  const { commonStore, testStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      {(testStore.engineTesterIndex === 0 && testStore.testResult.length > 0) ||
      (testStore.engineTesterIndex === 1 &&
        testStore.testSloganResult.length > 0) ||
      (testStore.engineTesterIndex === 2 &&
        testStore.testImageResult.length > 0) ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 5,
          }}
          maxWidth="md"
        >
          <Paper
            variant="outlined"
            sx={{
              width: "100%",
              p: 3,
            }}
          >
            <h1>Results</h1>

            <br />

            {testStore.engineTesterIndex === 0 ? (
              <>
                <table
                  style={{
                    border: "1px solid black",
                    padding: 10,
                    marginBottom: 10,
                    width: "100%",
                  }}
                >
                  <tr>
                    <td width="20%">images</td>
                    <td
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {testStore.testResult[0].data.num_images}
                    </td>
                  </tr>

                  <tr>
                    <td style={{}}>steps</td>
                    <td
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {testStore.testResult[0].data.num_inference_steps}
                    </td>
                  </tr>

                  {testStore.inputData.type === "FunctionalCompleteness" ||
                  testStore.inputData.type === "FunctionalAccuracy" ||
                  testStore.inputData.type === "TimeReactivity" ? null : (
                    <tr>
                      <td style={{}}>prompt</td>
                      <td
                        style={{
                          color: "green",
                          textAlign: "right",
                        }}
                      >
                        {testStore.testResult[0].data.prompt}
                      </td>
                    </tr>
                  )}
                </table>

                {testStore.testResult.map((v) => {
                  return (
                    <>
                      <table
                        style={{
                          border: "1px solid black",
                          padding: 10,
                          marginBottom: 10,
                          width: "100%",
                        }}
                      >
                        {testStore.inputData.type ===
                          "FunctionalCompleteness" ||
                        testStore.inputData.type === "FunctionalAccuracy" ||
                        testStore.inputData.type === "TimeReactivity" ? (
                          <tr>
                            <td style={{}}>response</td>
                            <td
                              style={{
                                color: "green",
                                textAlign: "right",
                              }}
                            >
                              Success
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td width="20%">engine type</td>
                          <td
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <span
                              style={{
                                color: "blue",
                              }}
                            >
                              {v.data.category}
                            </span>{" "}
                          </td>
                        </tr>

                        <tr>
                          <td width="20%">delayed</td>
                          <td
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {v.result.ms} seconds
                            </span>
                          </td>
                        </tr>

                        {testStore.inputData.type ===
                          "FunctionalCompleteness" ||
                        testStore.inputData.type === "FunctionalAccuracy" ||
                        testStore.inputData.type === "TimeReactivity" ? (
                          <tr>
                            <td style={{}}>prompt</td>
                            <td
                              style={{
                                textAlign: "right",
                              }}
                            >
                              {v.data.prompt}
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td style={{}}>outputs</td>
                          <td style={{}}>
                            <div
                              style={{
                                maxWidth: 600,
                                overflowX: "auto",
                                textAlign: "right",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {v.result.predictions.map((w) => {
                                  return (
                                    <>
                                      <div
                                        style={{
                                          textAlign: "right",
                                          margin: 10,
                                        }}
                                      >
                                        <Image
                                          src={w}
                                          width={84}
                                          height={84}
                                          alt="로고생성결과이미지"
                                        />
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </>
                  );
                })}
              </>
            ) : testStore.engineTesterIndex === 1 ? (
              <>
                <table
                  style={{
                    border: "1px solid black",
                    padding: 10,
                    marginBottom: 10,
                    width: "100%",
                  }}
                >
                  <tr>
                    <td width="20%">texts</td>
                    <td
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {testStore.testSloganResult[0].data.num_sequences}
                    </td>
                  </tr>

                  <tr>
                    <td style={{}}>prompt</td>
                    <td
                      style={{
                        color: "green",
                        textAlign: "right",
                      }}
                    >
                      {testStore.testSloganResult[0].data.input}
                    </td>
                  </tr>
                </table>

                {testStore.testSloganResult.map((v) => {
                  return (
                    <>
                      <table
                        style={{
                          border: "1px solid black",
                          padding: 10,
                          marginBottom: 10,
                          width: "100%",
                        }}
                      >
                        <tr>
                          <td width="20%">engine type</td>
                          <td
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <span
                              style={{
                                color: "blue",
                              }}
                            >
                              {v.data.model}
                            </span>{" "}
                          </td>
                        </tr>

                        <tr>
                          <td width="20%">delayed</td>
                          <td
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {v.result.ms} seconds
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td style={{}}>outputs</td>
                          <td style={{}}>
                            <div
                              style={{
                                maxWidth: 600,
                                overflowX: "auto",
                              }}
                            >
                              <div
                                style={{
                                  alignItems: "center",
                                }}
                              >
                                {v.result.predictions.map((w) => {
                                  return (
                                    <>
                                      <div
                                        style={{
                                          margin: 10,
                                        }}
                                      >
                                        {w}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </>
                  );
                })}
              </>
            ) : testStore.engineTesterIndex === 2 ? (
              <>
                <table
                  style={{
                    border: "1px solid black",
                    padding: 10,
                    marginBottom: 10,
                    width: "100%",
                  }}
                >
                  <tr>
                    <td width="20%">images</td>
                    <td
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {testStore.testImageResult[0].data.num_images}
                    </td>
                  </tr>

                  <tr>
                    <td style={{}}>steps</td>
                    <td
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {testStore.testImageResult[0].data.num_inference_steps}
                    </td>
                  </tr>

                  <tr>
                    <td style={{}}>prompt</td>
                    <td
                      style={{
                        color: "green",
                        textAlign: "right",
                      }}
                    >
                      {testStore.testImageResult[0].data.prompt}
                    </td>
                  </tr>

                  <tr>
                    <td style={{}}>inputs</td>
                    <td>
                      <img
                        src={testStore.testImageResult[0].data.images}
                        width={84}
                        height={84}
                      />
                    </td>
                  </tr>
                </table>

                {testStore.testImageResult.map((v) => {
                  return (
                    <>
                      <table
                        style={{
                          border: "1px solid black",
                          padding: 10,
                          marginBottom: 10,
                          width: "100%",
                        }}
                      >
                        <tr>
                          <td width="20%">engine type</td>
                          <td
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <span
                              style={{
                                color: "blue",
                              }}
                            >
                              Stable-Diffusion
                            </span>{" "}
                          </td>
                        </tr>

                        <tr>
                          <td width="20%">delayed</td>
                          <td
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {v.result.ms} seconds
                            </span>
                          </td>
                        </tr>

                        {testStore.inputData.type ===
                          "FunctionalCompleteness" ||
                        testStore.inputData.type === "FunctionalAccuracy" ||
                        testStore.inputData.type === "TimeReactivity" ? (
                          <tr>
                            <td style={{}}>prompt</td>
                            <td
                              style={{
                                textAlign: "right",
                              }}
                            >
                              {v.data.prompt}
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td style={{}}>outputs</td>
                          <td style={{}}>
                            <div
                              style={{
                                maxWidth: 600,
                                overflowX: "auto",
                                textAlign: "right",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {v.result.predictions.map((w) => {
                                  return (
                                    <>
                                      <div
                                        style={{
                                          textAlign: "right",
                                          margin: 10,
                                        }}
                                      >
                                        <Image
                                          src={w}
                                          width={84}
                                          height={84}
                                          alt="로고생성결과이미지"
                                        />
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </>
                  );
                })}
              </>
            ) : null}
          </Paper>
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 5,
          }}
          maxWidth="md"
        >
          <Paper
            variant="outlined"
            sx={{
              width: "100%",
              p: 3,
            }}
          >
            <h1>Engine Tester</h1>

            <br />

            <Paper variant="outlined">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={testStore.engineTesterIndex}
                  onChange={(e, value) => {
                    testStore.setEngineTesterIndex(value);
                  }}
                  aria-label="basic tabs example"
                >
                  <Tab label={"Text to Image"} {...a11yProps(0)} />
                  <Tab label={"Text to Text"} {...a11yProps(1)} />
                  <Tab label={"Image to Image"} {...a11yProps(2)} />
                </Tabs>
              </Box>

              <Box
                sx={{
                  p: 3,
                }}
              >
                <TabPanel value={testStore.engineTesterIndex} index={0}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Engine Type
                    </Typography>

                    <Select
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      value={testStore.inputData.type}
                      onChange={(e) => {
                        switch (e.target.value) {
                          case "FunctionalCompleteness": {
                            testStore.setInputData({
                              ...testStore.inputData,

                              category: "Only-Caption",

                              num_images: "1",
                              num_inference_steps: "70",

                              type: e.target.value,
                            });

                            break;
                          }

                          case "FunctionalAccuracy": {
                            testStore.setInputData({
                              ...testStore.inputData,

                              category: "Only-Caption",

                              num_images: "1",
                              num_inference_steps: "70",

                              type: e.target.value,
                            });

                            break;
                          }

                          case "TimeReactivity": {
                            testStore.setInputData({
                              ...testStore.inputData,

                              category: "Only-Caption",

                              num_images: "1",
                              num_inference_steps: "70",

                              type: e.target.value,
                            });

                            break;
                          }

                          default: {
                            testStore.setInputData({
                              ...testStore.inputData,

                              category: e.target.value,

                              type: e.target.value,
                            });

                            break;
                          }
                        }
                      }}
                    >
                      <MenuItem value="Logo-Diffusion">
                        Logo-Diffusion-Checkpoint
                      </MenuItem>
                      <MenuItem value="All">All Engines (4)</MenuItem>
                      <MenuItem value="Stable-Diffusion-v1.5">
                        Stable-Diffusion-v1.5
                      </MenuItem>
                      <MenuItem value="Default">UNIST-Default</MenuItem>
                      <MenuItem value="Only-Caption">
                        UNIST-Only-Caption
                      </MenuItem>
                      <MenuItem value="Caption-BrandInfo-BP">
                        UNIST-Caption-BrandInfo-BP
                      </MenuItem>
                      <MenuItem value="FunctionalCompleteness">
                        시험항목1
                      </MenuItem>
                      <MenuItem value="FunctionalAccuracy">시험항목2</MenuItem>
                      <MenuItem value="TimeReactivity">시험항목3</MenuItem>
                    </Select>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Number of Images
                    </Typography>

                    <TextField
                      id="test-input-01"
                      type="number"
                      value={testStore.inputData.num_images}
                      fullWidth
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value < 1 || value > 10) {
                          alert("The value cannot be x < 1 or x > 10.");

                          return;
                        }

                        testStore.setInputData({
                          ...testStore.inputData,

                          num_images: e.target.value,
                        });
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Number of Inference Steps
                    </Typography>

                    <TextField
                      id="test-input-02"
                      type="number"
                      value={testStore.inputData.num_inference_steps}
                      fullWidth
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value < 1 || value > 150) {
                          alert("The value cannot be x < 1 or x > 150.");

                          return;
                        }

                        testStore.setInputData({
                          ...testStore.inputData,

                          num_inference_steps: e.target.value,
                        });
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Pixel Resolution
                    </Typography>
                    <TextField
                      id="test-input-02"
                      type="number"
                      value={testStore.inputData.pixel_resolution}
                      fullWidth
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value < 1 || value > 2048) {
                          alert("The value cannot be x < 1 or x > 2048.");

                          return;
                        }

                        testStore.setInputData({
                          ...testStore.inputData,

                          pixel_resolution: e.target.value,
                        });
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Compression Format
                    </Typography>

                    <Select
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      value={testStore.inputData.compression_format}
                      onChange={(e) => {
                        testStore.setInputData({
                          ...testStore.inputData,

                          compression_format: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="JPEG">JPG</MenuItem>
                      <MenuItem value="PNG">PNG</MenuItem>
                    </Select>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {testStore.inputData.type === "FunctionalCompleteness" ||
                  testStore.inputData.type === "FunctionalAccuracy" ||
                  testStore.inputData.type === "TimeReactivity" ? (
                    <>
                      {testStore.testInputs.map((v, i) => {
                        return (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              Data #{(i + 1).toString().padStart(2, "0")}
                              <TextField
                                id={`test-input-${i + 3}`}
                                placeholder="Enter the prompt"
                                sx={{
                                  mb: 1,
                                  width: "50%",
                                }}
                                value={v?.positive_prompt ?? ""}
                                onChange={(e) => {
                                  testStore.setMultipleInputData(i, {
                                    ...testStore.inputData,

                                    positive_prompt: e.target.value,
                                  });
                                }}
                              />
                            </Box>
                          </>
                        );
                      })}

                      <Button
                        disabled={testStore.isEngineBusy}
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{
                          height: 60,
                          fontSize: 18,
                          mt: 3,
                        }}
                        onClick={() => {
                          testStore.getMultipleIdentity();
                        }}
                      >
                        {testStore.isEngineBusy ? "Loading..." : "Generate"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <TextField
                        id="test-input-13"
                        placeholder="Positive prompt"
                        multiline
                        rows={5}
                        fullWidth
                        sx={{
                          mb: 1,
                        }}
                        value={testStore.inputData.positive_prompt}
                        onChange={(e) => {
                          testStore.setInputData({
                            ...testStore.inputData,

                            positive_prompt: e.target.value,
                          });
                        }}
                      />

                      <TextField
                        id="test-input-13"
                        placeholder="Negative prompt"
                        multiline
                        rows={5}
                        fullWidth
                        sx={{
                          mb: 1,
                        }}
                        value={testStore.inputData.negative_prompt}
                        onChange={(e) => {
                          testStore.setInputData({
                            ...testStore.inputData,

                            negative_prompt: e.target.value,
                          });
                        }}
                      />

                      <Button
                        disabled={testStore.isEngineBusy}
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{
                          height: 60,
                          fontSize: 18,
                          mt: 3,
                        }}
                        onClick={() => {
                          testStore.getIdentity(commonStore.isDesktop);
                        }}
                      >
                        {testStore.isEngineBusy ? "Loading..." : "Generate"}
                      </Button>
                    </>
                  )}
                </TabPanel>

                <TabPanel value={testStore.engineTesterIndex} index={1}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Engine Type
                    </Typography>

                    <Select
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      value={testStore.inputSloganData.category}
                      onChange={(e) => {
                        testStore.setSloganInputData({
                          ...testStore.inputSloganData,

                          category: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="All">All Engines (3)</MenuItem>
                      <MenuItem value="t5-base-Noise0.25+ep100">
                        t5-base-Noise0.25+ep100
                      </MenuItem>
                      <MenuItem value="t5-base-Noise0.25+ep120">
                        t5-base-Noise0.25+ep120
                      </MenuItem>
                      <MenuItem value="t5-base-Noise0.25+ep140">
                        t5-base-Noise0.25+ep140
                      </MenuItem>
                    </Select>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Number of Sequences
                    </Typography>

                    <TextField
                      id="test-input-01"
                      type="number"
                      value={testStore.inputSloganData.num_sequences}
                      fullWidth
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value < 1 || value > 5) {
                          alert("The value cannot be x < 1 or x > 5.");

                          return;
                        }

                        testStore.setSloganInputData({
                          ...testStore.inputSloganData,

                          num_sequences: e.target.value,
                        });
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <TextField
                    id="test-input-13"
                    placeholder="Prompt"
                    multiline
                    rows={5}
                    fullWidth
                    sx={{
                      mb: 1,
                    }}
                    value={testStore.inputSloganData.prompt}
                    onChange={(e) => {
                      testStore.setSloganInputData({
                        ...testStore.inputSloganData,

                        prompt: e.target.value,
                      });
                    }}
                  />

                  <Button
                    disabled={testStore.isEngineBusy}
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{
                      height: 60,
                      fontSize: 18,
                      mt: 3,
                    }}
                    onClick={() => {
                      testStore.getSloganIdentity(commonStore.isDesktop);
                    }}
                  >
                    {testStore.isEngineBusy ? "Loading..." : "Generate"}
                  </Button>
                </TabPanel>

                <TabPanel value={testStore.engineTesterIndex} index={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Engine Type
                    </Typography>

                    <Select
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      value={"Default"}
                    >
                      <MenuItem value="Default">Stable-Diffusion</MenuItem>
                    </Select>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Number of Images
                    </Typography>

                    <TextField
                      id="test-input-01"
                      type="number"
                      value={testStore.inputImageData.num_images}
                      fullWidth
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value < 1 || value > 10) {
                          alert("The value cannot be x < 1 or x > 10.");

                          return;
                        }

                        testStore.setInputImageData({
                          ...testStore.inputImageData,

                          num_images: e.target.value,
                        });
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Number of Inference Steps
                    </Typography>

                    <TextField
                      id="test-input-02"
                      type="number"
                      value={testStore.inputImageData.num_inference_steps}
                      fullWidth
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value < 1 || value > 150) {
                          alert("The value cannot be x < 1 or x > 150.");

                          return;
                        }

                        testStore.setInputImageData({
                          ...testStore.inputImageData,

                          num_inference_steps: e.target.value,
                        });
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Compression Format
                    </Typography>

                    <Select
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      value={testStore.inputImageData.compression_format}
                      onChange={(e) => {
                        testStore.setInputImageData({
                          ...testStore.inputData,

                          compression_format: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="JPEG">JPG</MenuItem>
                      <MenuItem value="PNG">PNG</MenuItem>
                    </Select>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                    >
                      Image URL
                    </Typography>

                    <TextField
                      id="test-input-03"
                      value={testStore.inputImageData.images}
                      fullWidth
                      onChange={(e) => {
                        testStore.setInputImageData({
                          ...testStore.inputImageData,

                          images: e.target.value,
                        });
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <TextField
                    id="test-input-13"
                    placeholder="Positive prompt"
                    multiline
                    rows={5}
                    fullWidth
                    sx={{
                      mb: 1,
                    }}
                    value={testStore.inputImageData.positive_prompt}
                    onChange={(e) => {
                      testStore.setInputImageData({
                        ...testStore.inputImageData,

                        positive_prompt: e.target.value,
                      });
                    }}
                  />

                  <TextField
                    id="test-input-13"
                    placeholder="Negative prompt"
                    multiline
                    rows={5}
                    fullWidth
                    sx={{
                      mb: 1,
                    }}
                    value={testStore.inputImageData.negative_prompt}
                    onChange={(e) => {
                      testStore.setInputImageData({
                        ...testStore.inputImageData,

                        negative_prompt: e.target.value,
                      });
                    }}
                  />

                  <Button
                    disabled={testStore.isEngineBusy}
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{
                      height: 60,
                      fontSize: 18,
                      mt: 3,
                    }}
                    onClick={() => {
                      testStore.getImageIdentity(commonStore.isDesktop);
                    }}
                  >
                    {testStore.isEngineBusy ? "Loading..." : "Generate"}
                  </Button>
                </TabPanel>
              </Box>
            </Paper>
          </Paper>
        </Container>
      )}
    </>
  ));
}

import * as React from "react";
import Image from "../../common/Image.js";

import { Box, Grid, Pagination, Paper } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

import "./index.css";

export default function Samples(): JSX.Element {
  const { testStore } = React.useContext(AppContext);

  React.useEffect(() => {
    testStore.getSampleData(10, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          width: "100%",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            width: "100%",

            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>Samples</h1>
            <Pagination
              count={testStore.sampleData?.totalPage}
              color="primary"
              onChange={(e, page) => {
                testStore.getSampleData(10, page);
              }}
            />
          </Box>

          <br />

          <Box
            sx={{
              height: "70vh",
              overflowY: "auto",
            }}
          >
            <Grid container spacing={1}>
              {testStore.sampleData?.pagination.map((v: any) => {
                const data = JSON.parse(v.data);

                if (!data.slogan[0]) {
                  data.slogan = [];
                }

                if (!data.coreValue[0]) {
                  data.coreValue = [];
                }

                return (
                  <>
                    <Grid item xs={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 3,
                          mb: 3,
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <h3>{v.email ? v.email : "anonymous"}</h3>
                          <h3>{v.createdAt}</h3>
                        </Box>

                        <br />

                        <table>
                          <tr>
                            <td
                              width={"5%"}
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              구분
                            </td>
                            <td
                              width={"10%"}
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              엔진
                            </td>
                            <td
                              width={"5%"}
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              출력수
                            </td>
                            <td
                              width={"5%"}
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              반복수
                            </td>
                            <td
                              width={"40%"}
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              입력값
                            </td>
                            <td
                              width={"30%"}
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              출력값
                            </td>
                            <td
                              width={"5%"}
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              처리시간
                            </td>
                          </tr>

                          {data.slogan.map((w, j) => {
                            return (
                              <>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    슬로건{j + 1}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    {w.data.model}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    {w.data.num_sequences}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    -
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    {w.data.input}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {w.result.predictions.map((v, i) => (
                                      <div key={i}>- {v}</div>
                                    ))}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    {w.result.ms}초
                                  </td>
                                </tr>
                              </>
                            );
                          })}

                          {data.coreValue.map((w) => {
                            return (
                              <>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    핵심가치
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    {w.data.model}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    {w.data.num_sequences}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    -
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    {w.data.input}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {w.result.predictions.map((v, i) => (
                                      <div key={i}>- {v}</div>
                                    ))}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    {w.result.ms}초
                                  </td>
                                </tr>
                              </>
                            );
                          })}

                          {data.logo.map((w, j) => {
                            return (
                              <>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    로고{j + 1}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                    }}
                                  >
                                    {w.data.category
                                      ? w.data.category
                                      : "Default"}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    {w.data.num_images}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    {w.data.num_inference_steps}
                                  </td>

                                  {w.data.prompt ? (
                                    <td
                                      style={{
                                        fontSize: 12,
                                        textAlign: "center",
                                      }}
                                    >
                                      {w.data.prompt}
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        fontSize: 12,
                                        lineHeight: 1.2,
                                      }}
                                    >
                                      <table
                                        style={{
                                          fontSize: 12,
                                          textAlign: "left",
                                        }}
                                      >
                                        <tr>
                                          <td width="25%">브랜드명</td>
                                          <td width="75%">
                                            {w.data.brand_name}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>브랜드퍼스널리티</td>
                                          <td>{w.data.brand_personality}</td>
                                        </tr>

                                        <tr>
                                          <td>브랜드설명</td>
                                          <td>
                                            {w.data.description
                                              ? w.data.description
                                              : "-"}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>업종</td>
                                          <td>{w.data.industry}</td>
                                        </tr>
                                      </table>
                                    </td>
                                  )}

                                  <td>
                                    <div
                                      style={{
                                        maxWidth: 400,
                                        overflowX: "auto",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          alignItems: "center",
                                        }}
                                      >
                                        {w.result.predictions.map((x) => {
                                          return (
                                            <>
                                              <div
                                                style={{
                                                  textAlign: "right",
                                                  margin: 5,
                                                }}
                                              >
                                                <Image
                                                  src={x}
                                                  width={64}
                                                  height={64}
                                                  alt="로고생성결과이미지"
                                                  onClick={() => {
                                                    window.open(x);
                                                  }}
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 12,
                                      textAlign: "right",
                                    }}
                                  >
                                    {w.result.ms}초
                                  </td>
                                </tr>
                              </>
                            );
                          })}

                          <tr>
                            <td
                              colSpan={7}
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center",
                                padding: 10,
                              }}
                            >
                              사용자 평점: {data?.etc?.rating ?? "-"}/5, 사용자
                              피드백: {data?.etc?.ratingFeedback ?? "-"}
                            </td>
                          </tr>
                        </table>
                      </Paper>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  ));
}

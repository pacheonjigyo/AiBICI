import * as React from "react";
import Image from "../../common/Image.js";

import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";

import { Box, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

SwiperCore.use([Autoplay, Navigation, Pagination, Keyboard, Mousewheel]);

export default function Mockup(): JSX.Element {
  const theme = useTheme();

  const { id } = useParams();
  const { canvasStore, commonStore, engineDataStore, identityDataStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["소개"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    if (!id) {
      return;
    }

    // identityDataStore.getDetailedData(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            height: commonStore.baseInfo.height - 80,
            overflowY: "auto",

            display: "flex",
          }}
        >
          {commonStore.userInfo && identityDataStore.detailedData && (
            <Box
              // maxWidth="md"
              sx={{
                bgcolor: "#ebebeb",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: commonStore.baseInfo.width - 480,
                overflowY: "auto",

                py: 3,
              }}
            >
              {identityDataStore.detailedData.type === "BI" ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      position: "relative",
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-01.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,
                          height: 500,
                        }}
                        alt="목업이미지1"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "60%",
                          left: "33.5%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                          width: 75,
                          height: 75,
                        }}
                        alt="로고이미지"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "51%",
                          left: "65.5%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                          width: 75,
                          height: 75,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-02.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지2"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "64%",
                          left: "32%",
                          transform: "translate(-50%, -50%)",
                          width: 75,
                          height: 75,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "53%",
                          left: "66%",
                          transform: "translate(-50%, -50%)",
                          width: 75,
                          height: 75,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-03.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지3"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "40%",
                          left: "55%",
                          transform:
                            "skew(9.5deg, -22deg) translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                          width: 120,
                          height: 120,
                          marginBottom: 10,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-04.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지4"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "75%",
                          left: "35%",
                          transform: "rotate(0deg) translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                          width: 50,
                          height: 50,
                          marginBottom: 10,
                        }}
                        alt="로고이미지"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "60%",
                          left: "80%",
                          transform: "rotate(0deg) translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                          width: 75,
                          height: 75,
                          marginBottom: 10,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-05.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "48.2%",
                          transform: "rotate(9.3deg) translate(-50%, -50%)",
                          width: 75,
                          height: 75,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-06.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "65%",
                          transform: "translate(-50%, -50%)",
                          width: 125,
                          height: 125,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-07.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "51.5%",
                          left: "37%",
                          transform:
                            "skew(-25deg, 15deg) translate(-50%, -50%)",
                          width: 75,
                          height: 75,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-08.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "52.5%",
                          left: "53.9%",
                          transform:
                            "skew(16deg, -14deg) translate(-50%, -50%)",
                          width: 90,
                          height: 90,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-09.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "37.5%",
                          left: "51.0%",
                          transform:
                            "skew(16deg, -14deg) translate(-50%, -50%)",
                          width: 60,
                          height: 60,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-10.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "45.5%",
                          left: "51.5%",
                          transform:
                            "skew(16deg, -12deg) translate(-50%, -50%)",
                          width: 50,
                          height: 50,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-04.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지1"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          width: 175,
                          height: 175,
                          color: "black",
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform:
                            "perspective(750px) rotateX(0deg) rotateY(45deg) skew(0deg, 7deg) translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-05.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지2"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "52%",
                          left: "34%",
                          transform:
                            "perspective(500px) rotateX(30deg) rotateY(3deg) skew(26deg, -22deg) translate(-50%, -50%)",
                          width: 100,
                          height: 100,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-06.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          width: 200,
                          height: 200,
                          marginBottom: 10,
                          color: "white",
                          position: "absolute",
                          top: "53%",
                          left: "44%",
                          transform:
                            "perspective(250px) rotateX(0deg) rotateY(-5deg) skew(0deg, 5deg) translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-07.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지4"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          width: 150,
                          height: 150,
                          marginBottom: 10,
                          position: "absolute",
                          top: "55%",
                          left: "53.5%",
                          transform:
                            "perspective(300px) rotateX(0deg) rotateY(5deg) skew(1deg, 0deg) translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-08.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "46%",
                          transform: "rotate(23deg) translate(-50%, -50%)",
                          width: 150,
                          height: 150,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-09.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "52%",
                          transform:
                            "perspective(300px) rotateX(0deg) rotateY(5deg) skew(0deg, 2deg) translate(-50%, -50%)",
                          width: 150,
                          height: 150,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-10.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform:
                            "perspective(100px) rotateX(0deg) rotateY(2deg) skew(0deg, -1deg) translate(-50%, -50%)",
                          width: 100,
                          height: 100,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-11.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "51%",
                          left: "52%",
                          transform:
                            "perspective(100px) rotateX(0deg) rotateY(2deg) skew(0deg, 0deg) translate(-50%, -50%)",
                          width: 150,
                          height: 150,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_bi-12.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "65%",
                          left: "47%",
                          rotate: "50deg",
                          transform: "skew(0deg, 0deg) translate(-50%, -50%)",
                          width: 100,
                          height: 100,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 500,
                      my: 3,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 500,
                      }}
                    >
                      <Image
                        src="/resources/mockup_ci-03.jpg"
                        style={{
                          borderRadius: "1em",
                          boxShadow: `0px 3px 7px 0px ${
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)"
                          }`,

                          height: 500,
                        }}
                        alt="목업이미지5"
                      />

                      <Image
                        src={identityDataStore.detailedData.serviceCore.logo}
                        style={{
                          position: "absolute",
                          top: "72%",
                          left: "30%",
                          transform:
                            "perspective(100px) rotateX(10deg) rotateY(00deg) skew(-37deg, 27deg) translate(-50%, -50%)",
                          width: 100,
                          height: 100,
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                        alt="로고이미지"
                      />
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  ));
}

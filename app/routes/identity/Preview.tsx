import * as React from "react";
import Image from "../../common/Image.js";

import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";

import { Box, Paper } from "@mui/material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../stores/index.js";

import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";

SwiperCore.use([Autoplay, Navigation, Pagination, Keyboard, Mousewheel]);

export default function Preview(): JSX.Element {
  const { id } = useParams();
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  const imageRef = React.useRef(null);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    identityDataStore.getDetailedData(id).then(() => {
      document.title = identityDataStore.detailedData.name;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(
    () =>
      identityDataStore.detailedData && (
        <Paper
          sx={{
            background: "#333333",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Swiper
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              loopedSlides={true}
              keyboard={true}
              mousewheel={true}
              scrollbar={{ draggable: true }}
              spaceBetween={1000}
            >
              {identityDataStore.detailedData.type === "BI" ? (
                <>
                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
                        position: "relative",
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
                            borderRadius: "50%",
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
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지2"
                        />

                        <Image
                          ref={imageRef}
                          src={identityDataStore.detailedData.serviceCore.logo}
                          style={{
                            position: "absolute",
                            top: "64%",
                            left: "32%",
                            transform: "translate(-50%, -50%)",
                            width: 75,
                            height: 75,
                            zIndex: 1,
                            borderRadius: 10,
                            opacity: 0.9,
                          }}
                          alt="로고이미지"
                        />

                        <Image
                          ref={imageRef}
                          src={identityDataStore.detailedData.serviceCore.logo}
                          style={{
                            position: "absolute",
                            top: "53%",
                            left: "66%",
                            transform: "translate(-50%, -50%)",
                            width: 75,
                            height: 75,
                            zIndex: 1,
                            borderRadius: 10,
                            opacity: 0.9,
                          }}
                          alt="로고이미지"
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지3"
                        />

                        <Image
                          ref={imageRef}
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
                            borderRadius: 10,
                            marginBottom: 10,
                          }}
                          alt="로고이미지"
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지4"
                        />

                        <Image
                          ref={imageRef}
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
                            borderRadius: "50%",
                            marginBottom: 10,
                          }}
                          alt="로고이미지"
                        />

                        <Image
                          ref={imageRef}
                          src={identityDataStore.detailedData.serviceCore.logo}
                          style={{
                            position: "absolute",
                            top: "60%",
                            left: "80%",
                            transform: "rotate(0deg) translate(-50%, -50%)",
                            zIndex: 1,
                            borderRadius: 10,
                            opacity: 0.9,
                            width: 75,
                            height: 75,
                            marginBottom: 10,
                          }}
                          alt="로고이미지"
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지5"
                        />

                        <Image
                          ref={imageRef}
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
                  </SwiperSlide>
                </>
              ) : (
                <>
                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지2"
                        />

                        <Image
                          ref={imageRef}
                          src={identityDataStore.detailedData.serviceCore.logo}
                          style={{
                            position: "absolute",
                            top: "52%",
                            left: "34%",
                            transform:
                              "perspective(500px) rotateX(30deg) rotateY(3deg) skew(26deg, -20deg) translate(-50%, -50%)",
                            width: 100,
                            height: 100,
                            zIndex: 1,
                            borderRadius: 10,
                            opacity: 0.9,
                          }}
                          alt="로고이미지"
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지"
                        />

                        <Image
                          ref={imageRef}
                          src={identityDataStore.detailedData.serviceCore.logo}
                          style={{
                            width: 200,
                            height: 200,
                            borderRadius: 10,
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
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지4"
                        />

                        <Image
                          ref={imageRef}
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
                            borderRadius: 10,
                            opacity: 0.9,
                          }}
                          alt="로고이미지"
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      background: "transparent",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: commonStore.baseInfo.width,
                        height: commonStore.baseInfo.height,
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
                            height: 500,
                          }}
                          alt="목업이미지5"
                        />

                        <Image
                          ref={imageRef}
                          src={identityDataStore.detailedData.serviceCore.logo}
                          style={{
                            position: "absolute",
                            top: "55%",
                            left: "46%",
                            transform: "rotate(23deg) translate(-50%, -50%)",
                            width: 150,
                            height: 150,
                            zIndex: 1,
                            borderRadius: "50%",
                            opacity: 0.9,
                          }}
                          alt="로고이미지"
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>
                </>
              )}
            </Swiper>
          </Box>
        </Paper>
      ),
  );
}

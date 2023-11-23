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
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../stores/index.js";

import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";

SwiperCore.use([Autoplay, Navigation, Pagination, Keyboard, Mousewheel]);

export default function Website(): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams();
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    commonStore.checkProfile(false).then((res) => {
      {
        if (!res) {
          navigate("/login/user");
        }
      }
    });

    identityDataStore.getDetailedData(id).then(() => {
      document.title = identityDataStore.detailedData.name;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {commonStore.userInfo && identityDataStore.detailedData && (
        <Paper
          sx={{
            width: "100%",
            height: commonStore.baseInfo.height,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",

              zIndex: 2,

              opacity: 0.1,

              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={identityDataStore.detailedData.serviceCore.logo}
              style={{
                height: 256,
                objectFit: "cover",
              }}
            />
          </Box>

          <Swiper
            direction={"vertical"}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            loopedSlides={true}
            keyboard={true}
            mousewheel={true}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <Box
                sx={{
                  background:
                    identityDataStore.detailedData.serviceBasicBrand.colorSHex,
                  color:
                    identityDataStore.detailedData.serviceBasicBrand.colorMHex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: commonStore.baseInfo.height,

                  fontFamily:
                    identityDataStore.detailedData.serviceBasicBrand.fontFamily,
                }}
              >
                <Box
                  sx={{
                    width: 1000,
                  }}
                >
                  <div
                    style={{
                      fontSize: 100,
                    }}
                  >
                    {identityDataStore.detailedData.name}
                  </div>

                  <div
                    style={{
                      fontSize: 48,
                    }}
                  >
                    {identityDataStore.detailedData.industryKor} 전문{" "}
                    {identityDataStore.detailedData.type === "BI"
                      ? "브랜드"
                      : "기업"}
                  </div>
                </Box>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background:
                    identityDataStore.detailedData.serviceBasicBrand.colorSHex,
                  color:
                    identityDataStore.detailedData.serviceBasicBrand.colorMHex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: commonStore.baseInfo.height,

                  fontSize: 40,
                  fontFamily:
                    identityDataStore.detailedData.serviceBasicBrand.fontFamily,

                  px: 10,
                }}
              >
                <Box
                  sx={{
                    width: 1000,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    노하우
                  </div>
                  <br />
                  우리에게는 {`"`}
                  {/* {identityDataStore.detailedData.servicePositioning.featuresKor} */}
                  {`"`} 이라는 특별함이 있습니다.
                </Box>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background:
                    identityDataStore.detailedData.serviceBasicBrand.colorSHex,
                  color:
                    identityDataStore.detailedData.serviceBasicBrand.colorMHex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: commonStore.baseInfo.height,

                  fontSize: 40,
                  fontFamily:
                    identityDataStore.detailedData.serviceBasicBrand.fontFamily,
                  px: 10,
                }}
              >
                <Box
                  sx={{
                    width: 1000,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {identityDataStore.detailedData.serviceCore.slogan}
                  </div>
                  <br />
                  {identityDataStore.detailedData.serviceCommon.story === ""
                    ? "(스토리)"
                    : identityDataStore.detailedData.serviceCommon.story}
                </Box>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background:
                    identityDataStore.detailedData.serviceBasicBrand.colorSHex,
                  color:
                    identityDataStore.detailedData.serviceBasicBrand.colorMHex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: commonStore.baseInfo.height,

                  fontSize: 40,
                  fontFamily:
                    identityDataStore.detailedData.serviceBasicBrand.fontFamily,
                  px: 10,
                }}
              >
                <Box
                  sx={{
                    width: 1000,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    핵심가치
                  </div>
                  <br />
                  <div>
                    {identityDataStore.detailedData.serviceCore.coreValue}
                  </div>
                </Box>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background:
                    identityDataStore.detailedData.serviceBasicBrand.colorSHex,
                  color:
                    identityDataStore.detailedData.serviceBasicBrand.colorMHex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: commonStore.baseInfo.height,

                  fontSize: 40,
                  fontFamily:
                    identityDataStore.detailedData.serviceBasicBrand.fontFamily,
                  px: 10,
                }}
              >
                <Box
                  sx={{
                    width: 1000,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    미션
                  </div>
                  <br />
                  {identityDataStore.detailedData.serviceCommon.mission === ""
                    ? "(미션)"
                    : identityDataStore.detailedData.serviceCommon.mission}
                </Box>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background:
                    identityDataStore.detailedData.serviceBasicBrand.colorSHex,
                  color:
                    identityDataStore.detailedData.serviceBasicBrand.colorMHex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: commonStore.baseInfo.height,

                  fontSize: 40,
                  fontFamily:
                    identityDataStore.detailedData.serviceBasicBrand.fontFamily,
                  px: 10,
                }}
              >
                <Box
                  sx={{
                    width: 1000,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    비전
                  </div>
                  <br />
                  {identityDataStore.detailedData.serviceCommon.vision === ""
                    ? "(비전)"
                    : identityDataStore.detailedData.serviceCommon.vision}
                </Box>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background:
                    identityDataStore.detailedData.serviceBasicBrand.colorSHex,
                  color:
                    identityDataStore.detailedData.serviceBasicBrand.colorMHex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: commonStore.baseInfo.height,

                  fontSize: 40,
                  fontFamily:
                    identityDataStore.detailedData.serviceBasicBrand.fontFamily,
                  px: 10,
                }}
              >
                <Box
                  sx={{
                    width: 1000,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Contact Us
                  </div>
                  <br />
                  Email: {commonStore.userInfo.user.useremail}
                  <br />
                  Phone: {commonStore.userInfo.user.phone_number}
                </Box>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Paper>
      )}
    </>
  ));
}

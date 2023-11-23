import * as React from "react";
import Image from "../../../../common/Image.js";

import { Box, Button, Typography, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { Link as NavLink } from "../../../../common/Link.js";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";

export default function Page7(): JSX.Element {
  const theme = useTheme();
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          backgroundImage:
            theme.palette.mode === "light"
              ? `url('/resources/${
                  commonStore.isDesktop
                    ? "service_detail-04_background.jpg"
                    : commonStore.device === "tablet"
                    ? "service_detail-04_background-tablet.jpg"
                    : "service_detail-04_background-mobile.jpg"
                }')`
              : "unset",
          backgroundSize: "cover",
          backgroundPosition: "bottom",

          height:
            commonStore.device === "desktop"
              ? "auto"
              : commonStore.device === "tablet"
              ? 800
              : "auto",
        }}
      >
        <Box
          sx={{
            pt: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1.2,
              mb: "34px",
            }}
            fontSize={commonStore.isDesktop ? 55 : 40}
            data-aos="fade"
            data-aos-duration={1000}
          >
            {commonStore.appInfo.language === "ko" ? (
              <>
                <span style={{ fontWeight: "bold" }}>
                  브랜드 전략 {commonStore.isDesktop ? null : <br />}
                </span>{" "}
                제공
              </>
            ) : (
              <>
                Delivering
                <br />
                <span style={{ fontWeight: "bold" }}>Brand Strategy</span>{" "}
              </>
            )}
          </Typography>

          <Typography
            sx={{
              color: "#8f8f8f",
              lineHeight: 1.4,
              mb: "34px",
            }}
            fontSize={commonStore.isDesktop ? 20 : 16}
            fontWeight={400}
            data-aos="fade"
            data-aos-duration={1000}
          >
            {commonStore.appInfo.language === "ko" ? (
              <>
                인공지능이 제안하는 브랜드 전략은 물론,
                <br />
                브랜드 전문가가 성공적인 브랜드를 만들 수 있게
                <br />
                1:1 컨설팅 서비스를 제공합니다.
                <br />
                <br />
                최고의 브랜딩솔루션을 받아보세요.
              </>
            ) : (
              <>
                In addition to the brand strategy proposed by artificial
                intelligence,
                <br />
                we provide 1:1 consulting services to help brand experts create
                <br />
                successful brands. Get the best branding solution.
              </>
            )}
          </Typography>

          <Button
            component={NavLink}
            variant="contained"
            href="/branding/artwork"
            sx={{
              fontSize: 18,
              width: 200,
              height: 60,
            }}
            data-aos="fade"
            data-aos-duration={1000}
          >
            {wordList["WORK 보러가기"][commonStore.appInfo.language]}
          </Button>
        </Box>

        <Box
          sx={{
            height: commonStore.isDesktop
              ? commonStore.baseInfo.height - 100
              : 300,
            position: "relative",
          }}
        >
          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/speech_bubble-01.png"
            style={{
              position: "absolute",
              top: "25%",
              left: "34%",
              objectFit: "contain",
              width: commonStore.isDesktop
                ? "350px"
                : commonStore.device === "tablet"
                ? "200px"
                : "150px",
              zIndex: 2,
              transform: "translate(-50%, -50%)",
            }}
            alt="브랜드전략사례이미지1"
          />

          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/speech_bubble-02.png"
            style={{
              position: "absolute",
              top: "38%",
              left: "27%",
              objectFit: "contain",
              width: commonStore.isDesktop
                ? "350px"
                : commonStore.device === "tablet"
                ? "200px"
                : "150px",
              zIndex: 1,
              transform: "translate(-50%, -50%)",
            }}
            alt="브랜드전략사례이미지2"
          />

          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/speech_bubble-03.png"
            style={{
              position: "absolute",
              top: "65%",
              left: "32%",
              objectFit: "contain",
              width: commonStore.isDesktop
                ? "350px"
                : commonStore.device === "tablet"
                ? "200px"
                : "150px",
              zIndex: 1,
              transform: "translate(-50%, -50%)",
            }}
            alt="브랜드전략사례이미지3"
          />

          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/speech_bubble-04.png"
            style={{
              position: "absolute",
              top: "25%",
              right: "30%",
              objectFit: "contain",
              width: commonStore.isDesktop
                ? "350px"
                : commonStore.device === "tablet"
                ? "200px"
                : "150px",
              zIndex: 1,
              transform: "translate(50%, -50%)",
            }}
            alt="브랜드전략사례이미지4"
          />

          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/speech_bubble-05.png"
            style={{
              position: "absolute",
              top: "50%",
              right: "25%",
              objectFit: "contain",
              width: commonStore.isDesktop
                ? "350px"
                : commonStore.device === "tablet"
                ? "200px"
                : "150px",
              zIndex: 2,
              transform: "translate(50%, -50%)",
            }}
            alt="브랜드전략사례이미지5"
          />

          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/speech_bubble-06.png"
            style={{
              position: "absolute",
              top: "63%",
              right: "32%",
              objectFit: "contain",
              width: commonStore.isDesktop
                ? "350px"
                : commonStore.device === "tablet"
                ? "200px"
                : "150px",
              zIndex: 1,
              transform: "translate(50%, -50%)",
            }}
            alt="브랜드전략사례이미지6"
          />
        </Box>
      </Box>
    </>
  ));
}

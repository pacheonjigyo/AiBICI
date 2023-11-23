import * as React from "react";
import Image from "../../../../common/Image.js";

import { Box, Button, Typography, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";

export default function Page8(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          background: theme.palette.mode === "light" ? "#FBDC68" : "unset",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: commonStore.isDesktop ? 520 : 800,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: commonStore.baseInfo.width,
            height: commonStore.isDesktop ? 520 : 800,
            overflow: "hidden",
          }}
        >
          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/pudle_cup.png"
            style={{
              position: "absolute",
              top: commonStore.isDesktop ? 20 : 0,
              left: commonStore.isDesktop ? 0 : -90,
              width: commonStore.isDesktop
                ? "unset"
                : commonStore.device === "tablet"
                ? 400
                : 250,
              height: commonStore.isDesktop
                ? "unset"
                : commonStore.device === "tablet"
                ? 400
                : 250,
            }}
            alt="푸들컵이미지"
          />

          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/pudle_card.png"
            style={{
              position: "absolute",
              top: commonStore.isDesktop
                ? -120
                : commonStore.device === "tablet"
                ? 0
                : 30,
              right: commonStore.isDesktop ? 100 : -70,
              width: commonStore.isDesktop
                ? "unset"
                : commonStore.device === "tablet"
                ? 350
                : 200,
              height: commonStore.isDesktop
                ? "unset"
                : commonStore.device === "tablet"
                ? 350
                : 200,
            }}
            alt="푸들카드이미지"
          />

          <Image
            data-aos="fade-up"
            data-aos-duration={1000}
            src="/resources/pudle_phone.png"
            style={{
              position: "absolute",
              overflow: "hidden",
              top: commonStore.isDesktop
                ? 200
                : commonStore.device === "tablet"
                ? 500
                : 600,
              right: commonStore.isDesktop ? -40 : -50,
              width: commonStore.isDesktop
                ? "unset"
                : commonStore.device === "tablet"
                ? 450
                : 300,
              height: commonStore.isDesktop
                ? "unset"
                : commonStore.device === "tablet"
                ? 450
                : 300,
            }}
            alt="푸들폰이미지"
          />
        </Box>

        <Image
          src={
            theme.palette.mode === "light"
              ? "/resources/logo_black.png"
              : "/resources/logo_white.png"
          }
          style={{ cursor: "pointer", height: commonStore.isDesktop ? 88 : 66 }}
          alt="아비치흑백로고"
          data-aos="fade-in"
          data-aos-duration={1000}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />

        <Typography
          sx={{
            lineHeight: 1.2,
            mt: 3,
            mb: 5,
          }}
          align="center"
          fontSize={commonStore.isDesktop ? 22 : 18}
          fontWeight={500}
          data-aos="fade-in"
          data-aos-duration={1000}
        >
          {commonStore.appInfo.language === "ko" ? (
            <>
              깊고 방대한 데이터 계곡에서 찾아낸
              <br />
              궁극의 브랜드에 대하여 궁금하다면
            </>
          ) : (
            <>
              If you{`'`}re curious about
              <br />
              the ultimate brand found
              <br />
              in a deep and vast data valley
            </>
          )}
        </Typography>

        <Button
          color="info"
          variant="contained"
          sx={{
            fontSize: 18,
            minWidth: 200,
            height: 60,
          }}
          onClick={async () => {
            const url = "/ai-branding/create";

            const result = await commonStore.syncAppInfo(
              commonStore.appInfo.isAdmin,
              true,
              url,
            );

            if (!result) {
              return;
            }

            navigate(url);
          }}
        >
          {wordList["무료로 시작하기"][commonStore.appInfo.language]}
        </Button>
      </Box>
    </>
  ));
}

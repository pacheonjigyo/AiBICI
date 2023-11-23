import * as React from "react";

import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { ParallaxText } from "../../../../common/AutoScroll.js";
import { Link as NavLink } from "../../../../common/Link.js";
import { AppContext } from "../../../../stores/index.js";

export default function Page3(): JSX.Element {
  const theme = useTheme();
  const scrollRef = React.useRef(null);

  const { commonStore, workDataStore } = React.useContext(AppContext);

  React.useEffect(() => {
    workDataStore.getOpenEngineData(9, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          backgroundImage: commonStore.isDesktop
            ? "unset"
            : "url('/resources/background_purple-mobile.jpg')",
          backgroundSize: commonStore.isDesktop ? "unset" : "cover",
          color: "white",
          display: "flex",
          flexDirection: commonStore.isDesktop ? "unset" : "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundImage: commonStore.isDesktop
              ? "url('/resources/background_purple.jpg')"
              : "unset",
            backgroundSize: commonStore.isDesktop ? "cover" : "unset",
            width: commonStore.isDesktop
              ? commonStore.baseInfo.width - 735
              : "100%",
            height: commonStore.isDesktop ? 882 : 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              textAlign: commonStore.isDesktop ? "left" : "center",
            }}
          >
            <Typography
              sx={{
                lineHeight: 1.2,
                mb: "42px",
              }}
              fontSize={18}
            >
              <span style={{ fontWeight: "bold" }}>Overview</span>
            </Typography>

            <Typography
              sx={{
                lineHeight: 1.2,
                mb: "32px",
              }}
              fontSize={commonStore.isDesktop ? 60 : 40}
            >
              {commonStore.appInfo.language === "ko" ? (
                <>
                  <span data-aos="fade" data-aos-duration={1000}>
                    스토리가 담긴
                  </span>
                  <br />
                  <span
                    style={{ fontWeight: "bold" }}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    브랜드 아이덴티티
                  </span>
                  <br />
                  <span data-aos="fade" data-aos-duration={1000}>
                    제공서비스
                  </span>
                </>
              ) : (
                <>
                  <span data-aos="fade" data-aos-duration={1000}>
                    Brand
                  </span>{" "}
                  <span
                    style={{ fontWeight: "bold" }}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    Identity
                  </span>
                  <br />
                  <span data-aos="fade" data-aos-duration={1000}>
                    {commonStore.appInfo.language === "ko" ? (
                      <>Service with story.</>
                    ) : (
                      <>
                        Service
                        <br />
                        with story.
                      </>
                    )}
                  </span>
                </>
              )}
            </Typography>

            <Typography
              sx={{
                lineHeight: 1.4,
                mb: "42px",
              }}
              fontSize={commonStore.isDesktop ? 20 : 16}
              fontWeight={400}
              data-aos="fade"
              data-aos-duration={1000}
            >
              {commonStore.appInfo.language === "ko" ? (
                <>
                  기억에 남는 스토리가 담긴 브랜드를 제공합니다.
                  <br />
                  스토리가 담긴 브랜드 생성 과정을
                  <br />
                  보실 수 있습니다.
                </>
              ) : (
                <>
                  We offer brands with memorable stories.
                  <br />
                  You can see the process of creating a
                  <br />
                  brand with a story.
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
              {commonStore.appInfo.language === "ko"
                ? "WORK 보러가기"
                : "Go To WORK"}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: commonStore.isDesktop ? "absolute" : "unset",
            maxWidth: commonStore.isDesktop ? 750 : "100%",
            height: commonStore.isDesktop ? 400 : 250,
            right: 0,
            overflowX: "hidden",
            mb: 3,
          }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderRightWidth: 1,
              boxShadow: "1px 0px 3px black",
              my: 1,
              mr: 0.2,
            }}
          />

          <section ref={scrollRef}>
            <ParallaxText
              baseVelocity={-2}
              direction={1}
              endOffset={-49.5}
              length={2}
              scrollRef={scrollRef}
            >
              {workDataStore.openEngineData?.pagination.map((v, i) => {
                return (
                  <>
                    <Box
                      key={i}
                      sx={{
                        background: "white",
                        borderRadius: "10px",
                        boxShadow: `0px 3px 7px 0px ${
                          theme.palette.mode === "light"
                            ? "rgba(0,0,0,.1)"
                            : "rgba(255,255,255,.1)"
                        }`,
                        width: commonStore.isDesktop ? 340 : 200,
                        height: commonStore.isDesktop ? 340 : 200,
                        mr: 3,
                      }}
                    >
                      <img
                        src={v.logo}
                        style={{
                          borderRadius: "10px",
                          width: commonStore.isDesktop ? 340 : 200,
                          height: commonStore.isDesktop ? 340 : 200,
                        }}
                        alt={`브랜드이미지${i}`}
                      />
                    </Box>
                  </>
                );
              })}
            </ParallaxText>
          </section>
        </Box>
      </Box>
    </>
  ));
}

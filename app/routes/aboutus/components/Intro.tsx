import * as React from "react";
import Image from "../../../common/Image.js";

import { Box, Container, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { wordList } from "../../../data/words.js";
import { AppContext } from "../../../stores/index.js";

export default function Intro(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
        maxWidth="lg"
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1.2,
              mb: 1,
            }}
            fontSize={commonStore.isDesktop ? 50 : 40}
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            <span style={{ fontWeight: "bold" }}>ABOUT</span>
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.2,
              mb: 5,
            }}
            align="center"
            fontSize={commonStore.isDesktop ? 18 : 16}
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            {
              wordList["AI가 만드는 브랜드 아이덴티티 생성 서비스"][
                commonStore.appInfo.language
              ]
            }
          </Typography>

          <Image
            src="/resources/about_main.jpg"
            style={{
              borderRadius: "1em",
              boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
              width: "100%",
            }}
            alt="ABOUT메인이미지"
          />

          <Typography
            sx={{
              lineHeight: 1.4,
              my: 3,
            }}
            fontSize={commonStore.isDesktop ? 24 : 18}
            fontWeight={400}
            align="left"
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            {commonStore.appInfo.language === "ko" ? (
              <>
                <span style={{ fontWeight: "bold" }}>
                  심도있는
                  <br />
                  생각과 발상으로
                </span>
              </>
            ) : (
              <>
                <span style={{ fontWeight: "bold" }}>
                  With in-depth
                  <br />
                  Thoughts and Ideas
                </span>
              </>
            )}
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.4,
              mb: 3,
            }}
            fontSize={commonStore.isDesktop ? 18 : 16}
            fontWeight={400}
            align="left"
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            {commonStore.appInfo.language === "ko" ? (
              <>
                심도컴퍼니는 심도있는 생각과 발상으로 다양한 분야에서
                크리에이티브 전략을 만들어 내고 있습니다. 주로 브랜드 취득을
                통한 상품화와 사업화를 주로 해왔고 특히, 텍스트를 기반으로한
                브랜드아이덴티티 구축에 일가견이 있어 이 노하우를 여러분들에게
                알려 드리기 위해 이번에 과학적이고 체계적으로 인공지능 브랜드
                아이덴티티 생성 시스템을 구축하였습니다.
              </>
            ) : (
              <>
                SIMDOCOMPANY is creating creative strategies in various fields
                with in-depth thoughts and ideas. We have mainly commercialized
                and commercialized through brand acquisition, and in particular,
                we have established an artificial intelligence brand identity
                creation system to inform you of this know-how.
              </>
            )}
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.4,
              mb: 3,
            }}
            fontSize={commonStore.isDesktop ? 18 : 16}
            fontWeight={400}
            align="left"
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            {commonStore.appInfo.language === "ko" ? (
              <>
                이 시스템은 앞으로 전문광고서비스업의 영역뿐만아니라 다양한
                분야에서 크리에이티브 전략을 제시하는 업무효율도구로서 성공적인
                브랜드와 프로젝트 운영의 성공 파트너가 될 것입니다. 심도컴퍼니는
                항상 여러분 곁에서 최고를 만들어 드리기 위해 노력하겠습니다.
              </>
            ) : (
              <>
                In the future, this system will be a successful partner in brand
                and project operation as a work efficiency tool that presents
                creative strategies in various fields as well as in the area of
                professional advertising services. SIMDOCOMPANY will always work
                hard to make the best for you.
              </>
            )}
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.4,
              mb: 10,
            }}
            fontSize={commonStore.isDesktop ? 18 : 16}
            fontWeight={400}
            align="left"
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            {commonStore.appInfo.language === "ko" ? (
              <>
                좋은 제품은 브랜드에서 나온다는 신념으로 항상 좋은 브랜드를
                만들기위해 노력하고 있습니다. 심도컴퍼니만의 노하우를 담은
                인공지능 브랜드아이덴티티 생성 엔진인 {"'"}AIBICI{"'"}를 통해
                여러분의 브랜드를 만들어보고 경험해보세요.
              </>
            ) : (
              <>
                I always try to make a good brand with the belief that good
                products come from brands. Create and experience your brand
                through AIBICI, an artificial intelligence brand identity
                creation engine that contains the know-how of SIMDOCOMPANY.
              </>
            )}
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.4,
              mb: 3,
            }}
            fontSize={commonStore.isDesktop ? 24 : 18}
            fontWeight={400}
            align="left"
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            <span style={{ fontWeight: "bold" }}>
              {wordList["비전"][commonStore.appInfo.language]}
            </span>
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.4,
            }}
            fontSize={commonStore.isDesktop ? 18 : 16}
            fontWeight={400}
            align="left"
            data-aos="fade-in"
            data-aos-duration={1000}
          >
            {commonStore.appInfo.language === "ko"
              ? "미래 AI 기술 및 브랜드 컨설팅 분야를 선도하는 기업"
              : "Leading Future AI Technology and Brand Consulting"}
          </Typography>
        </Box>
      </Container>
    </>
  ));
}

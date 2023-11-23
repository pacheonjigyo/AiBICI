import * as React from "react";

import {
  Box,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export function BrandingMenu(): JSX.Element {
  const { commonStore, engineDataStore } = React.useContext(AppContext);

  const [intro, setIntro] = React.useState(false);

  const [naming, setNaming] = React.useState(false);
  const [namingCreate, setNamingCreate] = React.useState(true);

  const [story, setStory] = React.useState(false);
  const [mission, setMission] = React.useState(false);
  const [missionCreate, setMissionCreate] = React.useState(false);

  const [vision, setVision] = React.useState(false);
  const [essense, setEssense] = React.useState(false);
  const [slogan, setSlogan] = React.useState(false);
  const [coreValue, setCoreValue] = React.useState(false);
  const [color, setColor] = React.useState(false);
  const [font, setFont] = React.useState(false);
  const [logo, setLogo] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const [trade, setTrade] = React.useState(false);
  const [challenge, setChallenge] = React.useState(false);
  const [persona, setPersona] = React.useState(false);
  const [interior, setInterior] = React.useState(false);
  const [packaging, setPackaging] = React.useState(false);
  const [benchmark, setBenchmark] = React.useState(false);

  const handleIntro = () => {
    window.location.href = "/ai-branding/create#/intro-main";

    setIntro(!intro);
  };

  const handleNaming = () => {
    window.location.href = "/ai-branding/create#/naming-main";

    setNaming(!naming);
  };

  const handleNamingCreate = () => {
    window.location.href = "/ai-branding/create#/naming-create";

    setNamingCreate(!namingCreate);
  };

  const handleStory = () => {
    window.location.href = "/ai-branding/create#/story-main";

    setStory(!story);
  };

  const handleMission = () => {
    window.location.href = "/ai-branding/create#/mission-main";

    setMission(!mission);
  };

  const handleMissionCreate = () => {
    window.location.href = "/ai-branding/create#/mission-goals";

    setMissionCreate(!missionCreate);
  };

  const handleVision = () => {
    window.location.href = "/ai-branding/create#/vision-main";

    setVision(!vision);
  };

  const handleEssense = () => {
    window.location.href = "/ai-branding/create#/essense-main";

    setEssense(!essense);
  };

  const handleSlogan = () => {
    window.location.href = "/ai-branding/create#/slogan-main";

    setSlogan(!slogan);
  };

  const handleCoreValue = () => {
    window.location.href = "/ai-branding/create#/corevalue-main";

    setCoreValue(!coreValue);
  };

  const handleLogo = () => {
    window.location.href = "/ai-branding/create#/logo-main";

    setLogo(!logo);
  };

  const handleColor = () => {
    window.location.href = "/ai-branding/create#/color-main";

    setColor(!color);
  };

  const handleFont = () => {
    window.location.href = "/ai-branding/create#/font-main";

    setFont(!font);
  };

  const handleMarketing = () => {
    window.location.href = "/ai-branding/create#/marketing-main";

    setMarketing(!marketing);
  };

  const handleTrade = () => {
    window.location.href = "/ai-branding/create#/trade-main";

    setTrade(!trade);
  };

  const handleChallenge = () => {
    window.location.href = "/ai-branding/create#/challenge-main";

    setChallenge(!challenge);
  };

  const handlePersona = () => {
    window.location.href = "/ai-branding/create#/persona-main";

    setPersona(!persona);
  };

  const handleInterior = () => {
    window.location.href = "/ai-branding/create#/interior-main";

    setInterior(!interior);
  };

  const handlePackaging = () => {
    window.location.href = "/ai-branding/create#/package-main";

    setPackaging(!packaging);
  };

  const handleBenchmark = () => {
    window.location.href = "/ai-branding/create#/benchmark-main";

    setBenchmark(!benchmark);
  };

  return (
    <Box
      className="hideScroll"
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1,

        width: 300,
        height: commonStore.baseInfo.height - 164,

        overflowY: "auto",

        zIndex: 1000,
      }}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     바로가기
        //   </ListSubheader>
        // }
      >
        <ListItem disablePadding onClick={handleIntro}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="시작하기" />
            </Typography>

            {Math.round((engineDataStore.getCount() * 100) / 7) === 100 ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={intro} timeout="auto" unmountOnExit>
          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-form";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="제공 형태" />
              </Typography>

              {engineDataStore.brandInfo.type ? (
                <Chip
                  size="small"
                  label={<Language label="완료됨" />}
                  color="success"
                  sx={{ ml: 1 }}
                />
              ) : (
                <Chip
                  size="small"
                  label={<Language label="미설정" />}
                  color="default"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-produce";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="제품 종류" />
              </Typography>

              {engineDataStore.brandInfo.form ? (
                <Chip
                  size="small"
                  label={<Language label="완료됨" />}
                  color="success"
                  sx={{ ml: 1 }}
                />
              ) : (
                <Chip
                  size="small"
                  label={<Language label="미설정" />}
                  color="default"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-special";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="특장점" />
              </Typography>

              {engineDataStore.brandInfo.description ? (
                <Chip
                  size="small"
                  label={<Language label="완료됨" />}
                  color="success"
                  sx={{ ml: 1 }}
                />
              ) : (
                <Chip
                  size="small"
                  label={<Language label="미설정" />}
                  color="default"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-mission";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="목표" />
              </Typography>

              {engineDataStore.brandInfo.dream ? (
                <Chip
                  size="small"
                  label={<Language label="완료됨" />}
                  color="success"
                  sx={{ ml: 1 }}
                />
              ) : (
                <Chip
                  size="small"
                  label={<Language label="미설정" />}
                  color="default"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-memory";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="이미지" />
              </Typography>

              {engineDataStore.brandInfo.image ? (
                <Chip
                  size="small"
                  label={<Language label="완료됨" />}
                  color="success"
                  sx={{ ml: 1 }}
                />
              ) : (
                <Chip
                  size="small"
                  label={<Language label="미설정" />}
                  color="default"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-image";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="키워드" />
              </Typography>

              {engineDataStore.brandInfo.keyword ? (
                <Chip
                  size="small"
                  label={<Language label="완료됨" />}
                  color="success"
                  sx={{ ml: 1 }}
                />
              ) : (
                <Chip
                  size="small"
                  label={<Language label="미설정" />}
                  color="default"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleNaming}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="네이밍" />
            </Typography>

            {engineDataStore.brandInfo.name ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={naming} timeout="auto" unmountOnExit>
          <ListItem
            onClick={handleNamingCreate}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="네이밍 작성 가이드" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <Collapse in={namingCreate} timeout="auto" unmountOnExit>
            <ListItem
              onClick={() => {
                window.location.href =
                  "/ai-branding/create#/naming-method-number";
              }}
              sx={{
                p: 0,
                pl: 4,
              }}
            >
              <ListItemButton>
                <Typography fontSize={14}>
                  <Language label="숫자 활용하기" />
                </Typography>
              </ListItemButton>
            </ListItem>
          </Collapse>

          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/naming-wordlist";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="단어장" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleVision}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="비전" />
            </Typography>

            {engineDataStore.brandInfo.vision ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={vision} timeout="auto" unmountOnExit>
          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/vision-ideal";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="이상향" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/vision-tour";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="둘러보기" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleMission}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="미션" />
            </Typography>

            {engineDataStore.brandInfo.mission ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={mission} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={handleMissionCreate}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="중·장기목표" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <Collapse in={missionCreate} timeout="auto" unmountOnExit>
            <ListItem
              sx={{
                p: 0,
                pl: 4,
              }}
              onClick={() => {
                window.location.href = "/ai-branding/create#/mission-needs";
              }}
            >
              <ListItemButton>
                <Typography fontSize={14}>
                  <Language label="존재이유" />
                </Typography>
              </ListItemButton>
            </ListItem>

            <ListItem
              sx={{
                p: 0,
                pl: 4,
              }}
              onClick={() => {
                window.location.href = "/ai-branding/create#/mission-story";
              }}
            >
              <ListItemButton>
                <Typography fontSize={14}>
                  <Language label="탄생배경" />
                </Typography>
              </ListItemButton>
            </ListItem>
          </Collapse>
        </Collapse>

        <ListItem disablePadding onClick={handleStory}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="스토리" />
            </Typography>

            {engineDataStore.brandInfo.story ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={story} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-identity";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="브랜드 아이덴티티" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-three";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="스토리 구성요소" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-formula";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="스토리텔링 공식" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-solution";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="결핍과 해결구조" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-detail";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="사연" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleEssense}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="에센스" />
            </Typography>

            {engineDataStore.brandInfo.essense ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={essense} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/essense-reason";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="존재이유" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleSlogan}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="슬로건" />
            </Typography>

            {engineDataStore.brandInfo.slogan ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={slogan} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/slogan-value";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="제품을 통해 얻는 것" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleCoreValue}>
            <Typography fontSize={14}>
              <Language label="핵심가치" />
            </Typography>

            {engineDataStore.brandInfo.coreValue ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={coreValue} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/corevalue-attitude";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="제품이 가지는 마음가짐" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleColor}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="색상" />
            </Typography>

            {engineDataStore.brandInfo.color.main.hex &&
            engineDataStore.brandInfo.color.sub.hex ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleFont}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="서체" />
            </Typography>

            {engineDataStore.brandInfo.fontFamily ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleLogo}>
          <ListItemButton>
            <Typography fontSize={14}>
              <Language label="로고" />
            </Typography>

            {engineDataStore.brandInfo.logo ? (
              <Chip
                size="small"
                label={<Language label="완료됨" />}
                color="success"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                size="small"
                label={<Language label="미설정" />}
                color="default"
                sx={{ ml: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={logo} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/logo-auto";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="자동 생성" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/logo-sketch";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="스케치기반 생성" />
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/logo-upload";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="이미지기반 생성" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleBenchmark}>
          <ListItemButton disabled>
            <Typography fontSize={14}>
              <Language label="벤치마킹" />
            </Typography>

            <Chip
              size="small"
              label="Comming Soon"
              color="info"
              sx={{ ml: 1 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handlePersona}>
          <ListItemButton disabled>
            <Typography fontSize={14}>
              <Language label="페르소나" />
            </Typography>

            <Chip
              size="small"
              label="Comming Soon"
              color="info"
              sx={{ ml: 1 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleInterior}>
          <ListItemButton disabled>
            <Typography fontSize={14}>
              <Language label="인테리어" />
            </Typography>

            <Chip
              size="small"
              label="Comming Soon"
              color="info"
              sx={{ ml: 1 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handlePackaging}>
          <ListItemButton disabled>
            <Typography fontSize={14}>
              <Language label="패키지" />
            </Typography>

            <Chip
              size="small"
              label="Comming Soon"
              color="info"
              sx={{ ml: 1 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleMarketing}>
          <ListItemButton disabled>
            <Typography fontSize={14}>
              <Language label="마케팅" />
            </Typography>

            <Chip
              size="small"
              label="Comming Soon"
              color="info"
              sx={{ ml: 1 }}
            />
          </ListItemButton>
        </ListItem>

        {/* <Collapse in={marketing} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
            onClick={() => {
              window.location.href = "/ai-branding/create#/marketing-campaign";
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                <Language label="캠페인" />
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse> */}

        {/* <ListItem disablePadding onClick={handleTrade}>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>거래소</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={trade} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>지갑 만들기 - 블록체인</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>NFT 등록하기 - NFT</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleChallenge}>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>창업도전</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={challenge} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>창업도전 가이드</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse> */}
      </List>
    </Box>
  );
}

import * as React from "react";
import SymbolSettingModal from "../../../../layout/modal/SymbolSettingModal.js";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { emotions } from "../../../../data/emotions.js";
import { materials } from "../../../../data/materials.js";
import { AppContext } from "../../../../stores/index.js";

export default function QuestSymbol(): JSX.Element {
  const { commonStore, engineDataStore } = React.useContext(AppContext);

  const scrollRef1 = React.useRef(null);
  const scrollRef2 = React.useRef(null);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: commonStore.baseInfo.height - 110,
          position: "relative",
        }}
        data-aos="fade-in"
        data-aos-duration={1000}
      >
        <Typography
          sx={{ fontWeight: "normal", mb: 3 }}
          align="center"
          fontSize={commonStore.isDesktop ? 36 : 24}
        >
          {commonStore.appInfo.language === "ko" ? (
            <>
              {`<`}
              {engineDataStore.brandInfo.name}
              {`>`}하면 <span style={{ fontWeight: "bold" }}>무엇</span>이
              {commonStore.isDesktop ? " " : <br />}
              떠오르나요?
            </>
          ) : (
            <>
              If there is a symbol of the {engineDataStore.brandInfo.identity},
              {commonStore.isDesktop ? " " : <br />}Please{" "}
              <span style={{ fontWeight: "bold" }}>describe</span> it.
            </>
          )}
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            borderColor: "divider",

            width: 700,
            p: 3,
          }}
        >
          <Typography
            fontSize={18}
            fontWeight={"bold"}
            sx={{
              mb: 1,
            }}
          >
            1. 떠오르는 분위기를 모두 선택해주세요. (복수 선택 가능)
          </Typography>

          {emotions.map((v, i) => {
            return (
              <Button
                disabled={Boolean(engineDataStore.brandInfo.disableEmotion)}
                color={
                  JSON.parse(engineDataStore.brandInfo.emotion).includes(
                    v.value,
                  )
                    ? "secondary"
                    : "inherit"
                }
                variant="contained"
                size="small"
                key={i}
                children={
                  commonStore.appInfo.language === "ko" ? v.nameKor : v.name
                }
                sx={{
                  m: 1,
                  rotate: `${(i * 2) % 6}deg`,
                  fontSize: 14,
                }}
                onClick={() => {
                  let emotion = JSON.parse(engineDataStore.brandInfo.emotion);

                  if (emotion.includes(v.value)) {
                    emotion = emotion.filter((w) => w !== v.value);
                  } else {
                    emotion.push(v.value);
                  }

                  engineDataStore.setBrandInfo({
                    ...engineDataStore.brandInfo,

                    emotion: JSON.stringify(emotion),
                  });
                }}
              />
            );
          })}
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            mt: 3,
            mb: 1,

            borderColor: "divider",

            width: 700,
            p: 3,
          }}
        >
          <Typography
            fontSize={18}
            fontWeight={"bold"}
            sx={{
              mb: 1,
            }}
          >
            2. 로고 방식을 선택해주세요. (하나만 선택 가능)
          </Typography>

          {materials.map((v, i) => {
            return (
              <Button
                disabled={Boolean(engineDataStore.brandInfo.disableMaterial)}
                color={
                  JSON.parse(engineDataStore.brandInfo.material).includes(
                    v.value,
                  )
                    ? "secondary"
                    : "inherit"
                }
                variant="contained"
                size="small"
                key={i}
                children={
                  commonStore.appInfo.language === "ko" ? v.nameKor : v.name
                }
                sx={{ m: 1, rotate: `${(i * 2) % 4}deg`, fontSize: 14 }}
                onClick={() => {
                  engineDataStore.setBrandInfo({
                    ...engineDataStore.brandInfo,

                    material: JSON.stringify([v.value]),
                  });
                }}
              />
            );
          })}
        </Paper>

        <Box
          sx={{
            position: "absolute",

            bottom: 0,
            left: 0,

            background: "#ebebeb",
            width: "100%",
          }}
        >
          <Typography
            fontSize={24}
            sx={{
              p: 1,
            }}
            align="center"
          >
            {engineDataStore.brandInfo.emotion === "[]" &&
            engineDataStore.brandInfo.material === "[]" ? (
              "아래의 키워드를 선택해서 문장을 완성해보세요."
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {JSON.parse(engineDataStore.brandInfo.emotion)
                  .map((v) => {
                    return emotions.find((w) => w.value === v)?.nameKor;
                  })
                  .join("/")}{" "}
                {
                  materials.find(
                    (v) =>
                      v.value ===
                      JSON.parse(engineDataStore.brandInfo.material)[0],
                  )?.nameKor
                }
              </Box>
            )}
          </Typography>
        </Box>
      </Box>

      <SymbolSettingModal />
    </>
  ));
}

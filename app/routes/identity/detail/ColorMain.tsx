import * as React from "react";

import { Box, Button, Divider, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { hexToRgb } from "../../../common/Functions.js";
import { Language } from "../../../common/Language.js";
import { wordList } from "../../../data/words.js";
import { AppContext } from "../../../stores/index.js";
import { ColorRGBType } from "../../../types.js";

export default function ColorMain(): JSX.Element {
  const { commonStore, engineDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,

          p: 2,

          display: "flex",
          alignItems: "center",

          width: 300,
          height: 50,
        }}
      >
        <Typography fontSize={15} fontWeight="bold">
          9. <Language label="색상" />
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1,

          bgcolor: "background.paper",
          borderRadius: 1,

          p: 2,

          width: 300,
          height: commonStore.baseInfo.height - 164,
        }}
      >
        <Typography>
          브랜드 컬러는 특정 브랜드가 선택한 고유한 색상이며, 브랜드의 시각적
          정체성을 형성해요.
          <br />
          <br />
          이는 로고, 패키지, 광고 등 브랜드의 모든 시각적 요소에 적용되요.
          <br />
          <br />
          브랜드 컬러는 소비자들에게 강렬하고 일관된 브랜드 이미지를 제공하며,
          감정적 연결과 브랜드 식별성을 강화하는 데 중요한 역할을 해요.
          <br />
          <br />
          특정 색상은 브랜드가 전달하려는 감정이나 메시지를 강조하는 데 사용될
          수 있어요.
        </Typography>

        <Box
          sx={{
            mt: 3,

            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 100,
            }}
          >
            <Typography fontSize={14}>
              메인 {wordList["색상"][commonStore.appInfo.language]}
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                id="swatch"
                className="small"
                style={{
                  marginBottom: 8,
                }}
              >
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={engineDataStore.brandInfo.color.main.hex}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const rgb: ColorRGBType | null = hexToRgb(e.target.value);

                    if (!rgb) {
                      return;
                    }

                    engineDataStore.setBrandInfo({
                      ...engineDataStore.brandInfo,

                      color: {
                        ...engineDataStore.brandInfo.color,

                        main: {
                          hex: e.target.value,
                          rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
                        },
                      },
                    });
                  }}
                />
              </div>

              <Typography
                sx={{
                  ml: 3,
                }}
              >
                {engineDataStore.brandInfo.color.main.hex}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 100,
            }}
          >
            <Typography fontSize={14}>
              보조 {wordList["색상"][commonStore.appInfo.language]}
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div id="swatch" className="small">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={engineDataStore.brandInfo.color.sub.hex}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const rgb: ColorRGBType | null = hexToRgb(e.target.value);

                    if (!rgb) {
                      return;
                    }

                    engineDataStore.setBrandInfo({
                      ...engineDataStore.brandInfo,

                      color: {
                        ...engineDataStore.brandInfo.color,

                        sub: {
                          hex: e.target.value,
                          rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
                        },
                      },
                    });
                  }}
                />
              </div>

              <Typography
                sx={{
                  ml: 3,
                }}
              >
                {engineDataStore.brandInfo.color.sub.hex}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/font-main";
          }}
        >
          서체 설정하기
        </Button>
      </Box>
    </>
  ));
}

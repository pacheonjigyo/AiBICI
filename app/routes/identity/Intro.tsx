import * as React from "react";
import Image from "../../common/Image.js";

import { ExitToApp } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../stores/index.js";

import { Box, IconButton, Typography } from "@mui/material";
import { BigButton } from "../../common/BigButton.js";
import { Language } from "../../common/Language.js";
import { Token } from "../../common/Token.js";

export default function Intro(): JSX.Element {
  const navigate = useNavigate();
  const { commonStore, testStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          width: commonStore.baseInfo.width,
          height: 60,

          bgcolor: "background.paper",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          p: 3,
        }}
      >
        <Image
          src="/resources/logo_white.png"
          height={33}
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        />

        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ExitToApp />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.default",
            width: 350,
            height: commonStore.baseInfo.height - 60,

            pl: 3,
            py: 3,
          }}
        ></Box>

        <Box
          sx={{
            bgcolor: "background.default",

            width: commonStore.baseInfo.width - 700,
            height: commonStore.baseInfo.height - 60,

            position: "relative",

            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              width: "100%",
              height: commonStore.baseInfo.height - 194,

              p: 3,
            }}
          >
            <Box>
              <Typography fontSize={36}>
                <Language label="시작 전 확인해주세요!" />
              </Typography>

              <br />
              <br />

              <Typography fontSize={18}>
                <Language label="브랜드 생성 설명" />
              </Typography>

              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  width: 300,
                }}
              >
                <Typography color="text.secondary" fontSize={18}>
                  <Language label="소요 시간" />
                </Typography>

                <Typography
                  color="text.secondary"
                  fontSize={18}
                  sx={{
                    ml: 3,
                  }}
                >
                  <Language label="약 10분" />
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  width: 300,
                }}
              >
                <Typography color="text.secondary" fontSize={18}>
                  <Language label="완료 보상" />
                </Typography>

                <Token
                  sx={{
                    ml: 3,
                  }}
                  value={10}
                />
              </Box>
            </Box>

            <Box
              style={{
                animation: "rotate 30s ease 0s infinite normal forwards",
              }}
            >
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/book-5596349-4665465.png?f=webp" />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              width: "100%",
              height: 134,

              p: 3,
            }}
          >
            <BigButton
              color="secondary"
              variant="contained"
              fullWidth
              onClick={async () => {
                const url = `/ai-branding/create`;

                const result = await commonStore.syncAppInfo(
                  commonStore.appInfo.isAdmin,
                  true,
                  url,
                );

                if (!result) {
                  return;
                }

                window.location.href = url;
              }}
            >
              <Language label="브랜드 생성 내용을 확인하였습니다." />
            </BigButton>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: "background.default",
            width: 350,
            height: commonStore.baseInfo.height - 60,

            p: 3,
          }}
        ></Box>
      </Box>
    </>
  ));
}

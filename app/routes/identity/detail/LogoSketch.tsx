import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";
import DrawScreen from "../../ai-branding/create/sketch/Screen.js";

export default function LogoSketch(): JSX.Element {
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
          11-2. <Language label="스케치기반 생성" />
        </Typography>
      </Box>

      <Box
        className="hideScroll"
        sx={{
          mt: 1,

          bgcolor: "background.paper",
          borderRadius: 1,

          p: 2,

          width: 300,
          height: commonStore.baseInfo.height - 164,

          overflowY: "auto",
        }}
      >
        <Typography
          sx={{
            mb: 3,
          }}
        >
          지금까지 입력한 내용과 스케치한 그림을 반영하여 로고를 생성해드려요.
        </Typography>

        <DrawScreen />

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/logo-auto";
          }}
        >
          자동 생성 살펴보기
        </Button>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/logo-upload";
          }}
        >
          이미지기반 생성 살펴보기
        </Button>
      </Box>
    </>
  ));
}

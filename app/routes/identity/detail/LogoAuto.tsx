import * as React from "react";

import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function LogoAuto(): JSX.Element {
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
          11-1. <Language label="자동 생성" />
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
          지금까지 입력한 내용을 바탕으로 로고를 자동으로 생성해드려요.
        </Typography>

        <Typography
          sx={{
            mt: 3,
            mb: 1,
          }}
        >
          타입
        </Typography>

        <ButtonGroup fullWidth variant="contained">
          <Button
            disabled
            color={
              JSON.parse(engineDataStore.brandInfo.material).includes("initial")
                ? "secondary"
                : "primary"
            }
            onClick={() => {
              engineDataStore.setBrandInfo({
                ...engineDataStore.brandInfo,

                type: "Product",
              });
            }}
          >
            이니셜
          </Button>

          <Button
            color={
              JSON.parse(engineDataStore.brandInfo.material).includes("vector")
                ? "secondary"
                : "primary"
            }
            onClick={() => {
              engineDataStore.setBrandInfo({
                ...engineDataStore.brandInfo,

                material: JSON.stringify(["vector"]),
              });
            }}
          >
            벡터
          </Button>
        </ButtonGroup>

        <Typography
          sx={{
            mt: 3,
            mb: 1,
          }}
        >
          스타일
        </Typography>

        <ButtonGroup fullWidth variant="contained">
          <Button
            color={
              JSON.parse(engineDataStore.brandInfo.emotion).includes("soft")
                ? "secondary"
                : "primary"
            }
            onClick={() => {
              engineDataStore.setBrandInfo({
                ...engineDataStore.brandInfo,

                emotion: JSON.stringify(["soft"]),
              });
            }}
          >
            부드럽게
          </Button>

          <Button
            color={
              JSON.parse(engineDataStore.brandInfo.emotion).includes(
                "intricate",
              )
                ? "secondary"
                : "primary"
            }
            onClick={() => {
              engineDataStore.setBrandInfo({
                ...engineDataStore.brandInfo,

                emotion: JSON.stringify(["intricate"]),
              });
            }}
          >
            복잡하게
          </Button>
        </ButtonGroup>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/logo-main";

            engineDataStore.getIdentity(null, false, "all", false);
          }}
        >
          생성하기
        </Button>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/logo-sketch";
          }}
        >
          스케치기반 생성 살펴보기
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

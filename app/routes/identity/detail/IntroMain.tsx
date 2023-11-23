import * as React from "react";

import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IntroMain(): JSX.Element {
  const { commonStore, engineStore, engineDataStore } =
    React.useContext(AppContext);

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
          1. <Language label="시작하기" />
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
        <Typography>
          <Language label="1-0" />
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>제공 형태</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-form";
            }}
          >
            자세히보기
          </Button>
        </Box>

        <ButtonGroup fullWidth variant="contained">
          <Button
            color={
              engineDataStore.brandInfo.type === "Product"
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
            제품
          </Button>

          <Button
            color={
              engineDataStore.brandInfo.type === "Service"
                ? "secondary"
                : "primary"
            }
            onClick={() => {
              engineDataStore.setBrandInfo({
                ...engineDataStore.brandInfo,

                type: "Service",
              });
            }}
          >
            서비스
          </Button>
        </ButtonGroup>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>제품/서비스 종류</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-produce";
            }}
          >
            자세히보기
          </Button>
        </Box>

        <TextField
          id="intro-special-input"
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.form}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              form: e.target.value,
            });
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>특장점</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-special";
            }}
          >
            자세히보기
          </Button>
        </Box>

        <TextField
          id="intro-description-input"
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.description}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              description: e.target.value,
            });
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>목표</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-mission";
            }}
          >
            자세히보기
          </Button>
        </Box>

        <TextField
          id="intro-dream-input"
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.dream}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              dream: e.target.value,
            });
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>이미지</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-memory";
            }}
          >
            자세히보기
          </Button>
        </Box>

        <TextField
          id="intro-image-input"
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.symbols}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              symbols: e.target.value,
            });
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>키워드</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-image";
            }}
          >
            자세히보기
          </Button>
        </Box>

        <TextField
          id="intro-keyword-input"
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.keyword}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              keyword: e.target.value,
            });
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>업종</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-image";
            }}
          >
            자세히보기
          </Button>
        </Box>

        <TextField
          id="intro-keyword-input"
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.industry["Industry Ko"]}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              industry: {
                Industry: e.target.value,
                "Industry Ko": e.target.value,
              },
            });
          }}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/naming-main";
          }}
        >
          네이밍 하러 가기
        </Button>
      </Box>
    </>
  ));
}

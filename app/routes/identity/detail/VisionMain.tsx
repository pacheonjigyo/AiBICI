import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function VisionMain(): JSX.Element {
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
          3. <Language label="비전" />
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
          브랜드 비전은 브랜드 플랫폼을 구성하는 가장 핵심적인 내용으로 기업이
          현재와 미래의 고객, 투자자, 내부 종사자, 부품 납품업체 등 모든 이해
          관계자들에게 장기적으로 제공하려는 브랜드의 미래 핵심 가치 체계를
          말해요.
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
          <Typography>브랜드 비전</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/vision-create";
            }}
          >
            작성가이드
          </Button>
        </Box>

        <TextField
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.vision}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              vision: e.target.value,
            });
          }}
        />

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/vision-tour";
          }}
        >
          주변 브랜드 둘러보기
        </Button>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/mission-main";
          }}
        >
          미션 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

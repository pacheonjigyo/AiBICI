import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function SloganValue(): JSX.Element {
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
          7-1. <Language label="제품을 통해 얻는 것" />
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
        <Typography
          sx={{
            mb: 1,
          }}
        >
          브랜드 제품을 통해 얻을 수 있는 것은 특유의 품질과 성능, 브랜드의
          이미지와 가치에 대한 신뢰, 그리고 소비자 경험의 향상이에요.
          <br />
          <br />
          브랜드 제품은 소비자에게 특별한 가치 제안과 독특한 스타일을 제공하며,
          브랜드의 신뢰성은 소비자에게 안정감을 제공해요.
          <br />
          <br />
          또한, 브랜드 제품을 통해 소비자는 브랜드와의 감정적 연결을 형성하며
          자아 정체성 표현의 수단으로 활용할 수 있어요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/slogan-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function EssenseReason(): JSX.Element {
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
          6-1. <Language label="존재이유" />
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
          브랜드의 존재이유는 소비자들에게 고유한 가치와 식별성을 제공하여 제품
          또는 서비스를 차별화하고자 함에 있어요.
          <br />
          <br />
          이를 통해 소비자들은 브랜드를 특정 가치나 품질, 경험과 연관지어
          신뢰하고, 브랜드 선택을 통해 자아 정체성을 표현하거나 특정한
          라이프스타일을 추구하게 되어요.
          <br />
          <br />
          브랜드의 강점은 긍정적인 경험과 감정적 연결을 통해 소비자 충성도를
          구축하고, 이는 장기적인 성공과 시장에서의 우위를 유지하는데 결정적인
          역할을 해요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/essense-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

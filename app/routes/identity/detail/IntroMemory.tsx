import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IntroMemory(): JSX.Element {
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
          1-5. <Language label="이미지" />
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
          브랜드 이미지는 소비자들이 특정 브랜드에 대해 가지는 인식과 인상을
          나타내요.
          <br />
          <br />
          이는 브랜드의 로고, 색상, 디자인, 광고, 제품, 서비스, 경험 등을 통해
          형성되며, 소비자의 마음에 브랜드에 대한 긍정적이거나 부정적인 감정을
          조성할 수 있어요.
          <br />
          <br />
          브랜드 이미지는 브랜드가 전달하고자 하는 가치와 메시지를 반영하며,
          소비자와의 감정적 연결과 신뢰를 형성하는 데 큰 역할을 해요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/intro-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

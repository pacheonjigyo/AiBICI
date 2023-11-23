import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IntroSpecial(): JSX.Element {
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
          1-3. <Language label="특장점" />
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
          브랜드의 특장점은 독특하고 뚜렷한 가치 제안, 높은 품질과 성능, 혁신성,
          고객 서비스, 그리고 긍정적인 브랜드 경험에 기반해요.
          <br />
          <br />
          이는 브랜드가 다른 경쟁사들과 차별화되는 핵심적인 특성으로, 소비자에게
          브랜드의 독특한 가치와 장점을 명확하게 전달하여 브랜드 선택의 이유를
          제시해요.
          <br />
          <br />
          특장점은 브랜드의 강점을 강조하고 소비자들에게 지속적으로 긍정적인
          인상을 심어줌으로써 브랜드의 경쟁력을 높이는 역할을 해요.
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

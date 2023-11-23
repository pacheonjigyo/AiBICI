import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../../stores/index.js";

export default function BenchmarkMain(): JSX.Element {
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
          12. 벤치마킹
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
          브랜드 벤치마킹은 한 기업이나 브랜드가 다른 성공적인 기업이나 브랜드를
          모델로 삼아 그들의 경험과 전략을 참고하여 자신의 성과를 향상시키는
          것을 말해요.
          <br />
          <br />
          즉, 어떤 분야에서 성공을 거둔 기업의 전략, 프로세스, 제품, 서비스 등을
          학습하고 적용함으로써 자신의 경쟁력을 강화하려는 전략적인 접근
          방식이에요.
        </Typography>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/persona-main";
          }}
        >
          페르소나 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

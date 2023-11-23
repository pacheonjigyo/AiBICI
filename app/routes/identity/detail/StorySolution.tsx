import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function StorySolution(): JSX.Element {
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
          5-4. <Language label="결핍과 해결구조" />
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
          브랜드 결핍과 해결구조는 소비자의 니즈와 브랜드가 제공하는 가치 사이의
          간극을 의미해요.
          <br />
          <br />
          브랜드는 소비자의 문제를 인식하고 이를 해결하기 위한 독특한 가치
          제안을 제시하여 결핍을 해소하고자 해요.
          <br />
          <br />
          이를 통해 브랜드는 소비자들과의 긍정적인 관계를 형성하며, 브랜드에
          대한 신뢰와 충성도를 구축해요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/story-create";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

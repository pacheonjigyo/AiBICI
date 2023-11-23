import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IntroImage(): JSX.Element {
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
          1-6. <Language label="키워드" />
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
          브랜드 키워드는 특정 브랜드를 나타내고 강조하기 위해 선택된 중요한
          단어나 구문이에요.
          <br />
          <br />
          이는 브랜드의 핵심 가치, 특징, 미션, 또는 브랜드가 소비자에게
          전달하려는 메시지를 대표하는 단어들을 포함해요.
          <br />
          <br />
          효과적인 브랜드 키워드는 소비자들에게 강력한 인상을 심어주고 브랜드의
          식별성을 강조해요.
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

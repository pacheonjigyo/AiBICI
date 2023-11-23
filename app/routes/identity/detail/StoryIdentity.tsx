import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function StoryIdentity(): JSX.Element {
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
          5-1. <Language label="브랜드 아이덴티티" />
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
          브랜드 아이덴티티는 브랜드의 독특한 특징, 가치, 목표, 스타일, 미션
          등을 종합적으로 나타내는 것이에요.
          <br />
          <br />
          이는 브랜드가 소비자에게 어떻게 보이고 느껴지는지를 정의하며, 브랜드의
          존재 이유와 고유성을 명확하게 전달하여 소비자와의 긍정적인 연결을
          형성해요.
          <br />
          <br />
          아이덴티티는 로고, 색상, 문구, 이미지 등을 통해 시각적으로 구현되며,
          소비자에게 브랜드의 본질을 기억할 수 있는 강력한 인상을 남겨요.
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

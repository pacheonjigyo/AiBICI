import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function StoryThree(): JSX.Element {
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
          5-2. <Language label="스토리 구성요소" />
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
          브랜드 스토리의 핵심 3요소는 인물, 배경, 사건이에요.
          <br />
          <br />1{")"} 인물
          <br />
          브랜드의 주인공으로서 강력한 특징과 가치를 대표해요.
          <br />
          <br />2{")"} 배경
          <br />
          브랜드의 기원과 유래를 담고 있어요.
          <br />
          <br />3{")"} 사건
          <br />
          브랜드와 소비자 간의 감동적이고 기억에 남는 상호 작용을 통해 브랜드
          아이덴티티를 강조해요.
          <br />
          <br />이 3가지는 브랜드 스토리텔링을 통해 소비자들과의 강력한 연결을
          형성하고 브랜드를 독특하게 만들어요.
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

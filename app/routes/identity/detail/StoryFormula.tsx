import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function StoryFormula(): JSX.Element {
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
          5-3. <Language label="스토리텔링 공식" />
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
          브랜드 스토리텔링의 핵심은 소재, 메시지, 편집이에요.
          <br />
          <br />1{")"} 소재
          <br />
          브랜드의 고유성과 가치를 담아요.
          <br />
          <br />2{")"} 메시지
          <br />
          소비자에게 전달하고자 하는 핵심 가치를 나타내요.
          <br />
          <br />3{")"} 편집
          <br />
          이를 감동적이고 효과적으로 전달하기 위한 구조와 플로우를 조절해요.
          <br />
          <br />이 세 가지는 강력한 브랜드 스토리를 만들어내고 소비자들과의
          긍정적인 상호 작용을 형성하는 데 중요한 역할을 해요.
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

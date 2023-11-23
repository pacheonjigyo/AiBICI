import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function StoryDetail(): JSX.Element {
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
          5-5. <Language label="사연" />
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
          브랜드 사연은 브랜드의 과거와 현재를 연결하는 이야기로, 브랜드의 기원,
          발전, 도전, 성공 등을 담고 있어요.
          <br />
          <br />
          이를 통해 브랜드의 독특한 아이덴티티와 가치, 그리고 소비자와의 감정적
          연결을 강화해요.
          <br />
          <br />
          브랜드 사연은 소비자들에게 브랜드와의 공감과 이해를 제공하여 긍정적인
          브랜드 경험을 형성하는 데에 중요한 역할을 해요.
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

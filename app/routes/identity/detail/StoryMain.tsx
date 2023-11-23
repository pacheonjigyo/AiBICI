import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function StoryMain(): JSX.Element {
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
          5. <Language label="스토리" />
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
          브랜드 스토리는 브랜드의 기원, 가치, 목적, 그리고 브랜드가
          소비자들에게 전하려는 메시지를 담은 이야기를 의미해요.
          <br />
          <br />
          이는 브랜드가 고객과 상호작용하며 브랜드와 소비자 간의 감정적 연결을
          형성하고자 하는 데 사용되고 있어요.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>브랜드 스토리</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-create";
            }}
          >
            작성가이드
          </Button>
        </Box>

        <TextField
          multiline
          rows={3}
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.story}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              story: e.target.value,
            });
          }}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/essense-main";
          }}
        >
          에센스 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

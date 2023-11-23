import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function NamingMain(): JSX.Element {
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
          2. <Language label="네이밍" />
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
          브랜드 네이밍은 새로운 제품, 서비스, 기업 등에게 이름을 부여하는
          과정을 의미해요.
          <br />
          <br />
          이는 브랜드의 정체성과 가치를 반영하고, 소비자들에게 긍정적이고 기억에
          남는 인상을 전달하기 위한 중요한 마케팅 활동이에요.
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
          <Typography>브랜드명</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/naming-create";
            }}
          >
            작성가이드
          </Button>
        </Box>

        <TextField
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.name}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              name: e.target.value,
            });
          }}
        />

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/naming-wordlist";
          }}
        >
          단어장
        </Button>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/vision-main";
          }}
        >
          비전 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

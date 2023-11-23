import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function CoreValueMain(): JSX.Element {
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
          8. <Language label="핵심가치" />
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
          브랜드 핵심가치는 브랜드가 추구하는 가치 중에서 가장 중요하게 여기는
          핵심적인 가치나 원칙을 나타내요.
          <br />
          <br />
          이는 브랜드의 정체성을 형성하고 브랜드가 소비자들에게 전달하고자 하는
          메시지와 목적을 정의하는데 사용되고 있어요.
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
          <Typography>브랜드 핵심가치</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/corevalue-attitude";
            }}
          >
            작성가이드
          </Button>
        </Box>

        <TextField
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.coreValue}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              coreValue: e.target.value,
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
            window.location.href = "/ai-branding/create#/color-main";
          }}
        >
          컬러 설정하기
        </Button>
      </Box>
    </>
  ));
}

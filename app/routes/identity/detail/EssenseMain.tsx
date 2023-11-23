import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function EssenseMain(): JSX.Element {
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
          6. <Language label="에센스" />
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
          브랜드 에센스는 브랜드의 본질적이고 핵심적인 특징이자 가치를 나타내는
          개념이에요.
          <br />
          <br />
          이는 브랜드가 고유하게 가지고 있는 특유의 정체성과 소비자에게
          전달하고자 하는 깊은 의미를 포괄하는 용어에요.
          <br />
          <br />
          브랜드 에센스는 브랜드가 소비자의 마음 속에 남는 인상과 연결되며,
          브랜드의 유일성과 차별성을 강조하는 역할을 하고 있어요.
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
          <Typography>브랜드 에센스</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/essense-reason";
            }}
          >
            작성가이드
          </Button>
        </Box>

        <TextField
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.essense}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              essense: e.target.value,
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
            window.location.href = "/ai-branding/create#/slogan-main";
          }}
        >
          슬로건 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

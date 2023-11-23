import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function SloganMain(): JSX.Element {
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
          7. <Language label="슬로건" />
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
          브랜드 슬로건은 간결하고 기억하기 쉬운 문구로 구성된 문장이나 구호로,
          브랜드의 핵심 가치, 메시지, 미션, 또는 제품의 특징을 강조하는 역할을
          하는 문구에요.
          <br />
          <br />
          슬로건은 브랜드의 정체성을 강조하고 소비자에게 감성적인 인상을
          심어줌으로써 브랜드와 소비자 간의 연결을 강화하는 데에 중요한 역할을
          해요.
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
          <Typography>브랜드 슬로건</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/slogan-value";
            }}
          >
            작성가이드
          </Button>
        </Box>

        <TextField
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.slogan}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              slogan: e.target.value,
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
            window.location.href = "/ai-branding/create#/corevalue-main";
          }}
        >
          핵심가치 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function MissionMain(): JSX.Element {
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
          4. <Language label="미션" />
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
          브랜드 미션은 기업이나 조직의 핵심 가치, 목적, 그리고 그들이 추구하는
          사회적인 미래 상태에 대한 짧고 명확한 선언이에요.
          <br />
          <br />
          브랜드 미션은 조직이 왜 존재하는지, 어떤 가치를 제공하고자 하는지를
          나타내요.
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
          <Typography>브랜드 미션</Typography>
          <Button
            color="info"
            onClick={() => {
              window.location.href = "/ai-branding/create#/mission-goals";
            }}
          >
            작성가이드
          </Button>
        </Box>

        <TextField
          size="small"
          fullWidth
          value={engineDataStore.brandInfo.mission}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              mission: e.target.value,
            });
          }}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/story-main";
          }}
        >
          스토리 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

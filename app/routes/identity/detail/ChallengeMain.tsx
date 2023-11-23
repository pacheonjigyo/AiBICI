import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function ChallengeMain(): JSX.Element {
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
          16. <Language label="창업도전" />
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
        <Typography>Comming Soon</Typography>

        <Button
          disabled
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/challenge-main";
          }}
        >
          시작하기
        </Button>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/overview";
          }}
        >
          메인화면으로 이동
        </Button>
      </Box>
    </>
  ));
}

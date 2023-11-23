import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function PersonaMain(): JSX.Element {
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
          13. <Language label="페르소나" />
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
          브랜드 페르소나는 특정 제품이나 브랜드를 대표하는 가상의 인물이나 고객
          그룹을 나타내는 마케팅 도구에요.
          <br />
          <br />
          이는 마케터들이 제품이나 브랜드의 목표 시장에 대해 더 깊이 이해하고,
          그들의 필요와 선호도에 맞추어 마케팅 전략을 개발하는 데 도움을 주고
          있어요.
        </Typography>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/interior-main";
          }}
        >
          인테리어 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

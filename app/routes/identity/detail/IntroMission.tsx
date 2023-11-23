import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IntroMission(): JSX.Element {
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
          1-4. <Language label="목표" />
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
          브랜드가 추구하는 바는 고유한 가치와 아이덴티티를 강조하며, 소비자에게
          독특하고 긍정적인 브랜드 경험을 제공하는 것이에요.
          <br />
          <br />
          이를 통해 브랜드는 시장에서 차별화되어 돋보이고, 소비자들에게 감동과
          만족을 전달하여 브랜드 충성도를 증진하고자 해요.
          <br />
          <br />
          브랜드는 지속적인 혁신과 소비자와의 긍정적 상호 작용을 통해 더 나은
          제품과 서비스를 제공하며, 사회적 책임과 지속 가능성에도 주목하고
          있어요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/intro-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

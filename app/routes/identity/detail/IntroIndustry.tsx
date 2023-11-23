import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IntroIndustry(): JSX.Element {
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
          1-7. <Language label="업종" />
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
          브랜드 업종은 특정 기업이나 브랜드가 속한 산업이나 업종을 나타내요.
          <br />
          <br />
          각 업종은 고유한 특성과 경쟁 환경을 가지며, 특정 제품이나 서비스를
          고객에게 제공하는 공통된 분야를 나타내요.
          <br />
          <br />
          예를 들어, 음식점, 의류, 기술, 여행 등 다양한 업종이 있으며, 브랜드는
          해당 업종에서 자체적인 경쟁 전략과 아이덴티티를 갖춰 소비자들과
          경쟁해요.
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

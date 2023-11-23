import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function MarketingMain(): JSX.Element {
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
          16. <Language label="마케팅" />
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
          브랜드 마케팅은 특정 브랜드의 가치를 강조하고 소비자들에게 브랜드에
          대한 긍정적인 인식을 형성하도록 하는 전략적인 마케팅 접근 방식을
          의미해요.
          <br />
          <br />
          이는 제품이나 서비스를 판매하는 것뿐만 아니라, 브랜드 전체에 대한
          인식과 경험을 조성하며, 소비자들이 브랜드를 기억하고 선호하게 만드는
          것을 목표로 하고 있어요.
        </Typography>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
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

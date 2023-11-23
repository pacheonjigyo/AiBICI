import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function VisionIdeal(): JSX.Element {
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
          3-1. <Language label="이상향" />
        </Typography>
      </Box>

      <Box
        className="hideScroll"
        sx={{
          mt: 1,

          bgcolor: "background.paper",
          borderRadius: 1,

          p: 2,

          width: 300,
          height: commonStore.baseInfo.height - 164,

          overflowY: "auto",
        }}
      >
        <Typography
          sx={{
            mb: 1,
          }}
        >
          브랜드 이상향은 브랜드가 소비자 마음 속에서 차지하는 가치나 긍정적인
          인식 정도를 나타내요.
          <br />
          <br />
          즉, 브랜드 이상향은 소비자들이 특정 브랜드를 어떻게 인식하고
          평가하는지에 대한 측정이에요.
          <br />
          <br />
          이는 그 브랜드의 이름, 로고, 제품, 서비스 등이 소비자에게 얼마나
          긍정적이고 가치 있게 느껴지느냐를 의미해요.
          <br />
          <br />
          브랜드 이상향은 기업이 브랜드를 관리하고 강화하는 데 중요한 역할을
          해요.
          <br />
          <br />
          긍정적인 브랜드 이상향은 소비자들에게 더 많은 가치를 제공하고,
          제품이나 서비스에 대한 신뢰를 구축하여 장기적인 성공에 기여해요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            mb: 1,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/vision-create";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

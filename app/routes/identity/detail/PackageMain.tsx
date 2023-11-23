import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function PackageMain(): JSX.Element {
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
          15. <Language label="패키지" />
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
          브랜드 패키지는 제품이나 서비스의 브랜딩을 시각적, 구조적, 그리고
          전략적으로 담당하는 디자인 및 전략적인 요소들의 집합체를 의미해요.
          <br />
          <br />
          이는 제품이나 서비스를 소비자에게 전달할 때 사용되는 포장물, 레이블,
          로고, 색상, 글꼴 등의 디자인과 함께 브랜드의 메시지, 가치, 정체성을
          나타내는 중요한 역할을 하고 있어요.
        </Typography>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/marketing-main";
          }}
        >
          마케팅 준비하기
        </Button>
      </Box>
    </>
  ));
}

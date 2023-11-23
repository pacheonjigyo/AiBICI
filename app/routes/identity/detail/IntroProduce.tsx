import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IntroProduce(): JSX.Element {
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
          1-2. <Language label="제품 종류" />
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
        <Typography>
          1{")"} 브랜드 제품종류
          <br />
          <br />
          브랜드 제품종류는 특정 브랜드가 제공하는 다양한 제품들의 범주를
          의미해요.
          <br />
          <br />
          이는 의류, 신발, 액세서리부터 가전제품, 전자제품, 식품, 음료 등 여러
          카테고리에 걸쳐 다양하게 있어요.
          <br />
          <br />
          브랜드는 이를 통해 소비자들에게 다양한 라이프스타일과 필요에 맞는
          제품을 제공함으로써 시장에서의 경쟁력을 높이고자 해요.
          <br />
          <br />2{")"} 브랜드 서비스종류
          <br />
          <br />
          브랜드 서비스종류는 특정 브랜드가 제공하는 다양한 서비스들의 범주를
          나타내요.
          <br />
          <br />
          이는 고객 서비스, 유지보수, 컨설팅, 배송 서비스 등 다양한 형태로
          나타날 수 있어요.
          <br />
          <br />
          브랜드는 제품 외에도 높은 서비스 품질을 제공하여 고객 경험을
          향상시키고, 브랜드와의 긍정적인 연결을 형성함으로써 고객 충성도를
          증진하고자 해요.
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

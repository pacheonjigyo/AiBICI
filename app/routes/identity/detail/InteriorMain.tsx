import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function InteriorMain(): JSX.Element {
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
          14. <Language label="인테리어" />
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
          브랜드 인테리어는 브랜드의 아이덴티티, 가치, 메시지를 시각적으로
          전달하고 강화하기 위해 디자인된 인테리어 디자인을 말해요.
          <br />
          <br />
          즉, 공간의 내부 디자인이나 장식이 특정 브랜드의 정체성과 일치하도록
          구성되는 것을 의미해요.
          <br />
          <br />
          이를 통해 소비자에게 브랜드에 대한 독특한 경험을 제공하고 브랜드
          메시지를 강조하는 데 기여하고 있어요.
        </Typography>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/package-main";
          }}
        >
          패키지 만들러가기
        </Button>
      </Box>
    </>
  ));
}

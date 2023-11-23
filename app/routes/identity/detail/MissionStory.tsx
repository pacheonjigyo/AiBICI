import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function MissionStory(): JSX.Element {
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
          4-1-2. <Language label="탄생배경" />
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
        <Typography
          sx={{
            mb: 1,
          }}
        >
          브랜드의 탄생배경은 기업이나 제품이 특정한 가치, 목표, 혹은 비전을
          가지고 소비자에게 독특하게 소통하려는 노력에서 비롯되어요.
          <br />
          <br />
          이는 경쟁적인 시장에서 차별화를 이끌고 소비자들에게 강력한 인상을
          남기기 위함이며, 고유한 브랜드 아이덴티티를 구축하여 시장에서의 입지를
          강화하기 위한 전략적인 움직임으로 볼 수 있어요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/mission-goals";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

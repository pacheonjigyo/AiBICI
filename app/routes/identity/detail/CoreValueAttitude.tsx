import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function CoreValueAttitude(): JSX.Element {
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
          8-1. <Language label="제품이 가지는 마음가짐" />
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
          제품이 비전, 미션, 슬로건, 에센스를 이루기 위해 가져야 할 마음가짐은
          열정, 헌신, 창의성, 그리고 지속가능성이에요.
          <br />
          <br />
          이를 통해 제품은 브랜드의 목표와 가치를 반영하며 소비자들과의 강력한
          연결을 형성할 수 있어요.
          <br />
          <br />
          열정과 헌신은 제품을 향상시키고 지속적인 혁신을 이끌며, 창의성은
          독특한 아이덴티티를 형성해요.
          <br />
          <br />
          또한, 지속가능성은 환경과 사회적 책임을 고려하여 제품을 개발하고
          제공하는 데 필수적이에요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/corevalue-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

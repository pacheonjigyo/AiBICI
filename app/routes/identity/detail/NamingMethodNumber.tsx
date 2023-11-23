import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function NamingMethodNumber(): JSX.Element {
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
          2-1-1. <Language label="숫자 활용하기" />
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
          숫자활용기법은 브랜드 네이밍에서 숫자를 창의적으로 활용하는 기법을
          의미해요.
          <br />
          <br />
          이를 통해 브랜드에 독특하고 기억에 남는 특징을 부여할 수 있어요.
        </Typography>

        <Typography
          sx={{
            mt: 3,
          }}
        >
          11번가, 3CE, 에잇세컨즈 등이 있어요.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/naming-create";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

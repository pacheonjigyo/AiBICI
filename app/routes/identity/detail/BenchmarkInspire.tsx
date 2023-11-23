import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../../stores/index.js";

export default function BenchmarkInspire(): JSX.Element {
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
          12-4. 영감얻기
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
        <Typography>Comming Soon</Typography>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/benchmark-main";
          }}
        >
          완료
        </Button>
      </Box>
    </>
  ));
}

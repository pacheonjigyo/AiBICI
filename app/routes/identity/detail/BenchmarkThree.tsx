import * as React from "react";

import { Box, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../../stores/index.js";

export default function BenchmarkThree(): JSX.Element {
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
          12-2. 경쟁사
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
      </Box>
    </>
  ));
}

import * as React from "react";

import { Box, Container, useTheme } from "@mui/material";

import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../stores/index.js";

export default function Opening(): JSX.Element {
  const theme = useTheme();

  const navigate = useNavigate();

  const { commonStore, workDataStore } = React.useContext(AppContext);

  React.useEffect(() => {
    workDataStore.getOpenEngineData(9, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Container
        maxWidth="lg"
        sx={{
          width: commonStore.baseInfo.width,
        }}
      >
        <Box
          sx={{
            borderRadius: "1rem",

            mb: 50,
          }}
        ></Box>
      </Container>
    </>
  ));
}

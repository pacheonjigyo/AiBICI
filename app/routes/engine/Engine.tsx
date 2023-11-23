import * as React from "react";

import { Box, useTheme } from "@mui/material";

import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Engine(): JSX.Element {
  const theme = useTheme();

  const { id } = useParams();
  const { commonStore, workDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["템플릿"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    if (!id) {
      return;
    }

    workDataStore.getDetailedOpenEngineData(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          my: 16,
        }}
      >
        {workDataStore.detailedOpenEngineData && (
          <Box
            sx={{
              width: "100%",
            }}
          ></Box>
        )}
      </Box>
    </>
  ));
}

import * as React from "react";
import ImageCreateModal from "../../../layout/modal/ImageCreateModal.js";

import { Box, Container, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../../common/Language.js";
import { usePageEffect } from "../../../core/page.js";
import NoticeModal from "../../../layout/modal/NoticeModal.js";
import { AppContext } from "../../../stores/index.js";

export default function Funding(): JSX.Element {
  const navigate = useNavigate();

  const {
    commonStore,
    libraryDataStore,
    identityDataStore,
    boardStore,
    workDataStore,
  } = React.useContext(AppContext);

  usePageEffect({
    title: "프로필",
  });

  React.useEffect(() => {
    workDataStore.getOpenEngineData(10, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {workDataStore.openEngineData && (
        <>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: commonStore.isDesktop ? "row" : "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Container maxWidth="lg">
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        <Language label="창업 도전중인 브랜드" />
                      </Typography>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Box>
          </Box>
        </>
      )}

      <ImageCreateModal />
      <NoticeModal />
    </>
  ));
}

import * as React from "react";

import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { getLocaleTime } from "../../../../common/Functions.js";
import { Link as NavLink } from "../../../../common/Link.js";
import { AppContext } from "../../../../stores/index.js";

export default function Details(): JSX.Element {
  const { commonStore, boardStore } = React.useContext(AppContext);
  const { id } = useParams();

  React.useEffect(() => {
    if (!id) {
      return;
    }

    boardStore.getBoardDetailed(id, "info");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 5,
        }}
        maxWidth="lg"
      >
        <Box
          sx={{
            maxWidth: 1200,
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: commonStore.isDesktop ? "row" : "column",
                justifyContent: "space-between",
                alignItems: commonStore.isDesktop ? "center" : "left",
              }}
            >
              <Typography
                sx={{
                  lineHeight: 1.2,
                  my: 1,
                }}
                align="left"
                fontSize={commonStore.isDesktop ? 36 : 24}
              >
                <span style={{ fontWeight: "bold" }}>
                  {boardStore.boardNewsDetailed?.title ?? ""}
                </span>
              </Typography>

              <Box>
                <Typography
                  sx={{
                    lineHeight: 1.6,
                    my: 1,
                  }}
                  align={commonStore.isDesktop ? "right" : "left"}
                  color="#666"
                >
                  by{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {boardStore.boardNewsDetailed?.author ?? ""}
                  </span>
                  <br />{" "}
                  <span>
                    {getLocaleTime(
                      boardStore.boardNewsDetailed?.updatedAt ?? "",
                    )}
                  </span>
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                my: 3,
              }}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: boardStore.boardNewsDetailed?.content ?? "",
              }}
            />
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mt: 3,
          }}
        >
          <Chip
            label={<>{boardStore.boardNewsDetailed?.hit}</>}
            icon={<RemoveRedEye />}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              href="/branding/info"
              component={NavLink}
              variant="contained"
              color="inherit"
              sx={{
                fontSize: commonStore.isDesktop ? 18 : 14,
                width: commonStore.isDesktop ? 200 : 100,
                height: 60,
              }}
            >
              뒤로가기
            </Button>
            &nbsp;
            <Button
              variant="contained"
              sx={{
                fontSize: commonStore.isDesktop ? 18 : 14,
                width: commonStore.isDesktop ? 200 : 100,
                height: 60,
              }}
              onClick={() => {
                alert(
                  commonStore.appInfo.language === "ko"
                    ? "아직 사용할 수 없는 기능입니다."
                    : "Not yet available.",
                );
              }}
            >
              공유하기
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  ));
}

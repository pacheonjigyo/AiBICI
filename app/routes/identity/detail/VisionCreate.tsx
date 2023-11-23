import * as React from "react";

import { Box, Button, List, ListItemButton, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function VisionCreate(): JSX.Element {
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
          3-1. <Language label="비전 작성 가이드" />
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
            mb: 3,
          }}
        >
          브랜드 비전을 작성할 때, 미래의 목표와 가치를 명확하게 표현하세요.
          <br />
          <br />
          독특하고 도전적인 목표를 설정하며, 소비자와의 긍정적인 영향을
          강조하세요.
          <br />
          <br />
          간결하고 강력한 문구로 브랜드의 핵심 가치와 목표를 표현하여 직관적으로
          이해될 수 있도록 하세요.
        </Typography>

        <Typography>브랜드 비전 작성 기법:</Typography>

        <List>
          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/vision-ideal";
            }}
          >
            1{")"} 이상향
          </ListItemButton>
        </List>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            mb: 1,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/vision-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

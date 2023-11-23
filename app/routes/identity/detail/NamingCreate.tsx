import * as React from "react";

import { Box, Button, List, ListItemButton, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function NamingCreate(): JSX.Element {
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
          2-1. <Language label="네이밍 작성 가이드" />
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
        <Typography
          sx={{
            mb: 3,
          }}
        >
          브랜드 네이밍 방법은 창의성, 목표 시장 고려, 발음의 용이성, 문화적
          연관성 등을 고려하는 것이에요.
          <br />
          <br />
          의미전달, 감정 호소, 기억력 강화를 목적으로 하며, 간결하고 외우기 쉬운
          이름을 선택하는 것이 중요해요.
        </Typography>

        <Typography>다양한 브랜드 네이밍 기법:</Typography>

        <List>
          <ListItemButton
            color="secondary"
            onClick={() => {
              window.location.href =
                "/ai-branding/create#/naming-method-number";
            }}
          >
            1{")"} 숫자활용기법
          </ListItemButton>
        </List>

        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/naming-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

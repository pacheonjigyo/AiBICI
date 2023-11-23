import * as React from "react";

import { Box, Button, List, ListItemButton, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function MissionGoals(): JSX.Element {
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
          4-1. <Language label="중·장기목표" />
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
          브랜드의 중장기 목표는 지속적인 성장과 소비자들에게 높은 가치를
          제공하여 긍정적인 브랜드 이상향을 유지하는 데 있어요.
          <br />
          <br />
          이를 위해 브랜드는 제품 혁신, 고객 경험 개선, 지속 가능한 비즈니스
          모델 채택 등을 통해 긍정적인 소비자 감정과 신뢰를 구축하며, 동시에
          시장에서의 차별화를 강화하는 전략을 추구해요.
          <br />
          <br />
          중장기 목표는 브랜드의 지속 가능성을 확보하고, 긍정적인 브랜드
          이미지를 통해 고객 충성도를 향상시키는 것에 집중해요.
        </Typography>

        <Typography>브랜드 비전 작성 기법:</Typography>

        <List>
          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/mission-needs";
            }}
          >
            1{")"} 존재이유
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/mission-story";
            }}
          >
            2{")"} 탄생배경
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
            window.location.href = "/ai-branding/create#/mission-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

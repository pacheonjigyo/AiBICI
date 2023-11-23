import * as React from "react";

import { Box, Button, List, ListItemButton, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function StoryCreate(): JSX.Element {
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
          5-1. <Language label="스토리 작성 가이드" />
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
          브랜드 스토리를 작성할 때, 브랜드의 기원과 열정을 강조하는 것이
          중요해요.
          <br />
          <br />
          고유하고 감동적인 경험을 포함하며, 소비자들에게 브랜드와의 감정적
          연결을 제공하는 이야기를 풀어가세요.
          <br />
          <br />
          중심 주제와 가치를 강조하고, 인간적이고 현실적인 측면을 강조하여
          소비자들이 공감할 수 있는 스토리를 만들어내세요.
        </Typography>

        <Typography>브랜드 스토리 작성 기법:</Typography>

        <List>
          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-identity";
            }}
          >
            1{")"} 브랜드 아이덴티티
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-three";
            }}
          >
            2{")"} 스토리 3요소
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-formula";
            }}
          >
            3{")"} 스토리텔링 공식
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-solution";
            }}
          >
            4{")"} 결핍과 해결구조
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              window.location.href = "/ai-branding/create#/story-detail";
            }}
          >
            5{")"} 사연
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
            window.location.href = "/ai-branding/create#/story-main";
          }}
        >
          <Language label="확인" />
        </Button>
      </Box>
    </>
  ));
}

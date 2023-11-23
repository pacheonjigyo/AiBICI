import * as React from "react";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { fontList } from "../../../data/fontList.js";
import { AppContext } from "../../../stores/index.js";

export default function FontMain(): JSX.Element {
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
          10. <Language label="서체" />
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
        <Typography>
          브랜드 서체는 특정 브랜드가 채택한 고유한 글꼴 또는 서체 스타일을
          나타내요.
          <br />
          <br />
          로고, 광고, 포장 등 브랜드의 시각적 표현에 사용되며, 브랜드의
          아이덴티티와 스타일을 강조해요.
          <br />
          <br />
          특별한 서체 선택은 브랜드의 고유성을 부각시키고 소비자에게 브랜드를
          기억하기 쉽게 만들어요.
          <br />
          <br />
          서체는 브랜드가 전달하고자 하는 메시지와 느낌을 강조하는 데에 큰
          역할을 해요.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography>브랜드 서체</Typography>
        </Box>

        <RadioGroup
          value={engineDataStore.brandInfo.fontFamily}
          onChange={(e) => {
            engineDataStore.setBrandInfo({
              ...engineDataStore.brandInfo,

              fontFamily: e.target.value,
            });
          }}
        >
          {fontList.map((v: any, i: number) => {
            return (
              <Box key={i}>
                <FormControlLabel
                  value={v.value}
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: v.value,
                      }}
                    >
                      {engineDataStore.brandInfo.name
                        ? engineDataStore.brandInfo.name
                        : v.name}
                    </Typography>
                  }
                />
              </Box>
            );
          })}
        </RadioGroup>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
          onClick={() => {
            window.location.href = "/ai-branding/create#/logo-main";
          }}
        >
          로고 만들러 가기
        </Button>
      </Box>
    </>
  ));
}

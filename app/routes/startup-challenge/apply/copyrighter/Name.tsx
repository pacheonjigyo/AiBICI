import * as React from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../../../stores/index.js";

export default function QuestName(): JSX.Element {
  const { commonStore, engineDataStore, engineStore } =
    React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: commonStore.baseInfo.height - 110,
        }}
        data-aos="fade-in"
        data-aos-duration={1000}
      >
        <Typography
          sx={{ fontWeight: "normal", mb: 3 }}
          align="center"
          fontSize={commonStore.isDesktop ? 36 : 24}
        >
          {commonStore.appInfo.language === "ko" ? (
            <>
              <span style={{ fontWeight: "bold" }}>
                {engineDataStore.brandInfo.identity === "Brand"
                  ? "브랜드"
                  : "기업"}{" "}
                이름
              </span>
              은{commonStore.isDesktop ? " " : <br />}
              무엇인가요?
            </>
          ) : (
            <>
              What is your{" "}
              <span style={{ fontWeight: "bold" }}>
                {engineDataStore.brandInfo.identity}
              </span>{" "}
              name?
            </>
          )}
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            width: commonStore.isDesktop
              ? 500
              : commonStore.device === "tablet"
              ? 400
              : 300,
            mb: 1,
          }}
        >
          <TextField
            autoFocus
            color="secondary"
            id="question-name-input-01"
            label={
              commonStore.appInfo.language === "ko"
                ? `${
                    engineDataStore.brandInfo.identity === "Brand"
                      ? "브랜드"
                      : "기업"
                  } 이름을 입력해주세요.`
                : `Enter the name of the ${engineDataStore.brandInfo.identity}.`
            }
            sx={{
              width: "100%",
            }}
            value={engineDataStore.brandInfo.name}
            onChange={(e) => {
              engineDataStore.setBrandInfo({
                ...engineDataStore.brandInfo,

                name: e.target.value,
              });
            }}
            onFocus={() => engineStore.setKeypadOpen(true)}
            onBlur={() => engineStore.setKeypadOpen(false)}
          />
        </Paper>

        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              icon={<RadioButtonUnchecked />}
              checkedIcon={<CheckCircle />}
              checked={
                engineDataStore.brandInfo.identity === "Corporate"
                  ? true
                  : false
              }
              onChange={(e) => {
                engineDataStore.setBrandInfo({
                  ...engineDataStore.brandInfo,

                  identity: e.target.checked ? "Corporate" : "Brand",
                });
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: commonStore.isDesktop ? 16 : 12,
              }}
            >
              {commonStore.appInfo.language === "ko"
                ? `기업인 경우 체크해주세요.`
                : `Please check if it's a company.`}
            </Typography>
          }
        />
      </Box>
    </>
  ));
}

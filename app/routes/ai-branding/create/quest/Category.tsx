import * as React from "react";

import { Autocomplete, Box, Paper, TextField, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { industry } from "../../../../data/industry.js";
import { AppContext } from "../../../../stores/index.js";
import { Industry, IndustryCategory } from "../../../../types.js";

export default function QuestCategory(): JSX.Element {
  const { commonStore, engineStore, engineDataStore } =
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
              {"<"}
              {engineDataStore.brandInfo.name}
              {">"}
              이(가) 하는
              {commonStore.isDesktop ? " " : <br />}
              <span style={{ fontWeight: "bold" }}>일을</span> 알려주세요.
            </>
          ) : (
            <>
              Please tell me what {"<"}
              {engineDataStore.brandInfo.name}
              {">"} <span style={{ fontWeight: "bold" }}>does</span>.
            </>
          )}
        </Typography>

        <Box
          sx={{
            width: commonStore.isDesktop
              ? 500
              : commonStore.device === "tablet"
              ? 400
              : 300,
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              width: "100%",
              mb: 3,
            }}
          >
            <Autocomplete
              options={industry.map((v: IndustryCategory) =>
                commonStore.appInfo.language === "ko"
                  ? v.CategoryKor
                  : v.Category,
              )}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="secondary"
                  autoFocus
                  label={
                    commonStore.appInfo.language === "ko"
                      ? "카테고리를 선택해주세요."
                      : "Select a category."
                  }
                />
              )}
              onChange={(e, value: string | null) => {
                const data = industry.find((v: IndustryCategory) =>
                  commonStore.appInfo.language === "ko"
                    ? v.CategoryKor === value
                    : v.Category === value,
                )?.Category;

                engineDataStore.setBrandInfo({
                  ...engineDataStore.brandInfo,

                  category: data ?? "",
                  industry: {
                    Industry: "",
                    "Industry Ko": "",
                  },
                });
              }}
              onFocus={() => engineStore.setKeypadOpen(true)}
              onBlur={() => engineStore.setKeypadOpen(false)}
              value={
                commonStore.appInfo.language === "ko"
                  ? industry.find(
                      (v: IndustryCategory) =>
                        v.Category === engineDataStore.brandInfo.category,
                    )?.CategoryKor ?? ""
                  : industry.find(
                      (v: IndustryCategory) =>
                        v.Category === engineDataStore.brandInfo.category,
                    )?.Category ?? ""
              }
            />
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              width: "100%",
            }}
          >
            <Autocomplete
              disabled={!engineDataStore.brandInfo.category}
              options={
                industry.find(
                  (v: IndustryCategory) =>
                    engineDataStore.brandInfo.category === v.Category,
                )?.SubCategory ?? []
              }
              getOptionLabel={(option: Industry) =>
                `${
                  commonStore.appInfo.language === "ko"
                    ? option["Industry Ko"]
                    : option["Industry"]
                }`
              }
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="secondary"
                  label={
                    engineDataStore.brandInfo.category
                      ? commonStore.appInfo.language === "ko"
                        ? "세부업종을 선택해주세요."
                        : "And now, select a detailed industry."
                      : commonStore.appInfo.language === "ko"
                      ? "카테고리를 먼저 선택해주세요."
                      : "Please select a category first."
                  }
                />
              )}
              renderOption={(props, option) => {
                return (
                  <li
                    {...props}
                    key={
                      commonStore.appInfo.language === "ko"
                        ? option["Industry Ko"]
                        : option["Industry"]
                    }
                  >
                    {`${
                      commonStore.appInfo.language === "ko"
                        ? option["Industry Ko"]
                        : option["Industry"]
                    }`}
                  </li>
                );
              }}
              isOptionEqualToValue={(option: Industry, value: Industry) =>
                option["Industry"] === value["Industry"]
              }
              onChange={(e, value: Industry | null) => {
                engineDataStore.setBrandInfo({
                  ...engineDataStore.brandInfo,

                  industry: value ?? {
                    Industry: "",
                    "Industry Ko": "",
                  },
                });
              }}
              onFocus={() => engineStore.setKeypadOpen(true)}
              onBlur={() => engineStore.setKeypadOpen(false)}
              value={
                engineDataStore.brandInfo.industry["Industry"]
                  ? engineDataStore.brandInfo.industry
                  : null
              }
            />
          </Paper>
        </Box>
      </Box>
    </>
  ));
}

import * as React from "react";

import {
  Box,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { a11yProps, TabPanel } from "../../../../common/Tabpanel.js";
import { work } from "../../../../data/work.js";
import { AppContext } from "../../../../stores/index.js";

export default function QuestWork(): JSX.Element {
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
              만의 <span style={{ fontWeight: "bold" }}>
                특별한 장점
              </span>은 {commonStore.isDesktop ? " " : <br />}무엇입니까?
            </>
          ) : (
            <>
              What are the{" "}
              <span style={{ fontWeight: "bold" }}>special features</span> of
              the {"<"}
              {engineDataStore.brandInfo.name}
              {">"}?
            </>
          )}
        </Typography>

        <Paper variant="outlined">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              value={engineDataStore.brandInfo.workOwn}
              onChange={(e, value) => {
                engineDataStore.setBrandInfo({
                  ...engineDataStore.brandInfo,

                  workOwn: value,
                });
              }}
              aria-label="basic tabs example"
            >
              <Tab
                label={
                  commonStore.appInfo.language === "ko"
                    ? "가이드"
                    : "Guidelines"
                }
                {...a11yProps(0)}
              />

              <Tab
                label={
                  commonStore.appInfo.language === "ko"
                    ? "직접입력"
                    : "Yourself"
                }
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={engineDataStore.brandInfo.workOwn} index={0}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: commonStore.isDesktop ? "" : "column",
                width: commonStore.isDesktop
                  ? 500
                  : commonStore.device === "tablet"
                  ? 400
                  : 250,
                p: 3,
              }}
            >
              <Select
                color="secondary"
                placeholder={
                  commonStore.appInfo.language === "ko"
                    ? "특장점을 선택해주세요."
                    : "Select the special feature."
                }
                fullWidth
                value={engineDataStore.brandInfo.special?.name ?? ""}
                onChange={(e: any) => {
                  const index = work.findIndex(
                    (v) => v.name === e.target.value,
                  );

                  engineDataStore.setBrandInfo({
                    ...engineDataStore.brandInfo,
                    special: work[index],
                  });
                }}
              >
                {work.map((v, i) => (
                  <MenuItem key={i} value={v.name}>
                    {commonStore.appInfo.language === "ko"
                      ? v["nameKor"]
                      : v["name"]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </TabPanel>

          <TabPanel value={engineDataStore.brandInfo.workOwn} index={1}>
            <Box
              sx={{
                width: commonStore.isDesktop
                  ? 500
                  : commonStore.device === "tablet"
                  ? 400
                  : 300,
                p: 3,
              }}
            >
              <TextField
                id="question-work-input-01"
                placeholder={
                  commonStore.appInfo.language === "ko"
                    ? "특장점을 입력해주세요."
                    : "Enter the special feature."
                }
                sx={{
                  width: "100%",
                }}
                onChange={(e) => {
                  engineDataStore.setBrandInfo({
                    ...engineDataStore.brandInfo,

                    description: e.target.value,
                  });
                }}
                onFocus={() => engineStore.setKeypadOpen(true)}
                onBlur={() => engineStore.setKeypadOpen(false)}
                value={engineDataStore.brandInfo.description}
              />
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </>
  ));
}

import * as React from "react";
import Image from "../../common/Image.js";
import Automatic from "./components/Automatic.js";
import Customize from "./components/Customize.js";

import { ExitToApp } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../stores/index.js";

import {
  Box,
  Chip,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Language } from "../../common/Language.js";

export default function Logo(): JSX.Element {
  const navigate = useNavigate();
  const { commonStore, logoStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          width: commonStore.baseInfo.width,
          height: 60,

          bgcolor: "background.paper",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          p: 3,
        }}
      >
        <Image
          src="/resources/logo_white.png"
          height={33}
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        />

        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ExitToApp />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.default",
            width: 350,
            height: commonStore.baseInfo.height - 60,

            pl: 3,
            py: 3,
          }}
        >
          <Box
            sx={{
              height: commonStore.baseInfo.height - 108,
            }}
          >
            <List>
              <ListItemButton
                disabled
                onClick={() => {
                  logoStore.setAutomatic(true);
                }}
              >
                <Typography
                  color={logoStore.isAutomatic ? "secondary" : "inherit"}
                  fontSize={20}
                >
                  <Language label="로고 자동 생성" />
                </Typography>
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  logoStore.setAutomatic(false);
                }}
              >
                <Typography
                  color={logoStore.isAutomatic ? "inherit" : "secondary"}
                  fontSize={20}
                >
                  <Language label="사용자 지정 로고 생성" />
                </Typography>

                <Chip
                  size="small"
                  label="BETA"
                  sx={{
                    ml: 3,
                  }}
                />
              </ListItemButton>
            </List>
          </Box>
        </Box>

        {logoStore.isAutomatic ? <Automatic /> : <Customize />}
      </Box>
    </>
  ));
}

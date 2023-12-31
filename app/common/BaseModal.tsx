import * as React from "react";

import { Box } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../stores/index.js";

export default function BaseModal(props: any): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "1rem",

        position: "fixed",

        top: "50%",
        left: "50%",

        transform: "translate(-50%, -50%)",

        width: commonStore.isDesktop ? props.width ?? 600 : "90%",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",

          p: 3,

          height: 85,
        }}
      >
        {props.header}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: props.height ?? "auto",

          overflowY: "auto",

          p: 3,
        }}
      >
        {props.children}
      </Box>

      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",

          p: 3,
        }}
      >
        {props.footer}
      </Box>
    </Box>
  ));
}

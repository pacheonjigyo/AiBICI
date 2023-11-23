import { Avatar, Box, Container } from "@mui/material";
import Image from "./Image.js";
import { stringAvatar } from "./StringAvatar.js";

export const MessageBox = (props: any) => {
  return (
    <Box
      sx={{
        bgcolor:
          props.data.from === "aibici"
            ? "background.paper"
            : "background.default",

        color: props.data.from === "aibici" ? "text.primary" : "text.primary",

        p: 3,

        // width: "100%",
      }}
      {...props}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            height: 40,
          }}
        >
          {props.data.from === "aibici" ? (
            <Image src="/favicon.ico" width={40} height={40} />
          ) : (
            <Avatar {...stringAvatar("user")} />
          )}
        </Box>

        <Box
          sx={{
            ml: 3,
            width: "90%",
          }}
        >
          {props.children}
        </Box>
      </Container>
    </Box>
  );
};

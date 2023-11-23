import { Box } from "@mui/material";

export const SoftButton = (props: any) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",

        borderRadius: "1rem",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        m: "auto",
        p: 4,

        width: "100%",
        height: 300,

        ...props.sx,
      }}
      {...props}
    >
      {props.children}
    </Box>
  );
};

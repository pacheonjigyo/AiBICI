import { Box } from "@mui/material";

export const Cover = (props: any) => {
  return (
    <>
      <Box
        sx={{
          ...props.sx,

          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {props.children}
      </Box>
    </>
  );
};

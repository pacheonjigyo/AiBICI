import { Hexagon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const Token = (props: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        ...props.sx,
      }}
    >
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#cbbfff" />
          <stop offset={1} stopColor="#8265ff" />
        </linearGradient>
      </svg>
      <Hexagon
        sx={{
          fontSize: props.fontSize ?? 18,
          fill: "url(#linearColors)",
        }}
      />
      {props.value && (
        <Typography
          color="white"
          fontSize={props.fontSize ?? 18}
          fontWeight="bold"
        >
          &nbsp;
          {props.value}
        </Typography>
      )}
      &nbsp;
      <Typography
        color="white"
        fontSize={props.fontSize ?? 18}
        // fontWeight="bold"
      >
        Gas
      </Typography>
    </Box>
  );
};

import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

export const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {},
  [`& .${linearProgressClasses.bar}`]: {},
}));

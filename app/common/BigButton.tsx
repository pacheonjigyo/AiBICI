import { Button } from "@mui/material";

export const BigButton = (props: any) => {
  return (
    <Button
      {...props}
      sx={{
        ...props.sx,

        fontSize: 14,

        minWidth: 144,
        height: 48,
      }}
    >
      {props.children}
    </Button>
  );
};

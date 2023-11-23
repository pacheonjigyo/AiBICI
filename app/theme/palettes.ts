import { type PaletteOptions } from "@mui/material/styles";

export const light: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#ebebeb",
  },

  secondary: {
    main: "#333333",
  },

  info: {
    main: "#f1f5f9",
  },

  background: {
    paper: "#f8fafc",
    default: "#f5f7f6",
  },

  example: {
    primary: "#49b4ff",
    secondary: "#ef3054",
  },

  text: {
    primary: "#333333",
    secondary: "#94A3B8",
  },

  success: {
    main: "#e0ffdc",
  },

  warning: {
    main: "#ffeed2",
  },

  error: {
    main: "#ffe5e5",
  },
};

export const dark: PaletteOptions = {
  mode: "dark",

  primary: {
    main: "#1c1c24",
  },

  secondary: {
    main: "#8265ff",
  },

  info: {
    main: "#a8a8ad",
  },

  background: {
    paper: "#1c1c24",
    default: "#15151a",
  },

  example: {
    primary: "#49b4ff",
    secondary: "#ef3054",
  },

  text: {
    // primary: "#ffffff",
    // secondary: "#a8a8ad",

    primary: "#a8a8ad",
    secondary: "#53535b",
  },

  success: {
    main: "#008000",
  },

  warning: {
    main: "#ffa500",
  },

  error: {
    main: "#ff5050",
  },
};

export default { light, dark };
declare module "@mui/material/styles" {
  interface Palette {
    example: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    example: {
      primary: string;
      secondary: string;
    };
  }
}

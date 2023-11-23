import { type Palette } from "@mui/material/styles";

export const components = (palette: Palette): any => ({
  MuiDivider: {
    styleOverrides: {
      root: {
        "&::before, &::after": {
          // borderColor: "black",
        },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        background: "#1c1c24",
        borderRadius: "1rem",

        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            // borderColor: "#a8a8ad",
            borderRadius: "1rem",
          },
          "&:hover fieldset": {
            // borderColor: "#a8a8ad",
          },
          "&.Mui-focused fieldset": {
            // borderColor: "#a8a8ad",
          },
        },
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      root: {
        background: "#1c1c24",
        borderRadius: "1rem",
      },
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: {
        borderRadius: "1rem",
      },
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: 8,
        textAlign: "center",
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,

        // opacity: 0.5,
        // borderRadius: "1rem",
        // textTransform: "unset",
        // fontWeight: 700,
      },

      colorSuccess: {
        color: "#e0ffdc",
      },

      colorWarning: {
        color: "#ffeed2",
      },

      colorError: {
        color: "#ffe5e5",
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "1rem",

        textTransform: "unset",
      },

      contained: {
        boxShadow: "none",
        fontWeight: 700,

        "&:hover": {
          boxShadow: "none",
        },
      },

      text: {
        // color: "white",

        "&:hover": {
          // color: "white",
          background: "transparent",
          opacity: 0.5,
        },
      },

      // containedPrimary: {
      //   color: "#9c926d",

      //   "&:hover": {
      //     background: "white",
      //     color: "#9c926d",

      //     boxShadow: "none",
      //   },
      // },

      // containedSecondary: {
      //   color: "#697c99",

      //   "&:hover": {
      //     background: "white",
      //     color: "#697c99",

      //     boxShadow: "none",
      //   },
      // },

      containedError: {
        color: "#ff5050",

        "&:hover": {
          background: "white",
          color: "#ff5050",

          boxShadow: "none",
        },
      },

      containedInfo: {
        color: "#64748b",

        "&:hover": {
          background: "white",
          color: "#64748b",

          boxShadow: "none",
        },
      },

      containedInherit: {
        background: palette.mode === "light" ? "whitesmoke" : "#333333",
        color: "gray",

        "&:hover": {
          background: "white",
          color: "gray",

          boxShadow: "none",
        },
      },

      textInherit: {
        color: "gray",

        "&:hover": {
          color: "gray",

          boxShadow: "none",
        },
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },

  // MuiTypography: {
  //   styleOverrides: {
  //     root: {
  //       color: "#333333",
  //     },
  //   },
  // },
});

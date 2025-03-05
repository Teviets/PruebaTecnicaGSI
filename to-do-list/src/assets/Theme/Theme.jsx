import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

export const customTheme = createTheme({
  palette: {
    mode: "dark", // Modo oscuro activado
    primary: {
      main: "#64B5F6", // Azul claro
      contrastText: "#121212", // Texto oscuro para contraste
    },
    secondary: {
      main: "#FF8A65", // Coral suave
      contrastText: "#121212", // Texto oscuro para contraste
    },
    warning: {
      main: "#FFD54F", // Amarillo suave
      contrastText: "#121212", // Texto oscuro para contraste
    },
    success: {
      main: "#81C784", // Verde claro
      contrastText: "#121212", // Texto oscuro para contraste
    },
    info: {
      main: "#90A4AE", // Gris azulado claro
      contrastText: "#121212", // Texto oscuro para contraste
    },
    background: {
      default: "#121212", // Fondo oscuro
      paper: "#1E1E1E", // Fondo de componentes
    },
    text: {
      primary: "#FFFFFF", // Texto principal blanco
      secondary: "#B0B0B0", // Texto secundario gris claro
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#64B5F6", // Borde primario

          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&::before, &::after": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
});
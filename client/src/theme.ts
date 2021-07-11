import { Theme } from "theme-ui";

export const theme = {
  colors: {
    primary: "#2451B2",
    secondary: "#e3ebf6",
    light: "#fbfbfb",
    medium: "#d2d2d2",
    dark: "#969696",
  },
  forms: {
    input: {
      borderColor: "dark",
      backgroundColor: "light",
    },
  },
  styles: {
    b: {
      color: "primary",
    },
  },
};

export const globalStyle = (theme: Theme) => ({
  "html, body": {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    margin: 0,
    padding: 0,
  },
});

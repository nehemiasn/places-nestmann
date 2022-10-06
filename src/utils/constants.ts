import { Dimensions } from "react-native";

export const colors = {
  colorPrimary: "#212121",
  colorPrimaryContrast: "#ffffff",
  colorTextLight: "#ffffff",
  colorTextDark: "#222222",
  colorSelection: "#e2e2e2",
};

export const display = Dimensions.get("window");
export const displayWidth = Number(
  Number.parseFloat(`${display.width}`).toFixed(1)
);
export const displayHeight = Number(
  Number.parseFloat(`${display.height}`).toFixed(1)
);

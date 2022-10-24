import React from "react";
import { TextStyle } from "react-native";
import { Text } from "./Themed";

interface TypographyProps {
  children?: any;
  style?: TextStyle;
  type?:
    | "OpenSans-Regular"
    | "OpenSans-Light"
    | "OpenSans-Bold"
    | "OpenSans-SemiBold"
    | "OpenSans-ExtraBold";
}

export const Typography: React.FC<TypographyProps> = (props) => {
  const { children, style, type } = props;

  return (
    <Text
      style={{
        ...style,
        fontFamily: type || "OpenSans-Regular",
      }}
    >
      {children}
    </Text>
  );
};

import React from "react";
import { Text, TextStyle } from "react-native";

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

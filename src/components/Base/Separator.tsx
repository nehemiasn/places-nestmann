import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export interface SeparatorProps {
  px: 0 | 4 | 8 | 12 | 16 | 24 | 32 | 48;
  divider?: boolean;
  orientation?: "vertical" | "horizontal";
  style?: StyleProp<ViewStyle>;
  color?: "primary" | "secondary";
}

export const Separator: React.FC<SeparatorProps> = (props) => {
  const { divider, orientation, color } = props;
  const style = React.useMemo(() => props.style || ({} as any), []);
  if (orientation === "vertical") {
    if (divider) {
      return (
        <View style={{ height: "100%", display: "flex" }}>
          <View
            style={{ minWidth: props.px || `${props.px}px`, height: "100%" }}
          />
          <View
            style={{
              height: "100%",
              width: 1,
              backgroundColor: "#e0e0e0",
              ...style,
            }}
          />
          <View
            style={{ minWidth: props.px || `${props.px}px`, height: "100%" }}
          />
        </View>
      );
    }
    return (
      <View style={{ minWidth: props.px || `${props.px}px`, height: "100%" }} />
    );
  }
  if (divider) {
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{ width: "100%", minHeight: props.px || `${props.px}px` }}
        />
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#e0e0e0",
            ...style,
          }}
        />
        <View
          style={{ width: "100%", minHeight: props.px || `${props.px}px` }}
        />
      </View>
    );
  }
  return (
    <View style={{ width: "100%", minHeight: props.px || `${props.px}px` }} />
  );
};

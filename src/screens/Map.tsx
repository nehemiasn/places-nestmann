import React from "react";
import { StyleSheet } from "react-native";
import { Separator, Typography, View } from "../components";
import { RootTabScreenProps } from "../types";

interface MapProps extends RootTabScreenProps<"Props"> {}

export const Map: React.FC<MapProps> = () => {
  return (
    <View style={styles.container}>
      <Typography style={styles.title}>Mapa</Typography>
      <Separator px={16} divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

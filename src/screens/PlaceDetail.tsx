import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

interface PlaceDetailProps extends RootTabScreenProps<"Props"> {}

export const PlaceDetail: React.FC<PlaceDetailProps> = (props) => {
  const { navigation } = props;
  const place: {
    description: string;
    id: number;
    name: string;
  } = props.route.params as any;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.description}>
        <Text>{place.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  description: {
    padding: 16,
    textAlign: "justify",
  },
});

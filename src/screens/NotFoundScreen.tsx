import { StyleSheet, TouchableOpacity } from "react-native";
import { Typography, View } from "../components";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  return (
    <View style={styles.container}>
      <Typography style={styles.title}>This screen doesn't exist.</Typography>
      <TouchableOpacity
        onPress={() => navigation.replace("Tabs")}
        style={styles.link}
      >
        <Typography style={styles.linkText}>Go to home screen!</Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

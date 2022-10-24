import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Typography, View } from "../Base";

export const CategoryCard: React.FC<any> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.contentContainer,
        }}
        onPress={props.onPress}
      >
        <Typography style={styles.text}>{props.item.name}</Typography>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 150,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 24,
  },
});

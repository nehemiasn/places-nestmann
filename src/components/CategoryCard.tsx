import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const CategoryCard: React.FC<any> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.contentContainer,
        }}
        onPress={props.onPress}
      >
        <Text style={styles.text}>{props.item.name}</Text>
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

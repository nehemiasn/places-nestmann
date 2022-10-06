import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { CategoryOfPlacesData } from "../services/PlaceService";

interface CategoryOfPlacesProps extends RootTabScreenProps<"Props"> {}

export const CategoryOfPlaces: React.FC<CategoryOfPlacesProps> = (props) => {
  const { navigation } = props;

  const handleOnPress = (item: any) => {
    navigation.navigate("Places", item);
  };

  return (
    <FlatList
      data={CategoryOfPlacesData}
      renderItem={({ item }) => (
        <CategoryItem item={item} onPress={() => handleOnPress(item)} />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
});

const CategoryItem = (props: any) => {
  return (
    <View style={stylesCategoryItem.container}>
      <TouchableOpacity
        style={{
          ...stylesCategoryItem.contentContainer,
        }}
        onPress={props.onPress}
      >
        <Text style={stylesCategoryItem.text}>{props.item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CategoryItem;

export const stylesCategoryItem = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 150,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
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

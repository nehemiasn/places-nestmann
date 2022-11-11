import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { CategoryCard } from "../components";
import { StoreContext } from "../store/Store";

interface CategoryOfPlacesProps extends RootTabScreenProps<"Props"> {}

export const CategoryOfPlaces: React.FC<CategoryOfPlacesProps> = () => {
  const { placeTypes } = React.useContext(StoreContext);

  const handleOnPress = (item: any) => {
    // dispatch(selectCategory(item.id));
    // navigation.navigate("Places");
  };

  return (
    <FlatList
      data={placeTypes.data}
      renderItem={({ item }) => (
        <CategoryCard item={item} onPress={() => handleOnPress(item)} />
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

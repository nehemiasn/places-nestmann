import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../store/actions/category.action";
import { CategoryCard } from "../components/CategoryCard";

interface CategoryOfPlacesProps extends RootTabScreenProps<"Props"> {}

export const CategoryOfPlaces: React.FC<CategoryOfPlacesProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const categories = useSelector((state: any) => state.category.categories);

  const handleOnPress = (item: any) => {
    dispatch(selectCategory(item.id));
    navigation.navigate("Places");
  };

  return (
    <FlatList
      data={categories}
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

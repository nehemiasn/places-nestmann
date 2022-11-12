import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { CategoryCard } from "../components";
import { StoreContext } from "../store/Store";
import { IPlaceType } from "../services/PlaceService";

interface CategoryOfPlacesProps extends RootTabScreenProps<"Props"> {}

export const CategoryOfPlaces: React.FC<CategoryOfPlacesProps> = (props) => {
  const { navigation } = props;
  const { placeTypes, viewPlace } = React.useContext(StoreContext);

  const handleOnPress = React.useMemo(() => {
    return (item: IPlaceType) => {
      viewPlace.setPlaceType(() => item);
      navigation.navigate("Places");
    };
  }, []);

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

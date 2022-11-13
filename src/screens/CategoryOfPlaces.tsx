import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { StoreContext } from "../store/Store";
import { IPlaceType } from "../services/PlaceService";
import { CategoryCard } from "../components";

interface CategoryOfPlacesProps extends RootTabScreenProps<"Props"> {}

export const CategoryOfPlaces: React.FC<CategoryOfPlacesProps> = (props) => {
  const { navigation } = props;
  const { placeTypes, allPlace } = React.useContext(StoreContext);

  const handleOnPress = React.useMemo(() => {
    return (item: IPlaceType) => {
      allPlace.setPlaceType(() => item);
      navigation.navigate("Places");
    };
  }, []);

  React.useEffect(() => {
    allPlace.setPlaceType(() => undefined);
  }, []);

  return (
    <>
      <FlatList
        data={placeTypes.data}
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={() => handleOnPress(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.container}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
});

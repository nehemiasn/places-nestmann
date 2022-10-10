import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { filteredPlaces, selectedPlace } from "../store/actions/place.action";

interface PlacesProps extends RootTabScreenProps<"Props"> {}

export const Places: React.FC<PlacesProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const category = useSelector((state: any) => state.category.selected);
  const places = useSelector((state: any) => state.places.filteredPlaces);

  const handleOnPress = (item: any) => {
    dispatch(selectedPlace(item.id));
    navigation.navigate("PlaceDetail");
  };

  React.useEffect(() => {
    dispatch(filteredPlaces(category.id));
  }, []);

  return (
    <>
      {places.length ? (
        <FlatList
          data={places}
          renderItem={({ item }) => (
            <PlaceItem item={item} onPress={() => handleOnPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.container}
        />
      ) : (
        <View style={styles.noResult}>
          <Text style={styles.noResultText}>
            No hay resultados para mostrar
          </Text>
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  noResult: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  noResultText: {
    textAlign: "center",
    fontSize: 20,
  },
});

const PlaceItem = (props: any) => {
  return (
    <View style={stylesPlaceItem.container}>
      <TouchableOpacity
        style={{
          ...stylesPlaceItem.contentContainer,
        }}
        onPress={props.onPress}
      >
        <Text style={stylesPlaceItem.text}>{props.item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PlaceItem;

export const stylesPlaceItem = StyleSheet.create({
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

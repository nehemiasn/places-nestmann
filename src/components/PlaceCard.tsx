import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectedPlace,
} from "../store/actions/place.action";
import { FavoritePlaceIcon } from "./FavoritePlaceIcon";

export const PlaceCard: React.FC<any> = (props) => {
  const { place, navigation } = props;
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(selectedPlace(place.id));
    navigation.navigate("PlaceDetail");
  };

  const handleAddAndRemoveFavorite = React.useMemo(() => {
    return () => {
      if (!place.isFavorite) {
        dispatch(addFavorite(place.id));
      } else {
        dispatch(removeFavorite(place.id));
      }
    };
  }, [place]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.contentContainer,
        }}
        onPress={handleOnPress}
      >
        <Text style={styles.text}>{props.place.name}</Text>
        <FavoritePlaceIcon
          isFavorite={place.isFavorite}
          onPress={handleAddAndRemoveFavorite}
          style={{
            top: 16,
          }}
        />
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

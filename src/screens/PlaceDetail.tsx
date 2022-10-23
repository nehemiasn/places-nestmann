import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FavoritePlaceIcon } from "../components/FavoritePlaceIcon";
import { Text, View } from "../components/Themed";
import { addFavorite, removeFavorite } from "../store/actions/place.action";
import { RootTabScreenProps } from "../types";

interface PlaceDetailProps extends RootTabScreenProps<"Props"> {}

export const PlaceDetail: React.FC<PlaceDetailProps> = () => {
  const dispatch = useDispatch();
  const place = useSelector((state: any) => state.places.selected);

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
      <View style={styles.head1}>
        <View style={styles.head2}>
          <View style={styles.title1}>
            <Text style={styles.title2}>{place.name}</Text>
          </View>
          <FavoritePlaceIcon
            isFavorite={place.isFavorite}
            onPress={handleAddAndRemoveFavorite}
          />
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.description}>
        <Text>{place.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  head1: {
    width: "100%",
  },
  head2: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
  },
  title1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  description: {
    padding: 16,
    textAlign: "justify",
  },
});

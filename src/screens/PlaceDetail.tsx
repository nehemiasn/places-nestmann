import React from "react";
import { StyleSheet } from "react-native";
import { Typography, View, FavoritePlaceIcon, Separator } from "../components";
import { StoreContext } from "../store/Store";
import { RootTabScreenProps } from "../types";

interface PlaceDetailProps extends RootTabScreenProps<"Props"> {}

export const PlaceDetail: React.FC<PlaceDetailProps> = () => {
  const { viewPlace } = React.useContext(StoreContext);

  const place = React.useMemo(() => {
    return viewPlace.place || ({} as any);
  }, [viewPlace.place]);

  const handleAddAndRemoveFavorite = React.useMemo(() => {
    return () => {
      // if (!place.isFavorite) {
      //   dispatch(addFavorite(place.id) as any);
      // } else {
      //   dispatch(removeFavorite(place.id) as any);
      // }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.head1}>
        <View style={styles.head2}>
          <View style={styles.title1}>
            <Typography style={styles.title2}>{place.name}</Typography>
          </View>
          {/* <FavoritePlaceIcon
            isFavorite={place.isFavorite}
            onPress={handleAddAndRemoveFavorite}
          /> */}
        </View>
      </View>
      <Separator px={16} divider />
      <View style={styles.description}>
        <Typography>{place.description}</Typography>
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
  description: {
    padding: 16,
    textAlign: "justify",
  },
});

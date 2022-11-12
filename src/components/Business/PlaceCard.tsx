import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { IPlace } from "../../services/PlaceService";
import { Typography, View } from "../Base";
import { FavoritePlaceIcon } from "./FavoritePlaceIcon";

interface PlaceCardProps {
  place: IPlace;
  onClick?: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = (props) => {
  const { place, onClick } = props;

  const handleAddAndRemoveFavorite = React.useMemo(() => {
    return () => {
      // if (!place.isFavorite) {
      //   dispatch(addFavorite(place) as any);
      // } else {
      //   dispatch(removeFavorite(place) as any);
      // }
    };
  }, [place]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.contentContainer,
        }}
        onPress={onClick}
      >
        <Typography style={styles.text}>{props.place.name}</Typography>
        {/* <FavoritePlaceIcon
          isFavorite={place.isFavorite}
          onPress={handleAddAndRemoveFavorite}
          style={{
            top: 16,
          }}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 150,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
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

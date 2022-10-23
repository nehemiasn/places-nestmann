import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useSelector } from "react-redux";
import { PlaceCard } from "../components/PlaceCard";

interface FavoritesProps extends RootTabScreenProps<"Props"> {}

export const Favorites: React.FC<FavoritesProps> = (props) => {
  const { navigation } = props;
  const places = useSelector((state: any) => state.places.data);

  const favorites = React.useMemo(() => {
    return places.filter((p: any) => p.isFavorite);
  }, [places]);

  return (
    <>
      {favorites.length ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <PlaceCard place={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.container}
        />
      ) : (
        <View style={styles.noResult}>
          <Text style={styles.noResultText}>No hay ningun favorito</Text>
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

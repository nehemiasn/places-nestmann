import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { PlaceCard, Typography, View } from "../components";

interface FavoritesProps extends RootTabScreenProps<"Props"> {}

export const Favorites: React.FC<FavoritesProps> = (props) => {
  const loadComponent = React.useRef<boolean>(false);
  const { navigation } = props;

  const favorites = React.useMemo(() => {
    return [].filter((p: any) => p.isFavorite) as any[];
  }, []);

  React.useEffect(() => {
    if (!favorites.length && loadComponent.current) {
    }
  }, [favorites]);

  React.useEffect(() => {
    loadComponent.current = true;
    return () => {
      loadComponent.current = false;
    };
  }, []);

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
          <Typography style={styles.noResultText}>
            No hay ningun favorito
          </Typography>
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

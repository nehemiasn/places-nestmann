import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { PlaceCard, Typography, View } from "../components";

interface PlacesProps extends RootTabScreenProps<"Props"> {}

export const Places: React.FC<PlacesProps> = (props) => {
  const { navigation } = props;
  const category = {} as any;
  const places = {} as any;

  const placesByCategory = React.useMemo(() => {
    return places.filter((p: any) => p.categoryId === category.id);
  }, [places]);

  return (
    <>
      {placesByCategory.length ? (
        <FlatList
          data={placesByCategory}
          renderItem={({ item }) => (
            <PlaceCard place={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.container}
        />
      ) : (
        <View style={styles.noResult}>
          <Typography style={styles.noResultText}>
            No hay resultados para mostrar
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

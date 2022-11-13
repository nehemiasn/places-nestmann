import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { PlaceCard, Typography, View } from "../components";
import { StoreContext } from "../store/Store";
import { IPlace } from "../services/PlaceService";

interface PlacesProps extends RootTabScreenProps<"Props"> {}

export const Places: React.FC<PlacesProps> = (props) => {
  const { navigation } = props;
  const { allPlace, viewPlace } = React.useContext(StoreContext);

  const handleOnPress = React.useMemo(() => {
    return (item: IPlace) => {
      viewPlace.setPlace(() => item);
      navigation.navigate("PlaceDetail");
    };
  }, []);

  return (
    <>
      {allPlace.placesByType.length ? (
        <FlatList
          data={allPlace.placesByType}
          renderItem={({ item }) => (
            <PlaceCard place={item} onClick={() => handleOnPress(item)} />
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

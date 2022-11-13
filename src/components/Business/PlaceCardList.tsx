import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { IPlace } from "../../services/PlaceService";
import { SetterState } from "../../types";

import { Typography, View } from "../Base";
import { PlaceCard } from "./PlaceCard";

interface PlaceCardListProps {
  navigation: any;
  hook: {
    data: IPlace[];
    place: IPlace | undefined;
    setPlace: SetterState<IPlace | undefined>;
  };
}

export const PlaceCardList: React.FC<PlaceCardListProps> = (props) => {
  const { navigation, hook } = props;

  const handleOnPress = React.useMemo(() => {
    return (item: IPlace) => {
      hook.setPlace(() => item);
      navigation.navigate("PlaceDetail");
    };
  }, []);

  return (
    <>
      {hook.data.length ? (
        <FlatList
          data={hook.data}
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

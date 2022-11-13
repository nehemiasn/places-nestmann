import React from "react";
import { StyleSheet } from "react-native";
import {
  Typography,
  View,
  Separator,
  CardListPlaceDetail,
} from "../components";
import { StoreContext } from "../store/Store";
import { RootTabScreenProps } from "../types";

interface PlaceDetailProps extends RootTabScreenProps<"Props"> {}

export const PlaceDetail: React.FC<PlaceDetailProps> = () => {
  const { viewPlace } = React.useContext(StoreContext);

  const place = React.useMemo(() => {
    return viewPlace.place;
  }, [viewPlace.place]);

  return (
    <>
      {place ? (
        <View style={styles.container}>
          <Separator px={16} />
          <View style={styles.description}>
            <Typography>{place.description}</Typography>
          </View>
          <Separator px={16} />
          <CardListPlaceDetail files={place.placeFiles} />
        </View>
      ) : null}
    </>
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

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
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
        <ScrollView style={styles.container}>
          <View style={styles.description}>
            <Typography type="OpenSans-SemiBold" style={{ fontSize: 20 }}>
              Descipción
            </Typography>
          </View>
          <View style={styles.description}>
            <Typography>{place.description}</Typography>
          </View>
          <Separator px={16} />
          <View style={styles.description}>
            <Typography type="OpenSans-SemiBold" style={{ fontSize: 20 }}>
              Mapa
            </Typography>
          </View>
          <MapView
            initialRegion={{
              latitude: place.latitude,
              longitude: place.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            style={styles.map}
          >
            {place && (
              <Marker
                title="Ubicación seleccionada"
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
              />
            )}
          </MapView>
          <Separator px={16} />
          <View style={styles.description}>
            <Typography type="OpenSans-SemiBold" style={{ fontSize: 20 }}>
              Fotos
            </Typography>
          </View>
          <CardListPlaceDetail files={place.placeFiles} />
          <Separator px={48} />
        </ScrollView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  map: {
    flex: 1,
    width: "100%",
    minHeight: 300,
    alignItems: "center",
    padding: 16,
  },
});

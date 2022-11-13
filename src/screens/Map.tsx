import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../components";
import { AppContext } from "../providers/AppProvider";
import { FontAwesome } from "@expo/vector-icons";
import { IS_WEB } from "../constants";
import { StoreContext } from "../store/Store";

interface MapProps {}

export const Map: React.FC<MapProps> = () => {
  const { initialRegion, handleGetLocation } = React.useContext(AppContext);
  const { allPlace } = React.useContext(StoreContext);
  const [region, setRegion] = React.useState<
    | {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
        change?: number;
      }
    | undefined
  >(initialRegion);

  const handleSetCurrentPosition = async () => {
    if (initialRegion) {
      setRegion(() => ({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
        change: new Date().getTime(),
      }));
    }
  };
  // FFDB59
  return (
    <>
      {!IS_WEB ? (
        <MapView
          style={styles.container}
          region={region}
          initialRegion={region}
        >
          {region ? (
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Mi ubicación"
              icon={{
                uri: "data:image/png;base64,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",
              }}
            />
          ) : null}
          {allPlace.places.map((i) => (
            <Marker
              key={i.id}
              coordinate={{
                latitude: i.latitude,
                longitude: i.longitude,
              }}
              title="Mi ubicación"
            />
          ))}
        </MapView>
      ) : null}
      <View style={styles.mylocation}>
        <TouchableOpacity onPress={handleSetCurrentPosition}>
          <FontAwesome size={32} name="crosshairs" color="red" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mylocation: {
    position: "absolute",
    bottom: 64,
    right: 32,
    backgroundColor: "transparent",
  },
});

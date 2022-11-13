import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../components";
import { AppContext } from "../providers/AppProvider";
import { FontAwesome } from "@expo/vector-icons";
import { IS_WEB } from "../constants";

interface MapProps {}

export const Map: React.FC<MapProps> = () => {
  const { initialRegion, handleGetLocation } = React.useContext(AppContext);
  const [region, setRegion] = React.useState<
    | {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      }
    | undefined
  >(initialRegion);
  const [key, setkey] = React.useState<any>();

  const handleSetCurrentPosition = async () => {
    handleGetLocation((loc) => {
      if (loc) {
        setRegion(() => ({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }));
      }
    });
  };

  return (
    <>
      {!IS_WEB ? (
        <MapView
          key={key}
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
            />
          ) : null}
        </MapView>
      ) : null}
      <View
        style={{
          position: "absolute",
          bottom: 32,
          right: 16,
          backgroundColor: "transparent",
        }}
      >
        <TouchableOpacity onPress={handleSetCurrentPosition}>
          <FontAwesome size={32} name="crosshairs" color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

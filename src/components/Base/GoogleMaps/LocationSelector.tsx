import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { View, Button, Text, Alert, StyleSheet } from "react-native";
import { colors } from "../../../utils/constants";
import { MapPreview } from "./MapPreview";

export const LocationSelector = (props: any) => {
  const { onLocation } = props;
  const navigation = useNavigation();
  const route: any = useRoute();
  const [pickedLocation, setPickedLocation] = React.useState<any>();
  const mapLocation = route?.params?.mapLocation;

  const onHandleGetLocation = async () => {
    const isLocationPermissionGranted = await verifyPermissions();
    if (!isLocationPermissionGranted) return;

    const location = await Location.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    setPickedLocation({ lat: latitude, lng: longitude });

    onLocation({ lat: latitude, lng: longitude });
  };

  React.useEffect(() => {
    if (mapLocation) {
      setPickedLocation(mapLocation);
      onLocation(mapLocation);
    }
  }, [mapLocation]);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso insuficientes",
        "Necesitamos permisos para usar la localizacion",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const onHandlePickLocation = async () => {
    const isLocationPermissionGranted = await verifyPermissions();

    if (!isLocationPermissionGranted) return;

    navigation.navigate("Maps" as any);
  };
  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text>No has seleccionado una ubicacion</Text>
      </MapPreview>
      <View style={styles.containerActions}>
        <Button
          title="Obtener ubicación"
          onPress={onHandleGetLocation}
          color={colors.colorPrimary}
        />
        <Button
          title="Elegir desde el mapa"
          onPress={onHandlePickLocation}
          color={colors.colorPrimary}
        />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.colorPrimary,
    borderWidth: 1,
  },
  containerActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

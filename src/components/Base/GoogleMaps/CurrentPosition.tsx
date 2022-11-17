import React from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

const API_KEY = "AIzaSyC2M0RQnYIwybkWvw4yjsb91AGqfchbbZQ";

/**
 * Obtiene las coordenadas de la posición actual del usuario
 */
export const CurrentPosition = (options?: PositionOptions | undefined) => {
  const loadComponent = React.useRef<boolean>(false);

  const verifyPermisions = async () => {
    const check = await Location.getForegroundPermissionsAsync();

    if (check.status !== "granted") {
      await Location.requestForegroundPermissionsAsync();

      const check2 = await Location.getForegroundPermissionsAsync();
      if (check2.status !== "granted") {
        await Location.requestForegroundPermissionsAsync();
        Alert.alert(
          "Permisos insuficientes",
          "Necesita dar permisos de localización para usar el mapa.",
          [{ text: "OK" }]
        );
        return false;
      }
    }
    return true;
  };

  const getLocation = async () => {
    const checkPermisions = await verifyPermisions();

    if (checkPermisions) {
      return await Location.getCurrentPositionAsync();
    }
    return undefined;
  };

  React.useEffect(() => {
    loadComponent.current = true;
    return () => {
      loadComponent.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return {
    verifyPermisions,
    getLocation,
  };
};

export interface ILocation {
  coords: {
    accuracy: number;
    altitude?: number;
    altitudeAccuracy?: number;
    heading?: number;
    latitude: number;
    longitude: number;
    speed?: number;
  };
  timestamp: number;
}

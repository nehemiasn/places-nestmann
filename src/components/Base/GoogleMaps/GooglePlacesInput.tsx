import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY_GOOGLE_MAPS } from "../../../utils/constants";

export const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Buscar"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: API_KEY_GOOGLE_MAPS,
        language: "es",
      }}
    />
  );
};

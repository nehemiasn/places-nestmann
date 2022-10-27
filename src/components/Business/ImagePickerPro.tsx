import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Button } from "react-native";
import { View } from "../Base";

interface ImagePickerProProps {
  style?: React.CSSProperties;
  onImage: (uri: string) => void;
  onCancel: () => void;
}

export const ImagePickerPro: React.FC<ImagePickerProProps> = (props) => {
  const verifyPermissions = async () => {
    try {
      const result = await ImagePicker.requestCameraPermissionsAsync().catch(
        (error) => {
          console.log(error);
        }
      );

      if (result?.status === "granted") {
        return true;
      }

      Alert.alert(
        "Permiso denegado",
        "Necesitamos permisos para usar la cámara",
        [{ text: "Ok" }]
      );
      props.onCancel();
      return false;
    } catch (error) {
      props.onCancel();
      console.log(error);
    }
  };

  const onHandleTakeImage = async () => {
    try {
      const isCameraPermission = await verifyPermissions();
      if (!isCameraPermission) {
        return props.onCancel();
      }
      const image: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      }).catch((error) => {
        props.onCancel();
        console.log(error);
      });
      props.onImage(image.uri);
    } catch (error) {
      props.onCancel();
    }
  };

  React.useEffect(() => {
    onHandleTakeImage();
  }, []);

  return <></>;
};

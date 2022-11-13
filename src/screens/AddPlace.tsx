import React from "react";
import { Alert, Button, ScrollView, StyleSheet, TextInput } from "react-native";
import { LatLng, MapPressEvent } from "react-native-maps";
import {
  Separator,
  Typography,
  MapPicker,
  SelectPlaceTypes,
} from "../components";
import { CardList } from "../components/Business/CardList";
import { ImagePickerPro } from "../components/Business/ImagePickerPro";
import { AppContext } from "../providers/AppProvider";
import { useUploadOnePlaceFileService } from "../services/FileService";
import { useMutationCreateOnePlace } from "../services/PlaceService";
import { RootTabScreenProps } from "../types";
import { colors } from "../utils/constants";
import { uriToFile } from "../utils/tools";

interface AddPlaceProps extends RootTabScreenProps<"Props"> {}

export const AddPlace: React.FC<AddPlaceProps> = (props) => {
  const { navigation } = props;
  const { initialRegion, setLoading } = React.useContext(AppContext);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [location, setLocation] = React.useState<LatLng>();
  const [type, setType] = React.useState<{
    label: string;
    value: number;
  }>();
  const [loadCamera, setloadCamera] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<
    {
      uri: string;
      name: string;
    }[]
  >([]);
  const [createOnePlace, statusCreateOnePlace] = useMutationCreateOnePlace();
  const [uploadOnePlaceFile] = useUploadOnePlaceFileService();

  const handleAddPhoto = React.useMemo(() => {
    return async (uri: any) => {
      setloadCamera(false);
      setFiles((v) => [
        ...v,
        {
          uri,
          name: `${new Date().getTime()}`,
        },
      ]);
    };
  }, []);

  const handleAddPlace = () => {
    if (!name) {
      return Alert.alert("Error", "Debe ingresar un titulo", [{ text: "OK" }]);
    }
    if (!description) {
      return Alert.alert("Error", "Debe ingresar una descripción", [
        { text: "OK" },
      ]);
    }
    if (!location) {
      return Alert.alert("Error", "Debe marcar la ubicación en el mapa", [
        { text: "OK" },
      ]);
    }
    if (!type) {
      return Alert.alert("Error", "Debe seleccionar un tipo", [{ text: "OK" }]);
    }
    setLoading(() => true);
    createOnePlace({
      variables: {
        data: {
          name,
          description,
          latitude: location.latitude,
          longitude: location.longitude,
          placeTypeId: type.value,
        },
      },
    }).catch((error) => {
      setLoading(() => false);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    });
  };

  const onHandleLocationSelect = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };

  const upload = async () => {
    try {
      setLoading(() => true);
      for (const item of files) {
        const file = await uriToFile(item.uri);
        uploadOnePlaceFile({
          variables: {
            data: {
              file: {
                file,
              },
              placeId: statusCreateOnePlace.data.id,
            },
          },
        }).catch((error) => {
          setLoading(() => false);
          Alert.alert("Error", error.message, [{ text: "OK" }]);
        });
      }
      Alert.alert("Listo!", "El lugar se creo correctamente.", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("MyProfile");
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    } finally {
      setLoading(() => false);
    }
  };

  React.useEffect(() => {
    if (statusCreateOnePlace.data.id) {
      upload();
    }
  }, [statusCreateOnePlace.data]);

  return (
    <>
      <ScrollView style={styles.container1}>
        <Typography type="OpenSans-SemiBold" style={styles.semiBold}>
          Titulo
        </Typography>
        <Separator px={8} />
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setName(() => ev)}
          value={name}
        />
        <Separator px={16} />
        <Typography type="OpenSans-SemiBold" style={styles.semiBold}>
          Tipo de lugar
        </Typography>
        <Separator px={8} />
        <SelectPlaceTypes onValueChange={(value) => setType(() => value)} />
        <Separator px={16} />
        <Typography type="OpenSans-SemiBold" style={styles.semiBold}>
          Ubicación
        </Typography>
        <Typography type="OpenSans-Regular">
          Marcar el lugar en el mapa
        </Typography>
        <Separator px={8} />
        <MapPicker
          onLocation={onHandleLocationSelect}
          initialRegion={initialRegion}
        />
        <Separator px={16} />
        <Typography type="OpenSans-SemiBold" style={styles.semiBold}>
          Subir fotos
        </Typography>
        <Separator px={8} />
        <CardList
          files={files}
          onDelete={(item: any) => {
            setFiles((list) => list.filter((i) => i.name !== item.name));
          }}
        />
        <Separator px={16} />
        <Button
          title="Seleccionar"
          onPress={() => setloadCamera(true)}
          color={colors.colorPrimary}
        />
        {loadCamera ? (
          <ImagePickerPro
            aspect={[16, 9]}
            onImage={handleAddPhoto}
            onCancel={() => setloadCamera(false)}
          />
        ) : null}
        <Separator px={16} />
        <Typography type="OpenSans-SemiBold" style={styles.semiBold}>
          Descripción
        </Typography>
        <Separator px={8} />
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.input}
          onChangeText={(ev) => setDescription(() => ev)}
          value={description}
        />
        <Separator px={16} />
        <Button
          title="Agregar lugar"
          onPress={handleAddPlace}
          color={colors.colorPrimary}
        />
        <Separator px={48} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  semiBold: {
    fontSize: 18,
  },
});

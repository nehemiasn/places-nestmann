import React from "react";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";
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
import { RootTabScreenProps } from "../types";
import { colors } from "../utils/constants";
import { uriToFile } from "../utils/tools";

interface AddPlaceProps extends RootTabScreenProps<"Props"> {}

export const AddPlace: React.FC<AddPlaceProps> = () => {
  const { initialRegion } = React.useContext(AppContext);
  const [title, setTitle] = React.useState<string>("");
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
  const [loadImage, statusLoadImage] = useUploadOnePlaceFileService();

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
    // signup(email, password, comment, lastName);
  };

  const onHandleLocationSelect = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };

  return (
    <>
      <ScrollView style={styles.container1}>
        <Typography type="OpenSans-SemiBold" style={styles.semiBold}>
          Titulo
        </Typography>
        <Separator px={8} />
        <TextInput
          style={styles.input}
          onChangeText={(ev) => setTitle(() => ev)}
          value={title}
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
          onPress={() => {}}
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

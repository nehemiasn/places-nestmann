import React from "react";
import { Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { RootTabScreenProps } from "../types";
import { Separator, Typography, View } from "../components";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ImagePickerPro } from "../components/Business/ImagePickerPro";
import { StoreContext } from "../store/Store";
import { useUploadFileUserService } from "../services/FileService";
import { colors } from "../utils/constants";
import { uriToFile } from "../utils/tools";

interface MyProfileProps extends RootTabScreenProps<"Props"> {}

export const MyProfile: React.FC<MyProfileProps> = (props) => {
  const { navigation } = props;
  const { currentUserStore } = React.useContext(StoreContext);
  const [loadCamera, setloadCamera] = React.useState<boolean>(false);
  const [loadImage, statusLoadImage] = useUploadFileUserService();

  const user = React.useMemo(() => {
    return currentUserStore.user;
  }, [currentUserStore.user]);

  const displayName = React.useMemo(() => {
    return `${user?.firstName} ${user?.lastName}`;
  }, [user]);

  const handleUpload = React.useMemo(() => {
    return async (uri: any) => {
      setloadCamera(false);
      const file = await uriToFile(uri);
      loadImage({
        variables: {
          data: {
            file: {
              file,
            },
          },
        },
      }).catch((err) => {
        // console.log(err);
      });
    };
  }, []);

  const handleGo = (page: any) => {
    navigation.navigate(page);
  };

  React.useEffect(() => {
    if (statusLoadImage.data && user) {
      currentUserStore.update({
        id: user.id,
        imageUrl: statusLoadImage.data,
      });
    }
  }, [statusLoadImage.data]);

  return (
    <View style={styles.page}>
      {loadCamera ? (
        <ImagePickerPro
          onImage={handleUpload}
          onCancel={() => setloadCamera(false)}
        />
      ) : null}
      <View style={styles.container1}>
        <View style={styles.photo}>
          {user?.imageUrl ? (
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 75,
              }}
              source={{ uri: user.imageUrl }}
            />
          ) : null}
          <View style={styles.photoLoad}>
            <TouchableOpacity onPress={() => setloadCamera(true)}>
              <FontAwesome size={24} name="camera" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.photoBack}></View>
      </View>
      <View style={styles.container2}>
        <Typography type="OpenSans-SemiBold" style={styles.name}>
          {displayName}
        </Typography>
        <Separator px={32} />
        <Separator px={0} divider />
        <Button
          title="Mis lugares"
          onPress={() => handleGo("MyPlaces")}
          color={colors.colorPrimary}
        />
        <Separator px={32} />
        <Button
          title="Mis favoritos"
          onPress={() => handleGo("Favorites")}
          color={colors.colorPrimary}
        />
        <Separator px={32} />
        <Button
          title="Agregar lugar"
          onPress={() => handleGo("AddPlace")}
          color={colors.colorPrimary}
        />
        <Separator px={32} />
        <Separator px={32} />
        <Separator px={32} />
        <Button
          title="Cerrar sesion"
          onPress={() => currentUserStore.logout()}
          color={colors.colorPrimary}
        />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container1: {
    maxHeight: 200,
    minHeight: 200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    position: "relative",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: Colors.dark.background,
    zIndex: 2,
  },
  photoLoad: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#cdcdcd",
    backgroundColor: "#cdcdcd",
    zIndex: 2,
  },
  photoBack: {
    top: 0,
    position: "absolute",
    width: "100%",
    height: 130,
    flex: 1,
    backgroundColor: Colors.dark.background,
    zIndex: 1,
  },
  container2: {
    flex: 1,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
  },
});

import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Separator, View } from "../Base";

interface CardListProps {
  files: {
    uri: string;
    name: string;
  }[];
  onClick?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export const CardList: React.FC<CardListProps> = (props) => {
  const { files, onClick, onDelete } = props;

  return (
    <>
      <ScrollView horizontal={true}>
        {files.length
          ? files.map((item) => (
              <View key={item.name} style={styles.item}>
                <View style={styles.card}>
                  <TouchableOpacity
                    onPress={onClick ? () => onClick(item) : () => {}}
                  >
                    <Image style={styles.mapImage} source={{ uri: item.uri }} />
                  </TouchableOpacity>
                </View>
                <Separator px={8} />
                <Button
                  title="Eliminar"
                  onPress={onDelete ? () => onDelete(item) : () => {}}
                  color="red"
                />
              </View>
            ))
          : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 8,
  },
  card: {
    flex: 1,
    minWidth: 256,
    maxWidth: 256,
    minHeight: 144,
    maxHeight: 144,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

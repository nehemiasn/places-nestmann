import React from "react";
import { TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { IPlaceFile } from "../../services/PlaceService";
import { View } from "../Base";

interface CardListPlaceDetailProps {
  files: IPlaceFile[];
  onClick?: (item: any) => void;
}

export const CardListPlaceDetail: React.FC<CardListPlaceDetailProps> = (
  props
) => {
  const { files, onClick } = props;

  return (
    <ScrollView horizontal={true}>
      {files.length
        ? files.map((item) => (
            <View key={item.id} style={styles.item}>
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={onClick ? () => onClick(item) : () => {}}
                >
                  <Image
                    style={styles.mapImage}
                    source={{ uri: item.imageUrl }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        : null}
    </ScrollView>
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

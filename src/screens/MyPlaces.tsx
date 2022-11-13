import React from "react";
import { RootTabScreenProps } from "../types";
import { PlaceCardList } from "../components";
import { StoreContext } from "../store/Store";

interface MyPlacesProps extends RootTabScreenProps<"Props"> {}

export const MyPlaces: React.FC<MyPlacesProps> = (props) => {
  const { navigation } = props;
  const { myPlaces } = React.useContext(StoreContext);
  return <PlaceCardList navigation={navigation} hook={myPlaces} />;
};

import React from "react";
import { PlaceCardList } from "../components/Business/PlaceCardList";
import { StoreContext } from "../store/Store";
import { RootTabScreenProps } from "../types";

interface MyPlacesProps extends RootTabScreenProps<"Props"> {}

export const MyPlaces: React.FC<MyPlacesProps> = (props) => {
  const { navigation } = props;
  const { myPlaces } = React.useContext(StoreContext);
  return <PlaceCardList navigation={navigation} hook={myPlaces} />;
};

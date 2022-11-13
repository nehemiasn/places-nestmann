import React from "react";
import { PlaceCardList } from "../components/Business/PlaceCardList";
import { StoreContext } from "../store/Store";
import { RootTabScreenProps } from "../types";

interface FavoritesProps extends RootTabScreenProps<"Props"> {}

export const Favorites: React.FC<FavoritesProps> = (props) => {
  const { navigation } = props;
  const { viewPlace, favorites } = React.useContext(StoreContext);
  return (
    <PlaceCardList
      navigation={navigation}
      hook={{
        data: favorites,
        ...viewPlace,
      }}
    />
  );
};

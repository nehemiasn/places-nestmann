import React from "react";
import { ApolloServiceError } from "../apollo/hooks";
import { IPlace, IPlaceType } from "../services/PlaceService";
import { useAllPlace, usePlaceTypes, useViewPlace } from "./Place";
import { Ipayload, IUser, useLogin, useCurrentUser, useSignup } from "./User";

interface IStore {
  loginStore: {
    login: (email: string, password: string) => void;
    loading: boolean;
    userAuthToken: Ipayload | undefined;
  };
  currentUserStore: {
    user: IUser | undefined;
    isUserLoaded: boolean;
    update: (update: {
      id: number;
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
    }) => void;
    loading: boolean;
    logout: () => void;
  };
  signupStore: {
    signup: (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => void;
    loading: boolean;
  };
  placeTypes: {
    error: ApolloServiceError | undefined;
    data: IPlaceType[];
    loading: boolean;
  };
  viewPlace: {
    place: IPlace | undefined;
    setPlace: React.Dispatch<React.SetStateAction<IPlace | undefined>>;
  };
  myPlaces: IPlace[];
  favorites: IPlace[];
  allPlace: {
    places: IPlace[];
    placesByType: IPlace[];
    placeType: IPlaceType | undefined;
    setPlaceType: React.Dispatch<React.SetStateAction<IPlaceType | undefined>>;
  };
}

const context: IStore = {
  loginStore: {} as any,
  currentUserStore: {} as any,
  signupStore: {} as any,
  placeTypes: {} as any,
  viewPlace: {} as any,
  myPlaces: [],
  favorites: [],
  allPlace: {} as any,
};

export const StoreContext = React.createContext(context);

export interface StoreProviderProps {
  children: any;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const loginStore = useLogin();
  const currentUserStore = useCurrentUser();
  const signupStore = useSignup();
  const placeTypes = usePlaceTypes();
  const viewPlace = useViewPlace();
  const allPlace = useAllPlace();

  const myPlaces = React.useMemo(() => {
    return allPlace.places.filter(
      (p) => p.userId === currentUserStore.user?.id
    );
  }, [currentUserStore.user, allPlace.places]);

  const favorites = React.useMemo(() => {
    return [];
  }, []);

  return (
    <StoreContext.Provider
      value={{
        loginStore,
        currentUserStore,
        signupStore,
        placeTypes,
        viewPlace,
        myPlaces,
        favorites,
        allPlace,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

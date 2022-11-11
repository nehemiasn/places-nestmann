import React from "react";
import { ApolloServiceError } from "../apollo/hooks";
import { IPlaceType } from "../services/PlaceService";
import { usePlaceTypes } from "./Place";
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
}

const context: IStore = {
  loginStore: {} as any,
  currentUserStore: {} as any,
  signupStore: {} as any,
  placeTypes: {} as any,
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

  return (
    <StoreContext.Provider
      value={{ loginStore, currentUserStore, signupStore, placeTypes }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

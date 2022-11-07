import React from "react";
import { IUser, useAuthStore, useSignupStore } from "./UserStore";

interface IStore {
  userLoggedIn: {
    login: (email: string, password: string) => void;
    user: IUser;
    isUserLoaded: boolean;
    updateUser: (update: {
      firstName?: string | undefined;
      lastName?: string | undefined;
      image?: string | undefined;
    }) => void;
    loading: boolean;
  };
  userRegister: {
    signup: (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => void;
    loading: boolean;
  };
}

const context: IStore = {
  userLoggedIn: {} as any,
  userRegister: {} as any,
};

export const StoreContext = React.createContext(context);

export interface StoreProviderProps {
  children: any;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const userLoggedIn = useAuthStore();
  const userRegister = useSignupStore();

  return (
    <StoreContext.Provider value={{ userLoggedIn, userRegister }}>
      {props.children}
    </StoreContext.Provider>
  );
};

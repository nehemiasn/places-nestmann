import React from "react";
import { StoreContext } from "../store/Store";
import { AppContext } from "./AppProvider";

interface IBusinessContext {}

const context: IBusinessContext = {};

export const BusinessContext = React.createContext(context);

export interface BusinessContextProviderProps {}

export const BusinessContextProvider: React.FC<BusinessContextProviderProps> = (
  props
) => {
  const loadComponent = React.useRef<boolean>(false);
  const { children } = props as any;
  const { setPayload } = React.useContext(AppContext);
  const { loginStore } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (loginStore.userAuthToken) {
      setPayload(() => loginStore.userAuthToken);
    }
  }, [loginStore.userAuthToken]);

  React.useEffect(() => {
    loadComponent.current = true;
    return () => {
      loadComponent.current = false;
    };
  }, []);

  return (
    <BusinessContext.Provider value={{}}>{children}</BusinessContext.Provider>
  );
};

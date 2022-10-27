import React from "react";
import { ILocation } from "../components/Base/GoogleMaps/CurrentPosition";
import { CurrentPosition } from "../components/Base/GoogleMaps";
import { SetterState } from "../types";
import { updateProfile, getProfile } from "../db";

interface IAppContext {
  location: ILocation | undefined;
  // setLocation: SetterState<ILocation | undefined>
  handleGetLocation: (callback?: (l: ILocation) => void) => void;
  imageUri: string | undefined;
  setImageUri: SetterState<string | undefined>;
}

const context: IAppContext = {
  location: undefined,
  handleGetLocation: () => {},
  imageUri: undefined,
  setImageUri: () => {},
};

export const AppContext = React.createContext(context);

export interface AppContextProviderProps {}

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  const loadComponent = React.useRef<boolean>(false);
  const { children } = props as any;
  const { getLocation } = CurrentPosition();
  const [location, setLocation] = React.useState<ILocation>();
  const [imageUri, setImageUri] = React.useState<string>();

  const handleGetLocation = async (callback?: (l: ILocation) => void) => {
    const location: any = await getLocation();
    setLocation(() => ({ ...location }));
    if (callback) {
      callback(location);
    }
  };

  React.useEffect(() => {
    if (imageUri && loadComponent.current) {
      updateProfile("", imageUri || "").catch((err) => {
        console.log(err);
      });
    }
  }, [imageUri]);

  React.useEffect(() => {
    loadComponent.current = true;
    handleGetLocation();
    getProfile()
      .then((res) => {
        if (res.rows._array.length) {
          const row: any = res.rows.item(res.rows.length - 1);
          if (row?.image) {
            setImageUri(() => row.image);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      loadComponent.current = false;
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        location,
        handleGetLocation,
        imageUri,
        setImageUri,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

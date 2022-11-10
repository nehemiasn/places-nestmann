import React from "react";

interface ISynchronizeContext {}

const context: ISynchronizeContext = {};

export const SynchronizeContext = React.createContext(context);

export interface SynchronizeContextProviderProps {}

export const SynchronizeContextProvider: React.FC<
  SynchronizeContextProviderProps
> = (props) => {
  const loadComponent = React.useRef<boolean>(false);
  const { children } = props as any;

  React.useEffect(() => {
    loadComponent.current = true;
    return () => {
      loadComponent.current = false;
    };
  }, []);

  return (
    <SynchronizeContext.Provider value={{}}>
      {children}
    </SynchronizeContext.Provider>
  );
};

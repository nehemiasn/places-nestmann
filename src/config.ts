export type Environment = "LOCAL" | "TEST" | "STAGE" | "PROD";
export enum ENVIRONMENT {
  LOCAL = "LOCAL",
  TEST = "TEST",
  STAGE = "STAGE",
  PROD = "PROD",
}

/**
 * Configuración de ambientes
 */
const DEFAULT_ENV_APP: Environment = ENVIRONMENT.LOCAL;
const CONFIG_ENVIRONMENTS: {
  LOCAL: IConfigEnv;
  PROD: IConfigEnv;
} = {
  LOCAL: {
    apiUrl: `http://localhost:4000`,
  },
  PROD: {
    apiUrl: `http://localhost:4000`,
  },
};

export interface IConfigEnv {
  apiUrl: string;
}
export interface IConfigApp {
  envName: Environment;
  env: IConfigEnv;
}

/**
 * Configuración de la aplicación
 */
export const config: IConfigApp = {
  envName: DEFAULT_ENV_APP,
  env: CONFIG_ENVIRONMENTS[DEFAULT_ENV_APP],
};

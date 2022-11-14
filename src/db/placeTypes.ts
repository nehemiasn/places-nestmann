import { IPlaceType } from "../services/PlaceService";
import { SQLiteDB } from "./create";

export const createPlaceTypes = () => {
  return new Promise((resolve: (result: boolean) => void, reject) => {
    try {
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS placeTypes;`,
          [],
          () => {},
          (_, err) => {
            throw new Error(err.message);
          }
        );
        const createPlaceTypes = () => {
          const id = "id INT NOT NULL";
          const name = "name TEXT NOT NULL";
          const description = "description TEXT";
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS placeTypes (${id}, ${name}, ${description});`,
            [],
            () => resolve(true),
            (_, err) => {
              throw new Error(err.message);
            }
          );
        };
        createPlaceTypes();
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const addPlaceTypes = (
  data: {
    id: number;
    name: string;
    description: string;
  }[]
) => {
  return new Promise((resolve: (result: boolean) => void, reject) => {
    try {
      SQLiteDB.transaction((tx) => {
        for (const iterator of data) {
          const { id, name, description } = iterator;
          tx.executeSql(
            "INSERT INTO placeTypes (id, name, description) VALUES (?, ?, ?);",
            [id, name, description],
            () => {},
            (_, err) => {
              throw new Error(err.message);
            }
          );
        }
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getPlaceTypes = () => {
  return new Promise((resolve: (value: IPlaceType[]) => void, reject) => {
    SQLiteDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM placeTypes",
        [],
        (_, res: any) => {
          if (res.rows.length) {
            resolve(res.rows._array);
          } else {
            resolve([]);
          }
        },
        (_, err) => reject(err) as any
      );
    });
  });
};

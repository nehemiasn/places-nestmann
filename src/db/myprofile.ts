import * as SQLite from "expo-sqlite";
import { IUser } from "../store/UserStore";
import { SQLiteDB } from "./create";

export const addProfile = (user: {
  localId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}) => {
  return new Promise(
    (resolve: (value: SQLite.SQLResultSet) => void, reject) => {
      try {
        const { localId, firstName, lastName, email, password, image } = user;
        SQLiteDB.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO myprofile (localId, firstName, lastName, email, password, image) VALUES (?, ?, ?, ?, ?, ?);",
            [localId, firstName, lastName, email, password, image || ""],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              throw new Error(err.message);
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    }
  );
};

export const getProfile = () => {
  const promise = new Promise(
    (resolve: (value: IUser | undefined) => void, reject) => {
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM myprofile",
          [],
          (_, res) => {
            if (res.rows.length) {
              const row: IUser = res.rows.item(res.rows.length - 1);
              resolve(row);
            } else {
              resolve(undefined);
            }
          },
          (_, err) => reject(err) as any
        );
      });
    }
  );
  return promise;
};

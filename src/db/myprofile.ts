import * as SQLite from "expo-sqlite";
import { IUser } from "../store/UserStore";
import { SQLiteDB } from "./create";

export const addProfile = (data: {
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
        const { localId, firstName, lastName, email, password, image } = data;
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

export const updateProfile = (data: {
  id: number;
  firstName?: string;
  lastName?: string;
  image?: string;
}) => {
  return new Promise((resolve: (value: boolean) => void, reject) => {
    try {
      const { id, firstName, lastName, image } = data;
      if (firstName || lastName || image) {
        const args: string[] = [];
        let params = "";

        if (firstName) {
          params = `${params ? `${params}, ` : params}firstName=?`;
          args.push(firstName);
        }
        if (lastName) {
          params = `${params ? `${params}, ` : params}lastName=?`;
          args.push(lastName);
        }
        if (image) {
          params = `${params ? `${params}, ` : params}image=?`;
          args.push(image);
        }

        SQLiteDB.transaction((tx) => {
          tx.executeSql(
            `UPDATE myprofile SET ${params} WHERE id=?;`,
            [...args, id],
            (_, result) => {
              if (result.rowsAffected) {
                resolve(true);
              } else {
                resolve(false);
              }
            },
            (_, err) => {
              throw new Error(err.message);
            }
          );
        });
      }
    } catch (error) {
      reject(error);
    }
  });
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

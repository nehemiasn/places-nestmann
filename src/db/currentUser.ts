import * as SQLite from "expo-sqlite";
import { IUser } from "../store/User";
import { SQLiteDB } from "./create";

export const addCurrentUser = (data: {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
}) => {
  return new Promise(
    (resolve: (value: SQLite.SQLResultSet) => void, reject) => {
      const { id, firstName, lastName, email, password, imageUrl } = data;
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO currentUser (id, firstName, lastName, email, password, imageUrl) VALUES (?, ?, ?, ?, ?, ?);",
          [id, firstName, lastName, email, password, imageUrl || ""],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            throw new Error(err.message);
          }
        );
      });
    }
  );
};

export const getCurrentUser = () => {
  const promise = new Promise(
    (resolve: (value: IUser | undefined) => void, reject) => {
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM currentUser",
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

export const updateCurrentUser = (data: {
  id: number;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}) => {
  return new Promise((resolve: (value: boolean) => void, reject) => {
    try {
      const { id, firstName, lastName, imageUrl } = data;
      if (firstName || lastName || imageUrl) {
        const args: any[] = [];
        let params = "";

        if (firstName) {
          params = `${params ? `${params}, ` : params}firstName=?`;
          args.push(firstName);
        }
        if (lastName) {
          params = `${params ? `${params}, ` : params}lastName=?`;
          args.push(lastName);
        }
        if (imageUrl) {
          params = `${params ? `${params}, ` : params}imageUrl=?`;
          args.push(imageUrl);
        }

        SQLiteDB.transaction((tx) => {
          tx.executeSql(
            `UPDATE currentUser SET ${params} WHERE id=?;`,
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
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteCurrentUser = (id: number) => {
  return new Promise((resolve: (id: number) => void, reject) => {
    SQLiteDB.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM currentUser WHERE id = ?;",
        [id],
        () => resolve(id),
        (_, err) => reject(err) as any
      );
    });
  });
};

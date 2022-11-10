import * as SQLite from "expo-sqlite";
import { Ipayload } from "../store/User";
import { SQLiteDB } from "./create";

export const addUserAuthToken = (data: {
  userId: number;
  accessToken: string;
  expiration: number;
  refreshToken: string;
}) => {
  return new Promise(
    (resolve: (value: SQLite.SQLResultSet) => void, reject) => {
      const { userId, accessToken, expiration, refreshToken } = data;
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO userAuthToken (userId, accessToken, expiration, refreshToken) VALUES (?, ?, ?, ?);",
          [userId, accessToken, expiration, refreshToken],
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

export const getUserAuthToken = (userId: number) => {
  const promise = new Promise(
    (resolve: (value: Ipayload | undefined) => void, reject) => {
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM userAuthToken WHERE userId=?;",
          [userId],
          (_, res) => {
            if (res.rows.length) {
              const row: Ipayload = res.rows.item(res.rows.length - 1);
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

export const updateUserAuthToken = (data: {
  userId: number;
  accessToken?: string;
  expiration?: number;
  refreshToken?: string;
}) => {
  return new Promise((resolve: (value: boolean) => void, reject) => {
    try {
      const { userId, accessToken, expiration, refreshToken } = data;
      if (accessToken || expiration || refreshToken) {
        const args: any[] = [];
        let params = "";

        if (accessToken) {
          params = `${params ? `${params}, ` : params}accessToken=?`;
          args.push(accessToken);
        }
        if (expiration) {
          params = `${params ? `${params}, ` : params}expiration=?`;
          args.push(expiration);
        }
        if (refreshToken) {
          params = `${params ? `${params}, ` : params}refreshToken=?`;
          args.push(refreshToken);
        }

        SQLiteDB.transaction((tx) => {
          tx.executeSql(
            `UPDATE userAuthToken SET ${params} WHERE userId=?;`,
            [...args, userId],
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

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.nestmann");

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS myprofile (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, image TEXT NOT NULL);",
        [],
        () => resolve(true),
        (_, err) => reject(err) as any
      );
    });
  });
};

export const updateProfile = (name: string, image: string) => {
  return new Promise(
    (resolve: (value: SQLite.SQLResultSet) => void, reject) => {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO myprofile (name, image) VALUES (?, ?);",
            [name, image],
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
    (resolve: (value: SQLite.SQLResultSet) => void, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM myprofile",
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => reject(err) as any
        );
      });
    }
  );
  return promise;
};

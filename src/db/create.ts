import * as SQLite from "expo-sqlite";

export const SQLiteDB = SQLite.openDatabase("places.nestmann");

export const statusSQLiteDB = {
  create: false,
};

export const createDB = () => {
  return new Promise((resolve, reject) => {
    SQLiteDB.transaction((tx) => {
      // tx.executeSql(
      //   "DROP TABLE IF EXISTS myprofile;",
      //   [],
      //   () => resolve(true),
      //   (_, err) => reject(err) as any
      // );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS myprofile (id INTEGER PRIMARY KEY NOT NULL, localId TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, image TEXT NOT NULL);",
        [],
        () => resolve(true),
        (_, err) => reject(err) as any
      );
    });
  });
};

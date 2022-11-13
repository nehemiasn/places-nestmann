import * as SQLite from "expo-sqlite";

export const SQLiteDB = SQLite.openDatabase("places.nestmann");

export const statusSQLiteDB = {
  drop: true,
  create: false,
};

export const createDB = () => {
  return new Promise((resolve, reject) => {
    SQLiteDB.transaction((tx) => {
      const drop = () => {
        if (statusSQLiteDB.drop) {
          const tables = ["userAuthToken", "currentUser"];
          tables.forEach((element) => {
            tx.executeSql(
              `DROP TABLE IF EXISTS ${element};`,
              [],
              () => resolve(true),
              (_, err) => reject(err) as any
            );
          });
        }
      };
      drop();

      const createUserAuthToken = () => {
        const userId = "userId INT NOT NULL";
        const accessToken = "accessToken TEXT NOT NULL";
        const expiration = "expiration INT NOT NULL";
        const refreshToken = "refreshToken TEXT NOT NULL";
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS userAuthToken (${userId}, ${accessToken}, ${expiration}, ${refreshToken});`,
          [],
          () => resolve(true),
          (_, err) => reject(err) as any
        );
      };
      createUserAuthToken();

      const createCurrentUser = () => {
        const id = "id INT";
        const firstName = "firstName TEXT NOT NULL";
        const lastName = "lastName TEXT NOT NULL";
        const email = "email TEXT NOT NULL";
        const imageUrl = "imageUrl TEXT NOT NULL";
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS currentUser (${id}, ${firstName}, ${lastName}, ${email}, ${imageUrl});`,
          [],
          () => resolve(true),
          (_, err) => reject(err) as any
        );
      };
      createCurrentUser();
    });
  });
};

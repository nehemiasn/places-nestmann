import { SQLiteDB } from "./create";

export const createPlaces = () => {
  return new Promise((resolve: (result: boolean) => void, reject) => {
    try {
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS places;`,
          [],
          () => {},
          (_, err) => {
            throw new Error(err.message);
          }
        );
        const createPlaces = () => {
          const json = "json TEXT";
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS places (${json});`,
            [],
            () => resolve(true),
            (_, err) => {
              throw new Error(err.message);
            }
          );
        };
        createPlaces();
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const addPlaces = (json: string) => {
  return new Promise((resolve: (result: boolean) => void, reject) => {
    try {
      SQLiteDB.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO places (json) VALUES (?);",
          [json],
          () => {},
          (_, err) => {
            throw new Error(err.message);
          }
        );
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getPlaces = () => {
  return new Promise((resolve: (value: string) => void, reject) => {
    SQLiteDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, res: any) => {
          if (res.rows.length) {
            const row: any = res.rows.item(res.rows.length - 1);
            resolve(row.json);
          } else {
            resolve("");
          }
        },
        (_, err) => reject(err) as any
      );
    });
  });
};

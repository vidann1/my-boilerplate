import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "example",
    synchronize: true,
    dropSchema: drop,
    entities: ["src/entity/*.*"]
  });
};

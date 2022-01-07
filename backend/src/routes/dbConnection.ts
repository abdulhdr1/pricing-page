import { Sequelize } from "../../node_modules/sequelize";

const dbConnection = new Sequelize({
  dialect: "sqlite",
  host: "./data.sqlite",
});

dbConnection.sync();

export default dbConnection;

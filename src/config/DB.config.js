import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password@123",
  database: "vhitstest",
});

export const connectDb = () => {
  db.connect((err) => {
    if (err) {
      console.log("Database connectivity error: ", err.message);
      return;
    }
    console.log("Database connected.");
  });
};

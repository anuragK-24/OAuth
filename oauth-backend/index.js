const express = require("express");
const login = require("./routers/login");

const app = express();
app.use(express.json());

app.use("/api/login", login);

app.listen(5000, () => console.log("app is running on the server 5000"));

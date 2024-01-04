const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const app = express();
const connectDB = require("./server/Config/Database");
const port = process.env.PORT || 6969;

require("dotenv").config();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/Routes/blogRoutes");

app.use("/", routes);

connectDB.connectDB();
app.listen(port, () => console.log(`Travel app listening on port http://localhost:${port}`))
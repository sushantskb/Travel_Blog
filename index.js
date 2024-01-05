const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const connectDB = require("./server/Config/Database");
const port = process.env.PORT || 6969;

require("dotenv").config();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(cookieParser("BlogItSecure"));
app.use(session({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/Routes/blogRoutes");

app.use("/", routes);

connectDB.connectDB();
app.listen(port, () => console.log(`Travel app listening on port http://localhost:${port}`))
require('dotenv').config({ path: './prod-file' })
const express = require("express");
const flash = require('connect-flash');
const { create } = require("express-handlebars");
const dbConnect = require("./config/database");


const app = express();
app.use(flash());

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", require('./routes/home'));
app.use("/login", require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server andando 🔥 ${PORT}`));
dbConnect();
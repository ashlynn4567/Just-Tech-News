const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// set up session and connect it to our sequelize db
const sess = {
    secret: "Super secret secret",
    // use cookies
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// start session
app.use(session(sess));

const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

// set up handlebars template
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// link public (frontend files) to backend
app.use(express.static(path.join(__dirname, "public")));

const routes = require("./controllers");

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const session = require("express-session");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// link public (frontend files) to backend
app.use(express.static(path.join(__dirname, "public")));
// turn on routes
app.use(routes);
// start session
app.use(session(sess));

// set up handlebars template
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
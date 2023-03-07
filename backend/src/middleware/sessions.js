
const MongoStore = require("connect-mongo");


const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60
});

const sessionOptions = {
    secret: process.env.SECRET,
    cookie: { maxAge: 14 * 24 * 60 * 60, httpOnly: true, signed: true},
    saveUninitialized: true,
    resave: false,
    store: sessionStore

};
module.exports = sessionOptions;
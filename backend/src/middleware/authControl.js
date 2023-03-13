const User = require("../model/user");
const jwt = require("jsonwebtoken");
const db = require("../model/dbModel");
const Role = db.role;

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new Error("Not authorized to access this route", 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(new Error("No user found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new Error("Not authorized to access this route", 401));
  }
};

 const isEmployee = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "employee") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Requires Employee Role!" });
        return;
      }
    );
  });
};

 const isBigBoss = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "bigboss") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Requires Big Boss Role!" });
        return;
      }
    );
  });
};

module.exports = { protect, isEmployee, isBigBoss };
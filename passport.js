const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("./dbQueries/userQueries");
const bcrypt = require("bcryptjs");

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await db.findUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserById(id);
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
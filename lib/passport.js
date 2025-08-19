const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword } = require("./passwordUtils");
const { getUserByUsername, getUserById } = require("./prismaClient");

async function verifyCallback(username, password, done) {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return done(null, false);
    }

    const isValid = await validPassword(password, user.passwordHash);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userid, done) => {
  getUserById(userid)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

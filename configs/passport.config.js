const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Replace with your user model

// Use the local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // or username
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });

        if (!user) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        const isPasswordValid = await user.isValidPassword(password);

        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
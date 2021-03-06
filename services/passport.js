const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = mongoose.model('user');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then(user => {
                if (!user) {
                    return new User({ googleId: profile.id })
                        .save()
                        .then(userSaved => done(null, userSaved));
                }

                done(null, user);
            })
            .catch(err => done(err, null));
    })
);

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id })
            .then(user => {
                if (!user) {
                    return new User({ facebookId: profile.id })
                        .save()
                        .then(userSaved => done(null, userSaved));
                }

                done(null, user);
            });
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null)));
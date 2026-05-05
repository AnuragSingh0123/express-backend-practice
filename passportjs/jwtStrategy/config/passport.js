const passportJWT = require("passport-jwt");
const User = require("../models/User");

const jwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(passport) {
    passport.use(
        new jwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: "SECRET_KEY"
            },
            async (payload, done) => {
                try {
                    const user = await User.findById(payload.id);

                    if(user) {
                        return done(null, user);
                    }

                    return done(null, false);
                } catch(err) {
                    return done(err, false);
                }
            }
        )
    );
};
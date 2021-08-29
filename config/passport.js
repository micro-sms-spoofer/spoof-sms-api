const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/User')
const secret = require('./keys').jwt_scret

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secret

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            await User.findById(jwt_payload._id).then(user => {
                if(user) return done(null, user)
                return done(null, false)
            }).catch(err => {
                console.log(err)
            })
        })
    )
}
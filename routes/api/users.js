const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = require('../../config/keys').jwt_scret
const User = require('../../model/User')


/** 
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', async (req, res) => {
    let { name, username, email, password, confirm_password } = req.body

    if(password != confirm_password) {
        return res.status(400).json({
            msg: 'Password do not match.'
        })
    }

    // Check for the unique Username

    try {
        const user = await User.findOne({username: username})
        if(user){
            return res.status(400).json({
                msg: 'Username already taken.'
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Server error.',
            error
        })
    }




    // Check for the unique Email
    try {
        const user = await User.findOne({email: email})
        if(user){
            return res.status(400).json({
                msg: 'Email is already registered. Did you forget your password?'
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Server error.',
            error
        })
    }


    // The data is valid and new we can regiter the user
    let newUser = new User({
        name, username, email, password,
    })

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err
            newUser.password = hash
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: 'Hurry! User is now registered.'
                })
            })
        })
    })



})

/** 
 * @route POST api/users/login
 * @desc Signning in the User
 * @access Public
 */
router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({username: req.body.username}).then(user => {
            if(!user){
                return res.status(404).send({
                    msg: 'Username is not found.',
                    success: false
                })
            }
    
            // If there is user we are now going to compare password
            bcrypt.compare(req.body.password, user.password).then(isMatch =>{
                if(!isMatch){
                    return res.status(404).send({
                        msg: 'Incorrect password.',
                        success: false
                    })
                } else {
                    // User password is correct and send the JWT to user
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        name: user.name,
                        email: user.email
                    }
    
                    jwt.sign(payload, secret, {expiresIn: 604800}, (err, token) => {
                        res.status(200).json({
                            success: true,
                            token: `Bearer ${token}`,
                            user: {
                                _id: user._id,
                                username: user.username,
                                email: user.email
                            },
                            msg: 'Hurry! You are now logged in.'
                        })
                    })
    
                }
            })
    
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Server error.',
            error
        })
    }


})

/** 
 * @route GET api/profile
 * @desc Return user profile
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', { session: false} ) ,(req, res) => {
    return res.json({
        user: {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email
        }
    })
})




module.exports = router
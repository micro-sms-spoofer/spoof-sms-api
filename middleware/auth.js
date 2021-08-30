module.exports.validateXUsername = (req, res, next) => {
    const username = req.headers['x-username'];
    if(username === req.user.username){
        next()
    } else {
        return res.status(404).json({
            success: false,
            msg: 'Fuck you!! Try to hack me?'
        })
    }
}
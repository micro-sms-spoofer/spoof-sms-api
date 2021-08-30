const express = require('express')
const router = express.Router()
const Log = require('../../model/Log')
const passport = require('passport')
const NexmoService = require('../../services/nexmo')
const validateSmsBody = require('../../validate/sms')
const validateXUsernameMiddleware = require('../../middleware/auth')

/** 
 * @route POST api/sms/send
 * @desc Send Spoof SMS
 * @access Private
 */
 router.post('/send', passport.authenticate('jwt', { session: false} ), validateXUsernameMiddleware.validateXUsername , async (req, res) => {
    const data = validateSmsBody.validate(req.body)
    if(data.error){
        return res.status(400).json({
            msg: 'Invalid body request.',
            details: data.error.details,
            success: false
        })
    }else{

        let log = new Log({
            username: req.user.username,
            message: data.value.text,
            victim: data.value.to
         })

        try {
            const response = await NexmoService.sendSms(data.value)
            log.save()
            res.json({
                success: true,
                msg: response.data
            })
        } catch (error) {
            log.send_status = false
            log.save()
            return res.status(500).json({
                msg: error.message,
                success: false
            })
        }
    }
   
})

module.exports = router
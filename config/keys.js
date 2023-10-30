module.exports = {
    mongo_uri: "mongodb://localhost:27017/spoof_sms_service",
    jwt_scret: '-------------------------',
    nexmo: {
        url: 'https://rest.nexmo.com/sms/json',
        method: 'POST',
        api_key: '-------------------------',
        api_secret: '-------------------------'
    },
    mailgun: {
        url: 'https://api.mailgun.net/v3/mail.unknownclub.net/messages',
        method: 'POST',
        username: 'api',
        password: '-------------------------'
    }
}

const axios = require('axios')
const nexmo = require('../config/keys').nexmo

class NexmoService {

    static async sendSms(body){
        const config = {
            method: nexmo.method.toLowerCase(),
            url: nexmo.url,
            data: {
                api_key: nexmo.api_key,
                api_secret: nexmo.api_secret,
                from: body.from,
                to: body.to,
                text: body.text
            }
        }
        try {
            const res = await axios(config)
            return res
        } catch (error) {
            throw new Error('[NexmoService] Something goes wrong' + error);
        }
    }
}

module.exports = NexmoService

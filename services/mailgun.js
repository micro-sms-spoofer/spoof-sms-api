const axios = require('axios')
const mailgun = require('../config/keys').mailgun
const FormData = require('form-data');

class MailgunService {

    static async sendMailConfirmAccount(body){
        //console.log(body)
        let bodyFormData = new FormData();
        bodyFormData.append('from', 'Registration confirmation <noreply@unknownclub.net>')
        bodyFormData.append('to', body.to)
        bodyFormData.append('subject', 'Registration confirmation')
        bodyFormData.append('text', body.text)

        const config = {
            method: mailgun.method.toLowerCase(),
            url: mailgun.url,
            auth: {
                username: mailgun.username,
                password: mailgun.password
              },
              headers: {
                'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`,
            },
            data: bodyFormData
        }
        try {
            const res = await axios(config)
            //console.log(res)
            return res
        } catch (error) {
            //console.log(error)
            throw new Error('[MailgunService] Something goes wrong' + error);
        }
    }
}

module.exports = MailgunService
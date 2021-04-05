'use strict';

const config = require('../config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgridKey);
exports.send = async (to, subject, body) => {

    const msg = {
        to: to,
        from: 'gabrielsabanaitrindade@gmail.com', // Use the email address or domain you verified above
        subject: subject,
        text: body,
        html: body,
    };
    // //ES6
    // sgMail
    //     .send(msg)
    //     .then(() => { }, error => {
    //         console.error(error);

    //         if (error.response) {
    //             console.error(error.response.body)
    //         }
    //     });
    //ES8
    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();
}



// const sendgrid = require('sendgrid')(config.sendgridKey);

// exports.send = async (to, subject, body) => {
//     sendgrid.send({
//         to: to,
//         from: 'gabrielsabanaitrindade@gmail.com',
//         subject: subject,
//         html: body
//     });
// }
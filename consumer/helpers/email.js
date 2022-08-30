const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION || "us-east-1"});

module.exports = ( { sender, recipient, subject, body, html } ) => {
    try {
        const ses = new AWS.SES();
        const charset = "UTF-8";
        const params = {
            Source: sender,
            Destination: {
                ToAddresses: [ recipient ]
            },
            Message: {
                Subject: {
                    Data: subject,
                    Charset: charset
                },
                Body: {
                    Text: {
                        Data: body || '',
                        Charset: charset
                    },
                    Html: {
                        Data: html || '',
                        Charset: charset
                    }
                }
            }
        }
    
        ses.sendEmail(params, (err, data) => {
            err ? console.log(err, err.stack) : console.log(data);
        });
    } catch (error) {
        console.log(error);
    }
};

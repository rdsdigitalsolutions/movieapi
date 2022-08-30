const dotenv = require('dotenv');
const queue = require("./helpers/queue");
const email = require("./helpers/email");

dotenv.config({ path: './.env' });
const queueName = 'movies';

queue( { 
    queueName, 
    listener: ( message ) => {
        const notification = JSON.parse( message.content.toString() ||"{}" );
        console.log('\n\n ----------------------------- \n', 'New message:','\n' , notification.message, '\n' , notification.document);

        // Ensure you have the correct AWS credentials set in the .env then remove comment.
        // email( {
        //     sender: process.env.EMAIL_SENDER,
        //     recipient: process.env.EMAIL_SENDER,
        //     subject: notification.message,
        //     body: `There has been a new interaction with the api.`,
        //     html: `<html><body> <p> There has been a new interaction with the api. </p> <p>${notification.document}</p> </body></html>`,
        // } );
    } 
} );

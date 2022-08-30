const amqplib = require('amqplib/callback_api');

module.exports = ( { queueName, message, listener, callback } ) => {
    amqplib.connect(process.env.AMQP_URL, (err, conn) => {
        if (err) throw err;

        if ( listener ) {
            conn.createChannel((err, ch2) => {
                if (err) throw err;
                ch2.assertQueue(queueName);
                ch2.consume(queueName, listener);
                callback ? callback() : null;
            });
        }
      
        if ( message && typeof message === 'string' ) {
            conn.createChannel((err, ch1) => {
                if (err) throw err;
            
                ch1.assertQueue(queueName);
                ch1.sendToQueue(queueName, Buffer.from(message));
                callback ? callback() : null;
            });
        }
    });
}

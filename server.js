const _notification = require('./notification');


tryAmqp();

 async function tryAmqp() {
 	const conn = await require('amqplib').connect('amqp://localhost');
 	const ch = await conn.createChannel();
 	const notification = new _notification(ch)
 	try {
	 	await notification.notify('NEW_DATA', 'telegram', 'YOUR_CHAT_ID', {
	 		content: 'somecontent',
	 		timestamp: new Date
	 	})
 	} catch(err) {
 		console.error(err)
 		process.exit(1)
 	}
 }
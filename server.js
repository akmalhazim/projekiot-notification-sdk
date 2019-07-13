const _notification = require('./notification');


tryAmqp();

 async function tryAmqp() {
 	const conn = await require('amqplib').connect('amqp://localhost');
 	const ch = await conn.createChannel();
 	const notification = new _notification(ch)
 	notification.setAdmin([{
	 		driver: 'telegram',
	 		recipient: '-1001423477185'
	}])
 	try {
	 	await notification.notify('NEW_DATA', 'telegram', notification.getAdmin('telegram'), {
	 		content: 'somecontent',
	 		timestamp: new Date
	 	})
 	} catch(err) {
 		console.error(err)
 		process.exit(1)
 	}
 }
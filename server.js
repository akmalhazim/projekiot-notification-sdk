const notification = require('./notification');

// amqp setup
require('amqplib/callback_api')
  .connect('amqp://localhost', function(err, conn) {
   	const ch = conn.createChannel(function(err, ch) {
   		const noti = new notification(ch, 'notifications')
   		setInterval(function() {
   			noti.notify('NEW_DATA', 'telegram', '', {
   				humidity: Math.random(3,10),
   				temp: Math.random(100,200)
   			})
   				.then(res => {
   					// 
   				})
   				.catch(err => {
   					console.error(err)
   				})
   		}, 500)
   	})
    
  });
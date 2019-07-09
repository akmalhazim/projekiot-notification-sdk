class Notification {
	/**
	 * Construct the AMQPlib instance
	 */

	constructor(ch) {
		this.ch = ch
		this.queue = 'notifications'
	}

	notify(type, driver, recipient, json, options = {}) {
		return new Promise((resolve, reject) => {
			if(!this.queue) {
				var queue = options.queue
			} else {
				var queue = this.queue
			}
			this.ch.assertQueue(queue)
			this.ch.sendToQueue(queue, Buffer.from(JSON.stringify(json)), {
				contentType: 'application/json',
				headers: {
					driver: driver,
					type: type,
					recipient: recipient,
					options
				}
			})
			resolve()
		})
		
	}
}

module.exports = Notification;
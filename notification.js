class Notification {
	/**
	 * Construct the AMQPlib instance
	 */

	constructor(ch) {
		this.ch = ch
		this.queue = 'notifications'
	}

	notify(type, driver, recipient, json, options = {}) {
		return new Promise(async (resolve, reject) => {
			if(!this.queue) {
				var queue = options.queue
			} else {
				var queue = this.queue
			}
			await this.ch.assertQueue(queue)
			const timer = 500
			await delay(timer)
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

function delay(ms) {
	return new Promise(async function(resolve, reject) {
		setTimeout(() => resolve(), ms);
	})
}

module.exports = Notification;
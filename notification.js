class Notification {
	/**
	 * Construct the AMQPlib instance
	 */

	constructor(ch) {
		this.ch = ch
		this.queue = 'notifications'
		this.admin = []
	}

	notify(type, driver, recipient, json, options = {}) {
		return new Promise(async (resolve, reject) => {
			if(!this.queue) {
				var queue = options.queue
			} else {
				var queue = this.queue
			}
			await this.ch.assertQueue(queue)
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

	// admin

	setAdmin(payload = []) {
		for(let i = 0; i < payload.length; i++) {
			this.admin[payload[i].driver] = payload[i].recipient
		}
	}

	getAdmin(driver) {
		return this.admin[driver]
	}


}

function delay(ms) {
	return new Promise(async function(resolve, reject) {
		setTimeout(() => resolve(), ms);
	})
}

module.exports = Notification;
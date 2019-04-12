const fetch = require('node-fetch')

const config = require('./config.js')
const HTTPEndpoint = config.APIENDPOINT

class HTTPConn {
	constructor(prepareBoard){
		this.prepareBoard = prepareBoard
	}
	getBoard() {
		const route = `/board`
		fetch(HTTPEndpoint + route)
		.then(response => response.arrayBuffer())
		.then(bufferData => {
			const pixelArray = Array.prototype.slice.call(new Uint8ClampedArray(bufferData))
			this.prepareBoard(pixelArray)
		})
	}

	setTile(x, y, c) {
			fetch(HTTPEndpoint + `/tile?x=${x}&y=${y}&c=${c}`, {
				method: 'Post',
				mode: 'no-cors',
			})
			.then(response => response)
	}
}

module.exports = HTTPConn

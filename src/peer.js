import { reactive } from "vue";
import { Peer } from "peerjs";

export const peerState = reactive({
	connected: false,
	fooEvents: [],
	barEvents: [],
	users: null
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:9020";
// const URL = "http://localhost:9020";

const env = window.envVars.myEnvironmentVariable
const host = env === "DEV" ? "localhost" : "213.171.3.87";

const options = {
	debug: 2,
    path: '/myapp',
    // host: 'localhost',
    // host: '213.171.3.87',
	host,
    port: '9021',
	config: {
		'iceServers': [
			{ 'urls': 'stun:stun.l.google.com:19302' },
			{
				'urls': 'turn:213.171.3.87:3478',
				'username': 'password',
				"credential": "tE2DajzSJwnsSbc123"
			}
		],
		'sdpSemantics': 'unified-plan'
	}
}
export const peer = new Peer(null, options);

// export const peerAction = {
// 	reconnect () {
// 		peer.destroy()
// 	}
// }
  
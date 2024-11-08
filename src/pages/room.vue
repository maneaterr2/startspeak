<template>
	<main>
		<div class="container">
			<Topnav />
			<div class="main_window">
				<users-list />
				<room-users-list />
				<div class="room_main">
					Комната
					<audio id="audio" controls></audio>
					<button v-if="in_room" class="btn" @click="stop">stop</button>
					<button v-else class="btn" @click="start">start</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import Topnav from '../components/topNav.vue'
import UsersList from '../components/userslist/index.vue'
import RoomUsersList from '../components/room/userlist.vue'
import { socket, state } from "../socket";
// import { state } from "../socket";
import { peer } from "../peer";
import { roomAction, roomState } from "../room";
// import { roomState } from "../room";
export default {
	components: {
		Topnav,
		UsersList,
		RoomUsersList
	},
	data() {
		return {
			socket: null,
			users: null,
			constraints: null,
			stream: null,
			in_room: false,
			analizer: null,
			source: null,
			maxHeight: null
		}
	},
	computed: {
	},
	mounted () {
        // socket.on("users_list", (...args) => {
        //     console.log('[SOCKET LOGIN]');
        //     console.log(args);
		// 	this.users = null
		// 	this.users = args[0]
        // });
		// console.log(this.stream);
		this.setConstraints()
		this.checkMeInRoom()
		peer.on('call', (call) => {
			call.answer(this.stream);
			call.on('stream', (userVideoStream) => {
				// this.addVideoStream(call.peer, userVideoStream);
				const obj = { peer: call.peer, stream: userVideoStream}
				console.log(userVideoStream);
				
				roomAction.setUsers(obj)
			});
			call.on('close', () => {
				console.log('[pEER] close connection');
				
			})
			console.log('[PEER CALL FIRE]');
		});
	},
	methods: {
		setConstraints () {
			this.constraints = window.constraints = { audio: true, video: false }
		},
		async checkMeInRoom() {
			if (state.rooms) {
				const room = state.rooms.find(e=>e.name==this.$route.query.color).peers
				// console.log(room);
				const me = await this.getUser()
				// console.log(me);
				const im_in = room.find(e=>e == me.peer_id)
				if (im_in) {
					this.in_room = true
				}
			}
		},
		async getUser () {
			try {
				const response = await window.electronAPI.getUser()
				return response.data
			} catch (error) {
				console.log(error);
			}
		},
		voiceAnalize () {
			if (this.stream && roomState.in_room_state ) {
				this.analyser.fftSize = 2048;
				var bufferLength = this.analyser.frequencyBinCount;
				const dataArray = new Uint8Array(bufferLength);
				this.analyser.getByteTimeDomainData(dataArray);
				let maxHeight = 0 
				let HEIGHT = 200;
				for (var i = 0; i < bufferLength; i++) {
					var v = dataArray[i] / 128.0;
					var y = (v * HEIGHT) / 2;
					if (y > maxHeight) {
						maxHeight = y
					}
				}
				this.maxHeight = maxHeight
				const obj = {
					voice: maxHeight > 101 ? true : false
				}
				socket.emit('voice', obj)
				setTimeout(() => {
					// console.log('[voice analize]');
					this.voiceAnalize()
				}, 50);
			} else {
				this.analizer = null
			}
		},
		async start() {
			try {
				this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
				// console.log(this.stream);
				const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
				this.analyser = audioCtx.createAnalyser();
				this.source = audioCtx.createMediaStreamSource(this.stream);
				this.source.connect(this.analyser);

				this.voiceAnalize()

				this.handleSuccess();
				this.in_room = true
			} catch (e) {
				this.handleError(e);
			}
		},
		stop () {
			if (this.stream) {
				this.stream.getTracks().forEach((track) => {
					track.stop()
				})
			}
			this.stream = null
			const obj = {
				room: this.$route.query.color,
				peer_id: peer.id
			}
			socket.emit('leaveRoom', obj)
			roomAction.usersRemoveStream()
			this.in_room = false
		},
		handleSuccess() {
			// const video = document.querySelector('#video');
			// const audio = document.querySelector('#audio');
			// const videoTracks = this.stream.getVideoTracks();
			// console.log('Got stream with constraints:', this.constraints);
			// console.log(`Using video device: ${videoTracks[0].label}`);
			// window.stream = this.stream; // make variable available to browser console
			// video.srcObject = this.stream;
			// console.log(this.stream);
			// video.play();
			if (!peer.id) {
				peer.reconnect()
			}
			const calldata = {
				room: this.$route.query.color,
				peer: peer.id,
				stream: null
			}
			// roomAction.setUsers(calldata)
			socket.emit('call', calldata, (response) => {
				console.log({response});
				response.forEach(element => {
					const call = peer.call(element, this.stream)
					call.on("stream", (remoteStream) => {
						console.log('[NEW ROOM MEMBER]');
						
						// Show stream in some video/canvas element.
						const obj = { peer: call.peer, stream: remoteStream}
						roomAction.setUsers(obj)
						// this.addVideoStream(call.peer, remoteStream)
						// this.users
					});
				});
			})

			// const audioTracks = this.stream.getAudioTracks();
			// console.log('Using audio device: ' + audioTracks[0].label);
			// audio.srcObject = this.stream;
			// audio.play()
		},
		handleError(error) {
			if (error.name === 'OverconstrainedError') {
				const v = this.constraints.video;
				console.log(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
			} else if (error.name === 'NotAllowedError') {
				console.log('Permissions have not been granted to use your camera and ' +
				'microphone, you need to allow the page access to your devices in ' +
				'order for the demo to work.');
			}
			console.log(`getUserMedia error: ${error.name}`, error);
		},
		addUser (id, stream) {
			console.log(`[STREAM ID] ${stream.id}`);
			const needUpdate = this.users.find(e=>e.id == id)
			if (!needUpdate) {
				this.last_added_video_id = id

				const obj = {
					id: id,
					stream: stream
				}

				this.users.push(obj)
				console.log('[FIRE addUser]');
			} else {
				needUpdate.stream = stream
				const arr = needUpdate.stream.getTracks()
				console.log(arr);

				console.log('[FIRE addUser DOUBLE]');
			}
		},
		addVideoStream (id, stream) {
			console.log(`[STREAM ID] ${stream.id}`);
			const needUpdate = this.video.find(e=>e.id == id)
			// const getVideoEl = document.querySelector(`[data-peer="${id}"]`)
			// if (this.last_added_video_id != id && !getVideoEl) {
			if (!needUpdate) {
				this.last_added_video_id = id
				// const video = document.createElement('video');
				// video.setAttribute('data-peer', id)
				// video.srcObject = stream;
				// video.addEventListener('loadedmetadata', () => {
				// 	video.play();
				// 	const videoGrid = document.querySelector('.video-grid');
				// 	videoGrid.append(video);
				// });

				const obj = {
					id: id,
					stream: stream
				}
				this.video.push(obj)
				console.log('[FIRE addVideoStream]');
			} else {
				// needUpdate.stream = null
				needUpdate.stream = stream
				const arr = needUpdate.stream.getTracks()
				console.log(arr);

				// getVideoEl.srcObject = null
				// getVideoEl.srcObject = stream
				console.log('[FIRE addVideoStream DOUBLE]');
			}
			
		},
	}
}
</script>

<style lang="scss" scoped>
.main_window{
	display: flex;
	gap: 10px;
	align-items: stretch;
}
.room_main{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 10px;
	color: #7F91A4;
}
.room_row{
	display: flex;
	gap: 10px;
	width: 100%;
	height: 50%;
	div{
		width: 50%;
	}
}
#audio{
	display: none;
}

</style>
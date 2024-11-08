<template>
	<main>
		<div class="container">
			<Topnav 
				:online="users_online"
				:offline="users_offline"
			/>
			<div class="main_window">
				<users-list
					:users="users"
				/>
				<div class="room_main">
					<div class="room_row">
						<room
							title="Зелёная комната"
							color="#34B750"
							@click="$router.push('/room?color=green')"
							:count="members.green"
						/>
						<room
							title="Жёлтая комната"
							color="#E3D51E"
							@click="$router.push('/room?color=yellow')"
							:count="members.yellow"
						/>
					</div>
					<div class="room_row">
						<room
							title="Красная комната"
							color="#E31E1E"
							@click="$router.push('/room?color=red')"
							:count="members.red"
						/>
						<room
							title="Синяя комната"
							color="#1E54E3"
							@click="$router.push('/room?color=blue')"
							:count="members.blue"
						/>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import Topnav from '../components/topNav.vue'
import UsersList from '../components/userslist/index.vue'
import Room from '../components/rooms/index.vue'
import { state } from "../socket";
import { roomAction } from "../room";
export default {
	components: {
		Topnav,
		UsersList,
		Room
	},
	data() {
		return {
			socket: null,
			users: null,
			in_room: true
		}
	},
	computed: {
		users_online () {
			if (state.users) {
				const online = state.users.filter((e)=>e.online)
				return `${online.length}`
			} else {
				return '0'
			}
		},
		users_offline () {
			if (state.users) {
				const offline = state.users.filter((e)=>!e.online)
				return `${offline.length}`
			} else {
				return '0'
			}
		},
		members () {
			const obj = {
				red: 0,
				blue: 0,
				green: 0,
				yellow: 0
			}
			if (state.rooms) {
				obj.red = state.rooms.find(e=>e.name=='red').peers.length
				obj.green = state.rooms.find(e=>e.name=='green').peers.length
				obj.yellow = state.rooms.find(e=>e.name=='yellow').peers.length
				obj.blue = state.rooms.find(e=>e.name=='blue').peers.length
			}
			return obj
		}
	},
	mounted () {
		// this.createSocket()
		// socket.connect()
		// socket.emit('addUserOnline')
        // socket.on("users_list", (...args) => {
        //     // state.fooEvents.push(args);
        //     console.log('[SOCKET LOGIN]');
        //     console.log(args);
			
		// 	this.users = null
		// 	this.users = args[0]
        // });
		roomAction.switchRoomState(true)
	},
	// beforeUnmount () {
	// 	socket.disconnect()
	// },
	// beforeUnmount () {
	// 	roomAction.switchRoomState(false)
	// },
	methods: {
		// createSocket () {
		// 	const socket_url = 'ws://localhost:9020'
		// 	this.socket = new WebSocket(socket_url)
		// 	// this.socket.onmessage((event)=> {
		// 	// 	console.log(`[SOCKET] ${event}`);
				
		// 	// })
		// 	this.socket.onmessage = (event) => {
		// 		const response = JSON.parse(event.data)
		// 		if (response.type == 'users') {
		// 			this.users = null
		// 			this.users = response.data
		// 		}
		// 		console.log(`[SOCKET] ${event}`);
		// 	};
		// }
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
</style>
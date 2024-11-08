<template>
	<div class="userslist">
		<template v-if="users_list">
			<user v-for="user in users_list" :key="user.peer_id" :online="user.online" :voice="user.voice" :name="user.name" :stream="user.stream" :id="user.peer_id"/>
		</template>
	</div>
</template>

<script>
import User from './user.vue'
import { state } from "../../socket";
import { roomState } from "../../room";

export default {
	components: {
		User
	},
	props: {
		users: {
			type: Array,
			default: null
		}
	},
	computed: {
		users_list () {
			// console.log('[ROOM] userlist comp fire');
			
			// console.log(roomState.users);
			if (state.rooms) {
				const room = state.rooms.find(e=>e.name==this.$route.query.color).peers
				const arr = []
				room.forEach(element => {
					const obj = {
						name: 'player',
						peer_id: element,
						stream: null,
						voice: false
					}
					const user = state.users.find(e=>e.peer_id==element)
					if (user) {
						obj.name = user.name
						obj.voice = user.voice
					}
					const stream = roomState.users.find(e=>e.peer==element)
					if (stream) {
						obj.stream = stream.stream
					}
					arr.push(obj)
				});

				// return users
				// console.log(room);
				
				return arr
			} else {
				return false
			}
			
		}
	}
}
</script>

<style lang="scss" scoped>
.userslist{
	border-radius: 10px;
	height: 340px;
	width: 160px;
	min-width: 160px;
	background-color: #242F3D;
	padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
	/* overflow-y: auto; */
	&:-webkit-scrollbar {
		display: none;
	}
}
</style>
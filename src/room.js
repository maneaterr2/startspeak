import { reactive } from "vue";

export const roomState = reactive({
    users: [],
	in_room_state: true
});
  
export const roomAction = {
	setUsers (data) {
		console.log(`[ROOM ACTION] ${data.peer}`);
		
		const user = roomState.users.find((e) => e.peer == data.peer)
		
		console.log(`[ROOM ACTION] ${user}`);
		if (user) {
			if (data.stream) {
				user.stream = data.stream
			}
		} else {
			roomState.users.push(data)
		}
		
	},
	usersRemoveStream () {
		roomState.users.forEach(element => {
			if (element.stream) {
				element.stream = null
			}
		});
	},
	switchRoomState (data) {
		console.log(`[ROOM ACTION] switchRoomState ${data}`);
		roomState.in_room_state = data
	}
}
  
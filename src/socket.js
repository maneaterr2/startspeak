import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
	connected: false,
	users: null,
	rooms: null
});

const env = window.envVars.myEnvironmentVariable
// "undefined" means the URL will be computed from the `window.location` object
const URL = env === "DEV" ? "http://localhost:9020" : "http://213.171.3.87:9020";
// const URL = "http://localhost:9020";

// console.log(`ENV: ${window.envVars.myEnvironmentVariable}`)

// const URL = "http://213.171.3.87:9020";

export const socket = io(URL);

socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

socket.on("users_list", (...args) => {
    // console.log('[SOCKET] users_list');
    state.users = null;
    state.users = args[0];
});

socket.on("get_rooms_users", (...args) => {
    console.log('[SOCKET] add_user_to_room');
    state.rooms = null;
    state.rooms = args[0];
});

<template>
	<section class="login-wrap">
		<div class="login-window">
			<div class="error" v-if="server_error">
				сервер не доступен
			</div>
			<div class="logo"></div>
			<div v-if="error" class="error">
				Ник впиши ёпта
			</div>
			<form @submit="validate">
				<div style="margin: 20px 0">
					<Input v-model="name" placeholder="впиши ник" />
				</div>
				<div class="login-btn-bar">
					<button class="btn" >погнали</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import Input from '../components/form/input.vue'
import { socket, state } from "../socket";
import { peer } from "../peer";
import { roomAction } from "../room";
export default {
	components: {
		Input
	},
	data() {
		return {
			name: '',
			user: null,
			error: false,
			server_error: false
		}
	},
	mounted () {
		socket.disconnect()
		// socket.connect()
		this.getUser()
		console.log(peer.id);
		roomAction.switchRoomState(false)
	},
	methods: {
		async getUser () {
			try {
				const response = await window.electronAPI.getUser()
				console.log(response);
				this.name = response.data.name
				this.user = response.data
			} catch (error) {
				console.log(error);
			}
		},
		async setUser () {
			try {
				const params = {
					name: this.name,
					peer_id: peer.id
				}
				const response = await window.electronAPI.setUser(params)
				console.log(response);
				const obj = {
					user_uniq_id: response.id,
					name: response.name,
					peer_id: peer.id
				}
				this.user = obj
			} catch (error) {
				console.log(error);
			}
		},
		async updateUser () {
			try {
				const obj = {
					user_uniq_id: this.user.user_uniq_id,
					name: this.name,
					peer_id: peer.id
				}
				const response = await window.electronAPI.updateUser(obj)
				this.user.name = response.name
			} catch (error) {
				console.log(error);
			}
		},
		async validate (e) {
			e.preventDefault()
			if (this.name != '') {
				if (this.user.name == this.name) {
					console.log('connect fire');
					
					this.connect()
				} else if (this.user.name != this.name && this.user.user_uniq_id != '') {
					console.log('updateUser fire');
					await this.updateUser()
					this.connect()
				} else {
					console.log('setUser fire');
					await this.setUser()
					this.connect()
				}
			} else {
				this.error = true
				setTimeout(() => {
					this.error = false
				}, 2000);
			}
		},
		connect () {
			socket.connect()
			socket.on("connect", async () => {
				// state.connected = true;
				if (!peer.id) {
					peer.reconnect()
				}
				if (state.connected) {
					const obj ={
						user_id: this.user.user_uniq_id,
						name: this.user.name,
						peer_id: peer.id,
					}
					await this.updateUser()
					socket.emit('addUserOnline', obj)
					this.$router.push('/dashboard')
				} else {
					this.server_error = true
					setTimeout(() => {
						this.server_error = false	
					}, 4000);
				}
			});
			
		}
	}
}
</script>

<style lang="scss" scoped>
.login-wrap{
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #242F3D;
}
.logo{
	background-image: url('../assets/logo.png');
	width: 219px;
	height: 89px;
}
.login-btn-bar{
	text-align: center;
}

</style>
<template>
	<div class="userslist">
		<template v-if="users_list">
			<user v-for="user in users_list" :key="user.socket_id" :online="user.online" :name="user.name"/>
		</template>
	</div>
</template>

<script>
import User from './user.vue'
import { state } from "../../socket";

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
			return state.users
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
	/* overflow-y: auto; */
	&:-webkit-scrollbar {
		display: none;
	}
}
</style>
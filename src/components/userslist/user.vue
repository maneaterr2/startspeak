<template>
	<div class="user">
		<player-icon :color="iconColor" />
		<div :class="[online?'user_online': 'user_offline']">
			{{ name }}
		</div>
	</div>
</template>

<script>
import PlayerIcon from '../icons/player.vue'
export default {
	components: {
		PlayerIcon
	},
	props: {
		online: {
			type: Boolean,
			default: false
		},
		name: {
			type:String,
			default: 'player'
		}
	},
	computed: {
		iconColor () {
			if (this.online) {
				return '#21A0A0'
			} else {
				return '#7F91A4'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.user{
	display: flex;
	gap: 6px;
	align-items: center;
	overflow: hidden;
}
.user_online{
	color: #fff;
}
.user_offline{
	color: #7F91A4;
}
</style>
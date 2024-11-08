<template>
	<div class="user">
		<micro-icon :color="iconColor" style="min-width: 19px"/>
		<div :class="[online?'user_online': 'user_offline']">
			{{ name }}
		</div>
		<audio class="audio" :id="audioId" controls :srcObject="stream" autoplay></audio>
	</div>
</template>

<script>
import MicroIcon from '../icons/micro.vue'
export default {
	components: {
		MicroIcon
	},
	props: {
		id: {
			type: String,
			default: ''
		},
		online: {
			type: Boolean,
			default: false
		},
		voice: {
			type: Boolean,
			default: false
		},
		name: {
			type:String,
			default: 'player'
		},
		stream: {
			type: MediaStream,
			default: null
		}
	},
	computed: {
		iconColor () {
			if (this.voice) {
				// return '#21A0A0'
				return '#0BB052'
			} else {
				return '#7F91A4'
			}
		},
		audioId () {
			return `${this.id}_audio`
		},
		mediaStream () {
			if (this.stream) {
				console.log(this.stream);
				this.stream.onactive = this.setActive()
				this.stream.oninactive = this.setInactive()
				
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		setActive () {
			this.online = true
		},
		setInactive () {
			this.online = false
		},
	}
}
</script>

<style lang="scss" scoped>
.user{
	display: flex;
	gap: 6px;
	align-items: center;
	justify-content: flex-start;
	overflow: hidden;
}
.user_online{
	color: #fff;
}
.user_offline{
	color: #7F91A4;
}
.audio{
	display: none;
}
</style>
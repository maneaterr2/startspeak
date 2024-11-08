<template>
	<div class="settings_keys">
		<div class="menu_item" :class="[active=='microphone'?'active': '']" @click="setActiveTab('microphone')">
			Микрофон
		</div>
		<div class="menu_item" :class="[active=='radioset'?'active': '']" @click="setActiveTab('radioset')">
			Режим рации
		</div>
	</div>
</template>

<script>
export default {
	// components: {
	// 	User
	// }
	props: {
		active: {
			type: String,
			default: 'microphone'
		}
	},
	methods: {
		setActiveTab (val) {
			this.$emit('setActiveTab', val)
		}
	}
}
</script>

<style lang="scss">
.settings_keys{
	border-radius: 10px;
	height: 340px;
	min-width: calc(160px - 20px);
	background-color: #242F3D;
	padding: 10px;
	color: #7F91A4;
}
.menu_item{
	cursor: pointer;
	margin-bottom: 4px;
	&:hover{
		// background-color: #3b495c;
	}
	&.active{
		background-color: #3b495c;
	}
}
</style>
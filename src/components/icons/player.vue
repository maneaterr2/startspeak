<template>
	<svg class="player_icon" width="16.000000" height="16.000015" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<path id="矢量 303" d="M0 1.77L0 14.22C0 15.2 0.79 16 1.77 16L14.22 16C15.2 16 16 15.2 16 14.22L16 1.77C16 0.8 15.2 0 14.22 0L1.77 0C0.79 0 0 0.8 0 1.77ZM10.66 5.33C10.66 6.8 9.47 8 8 8C6.52 8 5.33 6.8 5.33 5.33C5.33 3.85 6.52 2.66 8 2.66C9.47 2.66 10.66 3.85 10.66 5.33ZM2.66 12.44C2.66 10.66 6.22 9.68 8 9.68C9.77 9.68 13.33 10.66 13.33 12.44L13.33 13.33L2.66 13.33L2.66 12.44Z" :fill="color" fill-opacity="1.000000" fill-rule="evenodd"/>
	</svg>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#7F91A4'
		}
	}
}
</script>
<style lang="scss" scoped>
.player_icon{
	min-width: 16px;
}
</style>

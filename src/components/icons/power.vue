<template>
	<div class="icon" title="Выйти">
		<svg width="18.000000" height="18.000000" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<path id="矢量 234" d="M10 0L8 0L8 10L10 10L10 0ZM14.83 2.17L13.41 3.59C14.99 4.86 16 6.81 16 9C16 12.87 12.87 16 9 16C5.13 16 2 12.87 2 9C2 6.81 3.01 4.86 4.57 3.58L3.17 2.17C1.22 3.82 0 6.26 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 6.26 16.77 3.82 14.83 2.17Z" :fill="color" fill-opacity="1.000000" fill-rule="evenodd"/>
		</svg>
	</div>
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

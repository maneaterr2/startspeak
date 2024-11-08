<template>
	<div class="icon" title="Назад">
		<svg width="18.000000" height="18.000000" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<path id="矢量 298" d="M7.08 12.59L8.5 14L13.5 9L8.5 4L7.08 5.41L9.67 8L0 8L0 10L9.67 10L7.08 12.59ZM16 0L2 0C0.89 0 0 0.89 0 2L0 6L2 6L2 2L16 2L16 16L2 16L2 12L0 12L0 16C0 17.1 0.89 18 2 18L16 18C17.1 18 18 17.1 18 16L18 2C18 0.89 17.1 0 16 0Z" :fill="color" fill-opacity="1.000000" fill-rule="evenodd"/>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#F36F21'
		}
	}
}
</script>

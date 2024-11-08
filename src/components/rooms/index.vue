<template>
	<div class="room">
		<div class="room_title" :style="{ color: color }">
			{{ title }}
		</div>
		<div class="room_count">
			участников: {{ count }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		count: {
			type: Number,
			default: 0
		},
		color: {
			type: String,
			default: '#7F91A4'
		}
	}
}
</script>

<style lang="scss" scoped>
.room{
	padding: 10px 18px;
	background-color: #242F3D;
	border-radius: 10px;
	line-height: 35px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&:hover{
		box-shadow: 0 0 4px #F36F21;
	}
	.room_title{
		font-size: 40px
	}
	.room_count{
		color: #7F91A4;

	}
}
</style>
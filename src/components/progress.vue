<template>
    <div class="progress-wrap">
		<div class="progress" :style="{ width: progress + '%' }">
		</div>
		<div class="progress-counter">
			{{ progress }} %
		</div>
	</div>
</template>

<script>
export default {
    name: 'progressBar',
	props: {
		progress: {
			type: Number,
			default: 0
		}
	},
    data () {
        return {}
    },
    mounted () {},
    methods: {}
}
</script>
<style lang="scss" scoped>

</style>
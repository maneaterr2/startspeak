<template>
    <div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
    name: 'name',
    data () {
        return {
            time: 'Loading...',
			socket: null,
        }
    },
	computed: {
	},
    async mounted () {
		window.electronAPI.onMainSend((value) => {
			if (value.channel == 'time') {
				this.time = value.value
			}
			
		})
		window.electronAPI.onTalkToSpeak((value) => {
			console.log('talk-to-speak');
            
		})
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
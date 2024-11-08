<template>
	<main>
		<div class="container">
			<Topnav />
			<div class="main_window">
				<settings-keys
					:active="active_tab"
					@setActiveTab="setActiveTab"
				/>
				<div class="settings_main">
					<!-- <div>
						<input type="checkbox" id="speak_for_button" v-model="speak_for_button">
						<label for="speak_for_button">
							Говорить по кнопке
						</label>
					</div>
					<div style="text-align: center">
						<button class="btn">
							сохранить
						</button>
					</div> -->
					<!-- <div>
						{{ analizer }}
					</div> -->
					<canvas width="400" height="100" class="visualizer"></canvas>
					<div v-if="online" >
						AIR
						{{ maxHeight }}
					</div>
					<!-- <div class="device_settings">
						<form-select :label="'Камера'" v-model="videoSelect.active" :items="videoSelect.pool" :labelColor="'#fff'" @change="changeDevice" />
						<form-select :label="'Устройство вывода'" v-model="audioOutputSelect.active" :items="audioOutputSelect.pool" :labelColor="'#fff'" @change="changeDevice" />
						<form-select :label="'Устройство ввода'" v-model="audioInputSelect.active" :items="audioInputSelect.pool" :labelColor="'#fff'" @change="changeDevice" />
					</div> -->
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import Topnav from '../components/topNav.vue'
import FormSelect from '../components/form/select.vue'
import SettingsKeys from '../components/settings/settingsKeys.vue'
export default {
	components: {
		Topnav,
		FormSelect,
		SettingsKeys
	},
	data() {
		return {
			stream: null,
			speak_for_button: false,
			analyser: null,
			source: null,
			constraints: null,
			canvas: null,
			canvasCtx: null,
			dataArray: null,
			online: true,
			maxHeight: 0,
			
            audioInputSelect: {
				active: '',
				pool: []
			},
			audioOutputSelect:  {
				active: '',
				pool: []
			},
			videoSelect:  {
				active: '',
				pool: []
			},
			active_tab: 'microphone'
		}
	},
	async mounted () {
		this.constraints = window.constraints = { audio: true, video: false }
		this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.analyser = audioCtx.createAnalyser();
		this.source = audioCtx.createMediaStreamSource(this.stream);
		this.source.connect(this.analyser);
		this.canvas = document.querySelector(".visualizer");
  		this.canvasCtx = this.canvas.getContext("2d");
		setInterval(() => {
			this.visualize()
		}, 50);
		this.getDevices()
	},
	methods: {
		visualize () {
			let WIDTH = this.canvas.width;
			let HEIGHT = this.canvas.height;

			this.analyser.fftSize = 2048;
			var bufferLength = this.analyser.frequencyBinCount;
			this.dataArray = new Uint8Array(bufferLength); 

			this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

			this.draw();
		},
		draw () {
			let WIDTH = this.canvas.width;
			let HEIGHT = this.canvas.height;
			var bufferLength = this.analyser.frequencyBinCount;
			this.analyser.getByteTimeDomainData(this.dataArray); 

			this.canvasCtx.fillStyle = "transparent"; 
			this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

			this.canvasCtx.lineWidth = 2;
			this.canvasCtx.strokeStyle = "#27A83C";

			this.canvasCtx.beginPath();

			var sliceWidth = (WIDTH * 1.0) / bufferLength;
			var x = 0;
			let maxHeight = 0 
			for (var i = 0; i < bufferLength; i++) {
				var v = this.dataArray[i] / 128.0;
				var y = (v * HEIGHT) / 2;

				if (i === 0) {
					this.canvasCtx.moveTo(x, y);
				} else {
					this.canvasCtx.lineTo(x, y);
				}
				if (y > maxHeight) {
					maxHeight = y
				}
				x += sliceWidth;
			}
			this.maxHeight = maxHeight
			this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
			this.canvasCtx.stroke();
		},
		async getDevices () {
			try {
				const response = await navigator.mediaDevices.enumerateDevices()
				// console.log(response);
				
				this.gotDevices(response)
			} catch (error) {
				console.log(error)
			}
		},
		gotDevices(deviceInfos) {
			for (let i = 0; i !== deviceInfos.length; ++i) {
				const obj = {}
				const deviceInfo = deviceInfos[i];
				obj.value = deviceInfo.deviceId;
				if (deviceInfo.kind === 'audioinput') {
					obj.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
					this.audioInputSelect.pool.push(obj)
				} else if (deviceInfo.kind === 'audiooutput') {
					obj.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
					this.audioOutputSelect.pool.push(obj)
				} else if (deviceInfo.kind === 'videoinput') {
					obj.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
					this.videoSelect.pool.push(obj)
				} else {
				console.log('Some other kind of source/device: ', deviceInfo);
				}
			}
			this.audioInputSelect.active = this.audioInputSelect.pool[0].value
			this.audioOutputSelect.active = this.audioOutputSelect.pool[0].value
			this.videoSelect.active = this.videoSelect.pool[0].value
		},
		changeDevice () {
			
			const audioSource = this.audioInputSelect.active;
			const videoSource = this.videoSelect.active;
			const constraints = {
				audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
				video: {deviceId: videoSource ? {exact: videoSource} : undefined}
			};
            this.$emit('changeDevice', constraints)
		},
		setActiveTab (data) {
			this.active_tab = data
		}
	}
}
</script>

<style lang="scss" scoped>
.main_window{
	display: flex;
	gap: 10px;
	align-items: stretch;
	color: #7F91A4;
}
.settings_main{
	width: 100%;
	border-radius: 10px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 10px;
	background-color: #242F3D;
}
.room_row{
	display: flex;
	gap: 10px;
	width: 100%;
	height: 50%;
	div{
		width: 50%;
	}
}
</style>
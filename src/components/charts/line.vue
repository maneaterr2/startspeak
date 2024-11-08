<template>
    <div class="chart-wrap">
		<div class="line_header">
			<div class="title">
				{{ title }}
			</div>
			<div class="line_value">
				{{ lastValue }}
			</div>
		</div>
		
        <Line
        	:label="label"
            :data="compChartData"
            :options="chartOptions"
			:height="height"
			:width="width"
			ref="customChart"
        />
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement)

export default {
	name: 'LineChart',
	components: { Line },
	props: {
		title: {
			type: String,
			default: ''
		},
		socketData: {
			type: Array,
			default: null
		},
		color: {
			type: String,
			default: '253,137,53'
		},
		height: {
			type: Number,
			default: 200
		},
		width: {
			type: Number,
			default: 350
		}
	},
	data() {
		return {
			chartOptions: {
				responsive: false,
				maintainAspectRatio:false,
				animation: {
					duration: 0
				},
				elements: {
                    point:{
                        radius: 0
                    }
                },
				plugins: {
					legend: {
						display: false
					}
				}
			},
			label: 'label'
		}
	},
	computed: {
		compChartData () {
			if (this.socketData) {
				const obj = {
					labels: [],
					datasets: [
						{
							data: [],
							fill: false,
							borderColor: `rgba(${this.color}, 0.3)`,
							tension: 0.1,
							borderWidth: 1
						},
						{
							data: [],
							fill: false,
							borderColor: `rgba(${this.color}, 1)`,
							tension: 0.1,
							borderWidth: 1
						}
					]
				}
				this.socketData.forEach((element, index) => {
					obj.labels.push(index)
					obj.datasets[0].data.push(element.s)
					obj.datasets[1].data.push(element.sf)
				});
				return obj
			}
		},
		lastValue () {
			if (this.socketData) {
				const index = this.socketData.length - 1
				return (this.socketData[index].sf).toFixed(2)
			} else {
				return 0
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.chart-wrap{
    padding: 10px;
    border: 1px solid #202020;
    border-radius: 10px;
}
.line_header {
	display: flex;
	justify-content: space-between;
	// gap: 10px;
	align-items: center;
}
.line_value{
	color: #7B7B7B;
	width: 100px;
	text-align: right;
}
</style>
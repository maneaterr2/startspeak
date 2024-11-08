<template>
    <div class="topnav">
        <div v-if="url == '/settings'" class="online_stat">
            Настройки
        </div>
        <div v-else-if="url == '/room'" class="online_stat">
            {{ roomTitle }}
        </div>
        <div v-else class="online_stat">
            <div>
                в сети: {{ online }}
            </div>
            <div>
                не в сети: {{ offline }}
            </div>
        </div>
        <div class="error" v-if="!serverConnect">
            сервер не доступен
        </div>

        <div style="display: flex; gap: 10px">
            <!-- <screen-icon />
            <noscreen-icon />
            <sound-icon />
            <nosound-icon />
            <micro-icon />
            <nomicro-icon /> -->
            <settings-icon v-if="url != '/settings'" @click="$router.push('/settings')" />
            <back-icon @click="$router.back()" />
            <power-icon @click="$router.push('/')" />
        </div>
    </div>
</template>

<script>
import BackIcon from './icons/back.vue'
import ScreenIcon from './icons/screen.vue'
import NoscreenIcon from './icons/noscreen.vue'
import SettingsIcon from './icons/settings.vue'
import MicroIcon from './icons/micro.vue'
import NomicroIcon from './icons/nomicro.vue'
import SoundIcon from './icons/sound.vue'
import NosoundIcon from './icons/nosound.vue'
import PowerIcon from './icons/power.vue'
import { state } from '../socket'
export default {
    components: {
        BackIcon,
        SettingsIcon,
        MicroIcon,
        NomicroIcon,
        SoundIcon,
        NosoundIcon,
        ScreenIcon,
        NoscreenIcon,
        PowerIcon
    },
    props: {
        time: {
            type: String,
            default: ''
        },
        online: {
            type: String,
            default: '0'
        },
        offline: {
            type: String,
            default: '0'
        },
        message: {
            type: String,
            default: ''
        }
    },
    name: 'name',
    data () {
        return {}
    },
    computed: {
        socketColor () {
            if (this.online) {
                return '#34B750'
            } else {
                return '#E64C4C'
            }
        },
        serverConnect () {
            return state.connected
        },
        url () {
            return this.$route.path
        },
        roomTitle () {
            if (this.$route.query.color) {
                const color = this.$route.query.color
                switch (color) {
                    case 'green': return 'Зелёная комната'
                    case 'red': return 'Красная комната'
                    case 'yellow': return 'Жёлтая комната'
                    case 'blue': return 'Синяя комната'
                }
            } else {
                return ''
            }
        }
    },
    mounted () {
        console.log(this.$route.path);
        // console.log(this.$route.query);
        // window.electronAPI.onSocketSend((value) => {
			
		// 	console.log(value);
            
		// })
    },
    methods: {
        openSettings () {
            this.$emit('opensettings')
        }
    }
}
</script>
<style lang="scss" scoped>
.topnav{
    padding: 6px 10px;
    color: #fff;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #242F3D;
    margin: 10px 0;
    border-radius: 6px;
}
.settings_btn{
    cursor: pointer
}
.icon, .settings_btn {
    height: 30px;
    display: flex;
    align-items: center;
}
.message{
    color: #7B7B7B;
    font-size: 14px;
}
.online_stat{
    color: #7F91A4;
    font-size: 16px;
    display: flex;
    gap: 10px;
    align-items: center
}
</style>
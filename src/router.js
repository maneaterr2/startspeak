import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from './layout/index.vue'
import Login from './layout/login.vue'
import Settings from './pages/settings.vue'
import Room from './pages/room.vue'
const router = createRouter({
	routes: [
		{
			path: '/',
			component: Layout
		},
		{
			path: '/dashboard',
			component: Login
		},
		{
			path: '/settings',
			component: Settings
		},
		{
			path: '/room',
			component: Room
		}
	],
	history: createWebHashHistory()
	// history: MAIN_WINDOW_VITE_DEV_SERVER_URL ? createWebHashHistory() : createWebHistory()
})

export default router
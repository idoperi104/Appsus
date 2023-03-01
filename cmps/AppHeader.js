export default {
	template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <nav>
                <RouterLink v-for="(route, idx) in routs" :to="route.path"
                :title="route.name" :key="idx">{{route.name}}</RouterLink>
            </nav>
        </header>
    `,
    data() {
        return {
            routs: [
                { path: '/', name: 'Home |' },
                { path: '/about', name: 'About |' },
                { path: '/mail', name: 'Mail |' },
                { path: '/note', name: 'Keep |' }
            ]
        }
    },
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }
}


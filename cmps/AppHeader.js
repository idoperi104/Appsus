import MainNav from './MainNav.js'

export default {
    template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <nav class="app-nav">
                <RouterLink v-for="(route, idx) in routs" :to="route.path"
                :title="route.name" :key="idx">{{route.name}}</RouterLink>
                <button @click="showNav = !showNav" data-title="Apps" class="fa-solid fa-grip-vertical"></button>
                <MainNav v-if="showNav" @closeNav="closeNav" />
            </nav>
        </header>
    `,
    data() {
        return {
            showNav: false,
            routs: [
                { path: '/', name: 'Home |' },
                { path: '/about', name: 'About |' },
            ]
        }
    },
    methods: {
        closeNav(){
            this.showNav = false
        }
    },
    components: {
        MainNav,
    }
}


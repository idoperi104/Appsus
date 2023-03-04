import MainNav from './MainNav.js'

export default {
    template: `
        <header class="app-header">
            <RouterLink  to="/">
                <h1>AppSus</h1>
            </RouterLink>
            <nav class="app-nav">
                <button @click="showNav = !showNav" data-title="Apps" class="fa-solid fa-grip-vertical"></button>
                <MainNav v-if="showNav" @closeNav="closeNav" />
            </nav>
        </header>
    `,
    data() {
        return {
            showNav: false,
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


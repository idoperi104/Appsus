export default {
    template: `
        <nav class="main-nav-layout">
            <RouterLink @click="closeNav" class="main-nav-link" to="/" >
                <div class="fa-solid fa-house"></div>
                <span>Home</span>
            </RouterLink>
            <RouterLink @click="closeNav" class="main-nav-link" to="/mail" >
            <div class="google-logos logo-gmail"></div>
                <span>G'amal</span>
            </RouterLink>
            <RouterLink @click="closeNav" class="main-nav-link" to="/note" >
            <div class="google-logos logo-keep"></div>
                <span>Keep</span>
            </RouterLink>
            <RouterLink @click="closeNav" class="main-nav-link" to="/#about" >
            <div class="fa-solid fa-info"></div>
                <span>About</span>
            </RouterLink>
        </nav>
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
        closeNav() {
            this.$emit('closeNav')
        }
    }
}
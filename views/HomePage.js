

export default {
    template: `
        <section class="home-page">

            <section class="home-section">
                    <h1>Welocme to AppSus</h1>
            </section>

            <section class="home-section">
                <div ref="sec1" class="home-container reveal">
                    <h2>Our Apps:</h2>
                    <div class="home-cards logos">
                        <RouterLink class="main-nav-link" to="/note" >
                            <img class="logo-img" src="../assets/img/keepLogo.png" alt="" />
                            <!-- <span>Keep</span> -->
                        </RouterLink>
                        <RouterLink @click="closeNav" class="main-nav-link" to="/mail" >
                            <img class="logo-img" src="../assets/img/gmailLogo.png" alt="" />
                            <!-- <div class="google-logos logo-gmail"></div> -->
                            <!-- <span>G'amal</span> -->
                        </RouterLink>
                    </div>
                </div>
            </section>

            <section class="home-section">
                <div ref="sec2" class="home-container reveal">
                    <h2>creators:</h2>
                    <div class="home-cards creators">
                        <div class="logo-img">
                            <h3>Ido Peri</h3>
                            <img class="logo-img passport" src="../assets/img/idoLogo.jpg" alt="" />
                        </div>
                        <div class="logo-img">
                            <h3>Tomer Huberman</h3>
                            <img class="logo-img passport" src="../assets/img/idoLogo.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
    `,
    data(){
        return {
            reveals: [
                'sec1',
                'sec2',
            ],
        }
    },
    methods: {
        revealHomeSection() {
            this.reveals.forEach(ref => {
                var reveal = this.$refs[ref]
                var windowHeight = window.innerHeight
                var revealTop = reveal.getBoundingClientRect().top
                var revealPoint = 150
                if(revealTop < windowHeight - revealPoint){
                    reveal.classList.add('active')
                } else {
                    reveal.classList.remove('active')
                }
            })
        }
    },
    mounted() {
        window.addEventListener('scroll', this.revealHomeSection)
    },
    unmounted(){
        window.removeEventListener('scroll', this.revealHomeSection)
    },
    components:{
    }
}

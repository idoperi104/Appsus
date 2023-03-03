export default {
    template: `
        <section class="home-page">
            <section class="home-section">
                <h1>reveal elements on scroll</h1>
            </section>
            <section class="home-section">
                <div ref="sec1" class="home-container reveal">
                    <h2>your title</h2>
                    <div class="home-cards">
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="home-section">
                <div ref="sec2" class="home-container reveal">
                    <h2>your title</h2>
                    <div class="home-cards">
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="home-section">
                <div ref="sec3" class="home-container reveal">
                    <h2>your title</h2>
                    <div class="home-cards">
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                        <div class="text-cards">
                            <h3>title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quis ratione, magni nesciunt nisi quam libero repellendus. Incidunt suscipit iste perferendis laudantium nostrum aliquid. In molestiae omnis at blanditiis cum.</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    `,
    data(){
        return {
            reveals: [
                'sec1',
                'sec2',
                'sec3',
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
    }
}

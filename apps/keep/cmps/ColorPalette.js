export default {
    template: `
        <section class="color-palette">
            <button @click.prevent="isShow = !isShow" class="fa-solid fa-palette"></button>
            <div v-if="isShow" class="palette">
                <button 
                    v-for="color in colors"
                    @click.prevent="sendColor(color)" 
                    :style={backgroundColor:color}
                    class="btn-palette">
                </button>
            </div>
        </section>
    `,
    data() {
        return {
            colors: [
                '#ffadad',
                '#ffd6a5',
                '#fdffb6',
                '#caffbf',
                '#9bf6ff',
                '#a0c4ff',
                '#bdb2ff',
                '#ffc6ff',
                '#f0efeb',
            ],
            isShow: false
        }
    },
    methods: {
        sendColor(color){
            this.isShow = !this.isShow
            this.$emit('color', color)
        },
    },
}
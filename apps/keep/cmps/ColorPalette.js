export default {
    template: `
        <section class="color-palate">
            <button class="fa-solid fa-palette"></button>
            <div class="palette">
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
                '#f28b82',
                '#f28b82',
                '#f28b82',
                '#f28b82',
                '#f28b82',
                '#f28b82',
                '#f28b82',
                '#f28b82',
                '#f28b82',
            ]
        }
    },
    methods: {
        sendColor(color){
            console.log(color);
            this.$emit('color', color)
        },
    },
}
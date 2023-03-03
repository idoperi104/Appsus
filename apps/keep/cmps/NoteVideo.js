export default {
    props: ['note'],
    template: `
        <article ref="notePreview" :style="styleObject" class="note-preview">
            <h2>{{note.info.title}}</h2>
            <iframe @click.prevent="stop"
                :src="getVidUrl"
                width = "100%">
            </iframe>
        </article>
    `,
    data(){
        return {
            width: 0,
        }
    },
    computed: {
        styleObject() {
            return this.note.style
        },
        getVidUrl() {
            var url = this.note.info.url.split('=')[1]
            return `https://www.youtube.com/embed/${url}`
        }
    },
    methods: {
        stop(){
            console.log('stop');
        }
    }
}
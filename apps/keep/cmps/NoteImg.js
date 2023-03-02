export default {
    props: ['note'],
    template: `
        <article :style="styleObject" class="note-preview">
            <h2>{{note.info.title}}</h2>
            <img :src="note.info.url" alt="" />
        </article>
    `,
    computed: {
        styleObject() {
            return this.note.style
        }
    }
}
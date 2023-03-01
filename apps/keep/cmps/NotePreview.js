export default {
    props: ['note'],
    template: `
        <article :style="styleObject" class="note-preview">
            <h2>{{note.info.title}}</h2>
            <p>{{note.info.txt}}</p>
        </article>
    `,
    computed: {
        styleObject() {
            return this.note.style
        }
    }
}
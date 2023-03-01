export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <h2>{{note.id}}</h2>
            <pre>{{note}}</pre>
        </article>
    `,
}
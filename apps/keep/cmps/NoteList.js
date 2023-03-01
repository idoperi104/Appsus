import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes"  :key="note.id">
                    <NotePreview :note="note"/>
                    <!-- <RouterLink :to="'/car/'+car.id">Details</RouterLink> | -->
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> |
                    <button hidden @click="showDetails(note.id)">Details</button>
                    <button @click="remove(note.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        showDetails(noteId) {
            this.$emit('show-details', noteId)
        },
    },
    components: {
        NotePreview,
    }
}
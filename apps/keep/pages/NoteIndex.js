import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteList from '../cmps/NoteList.js'

export default {
    template: `
        <h1>im note index and tomer here</h1>
        <!-- <pre>{{notes}}</pre> -->
        <section class="note-index">
            <NoteList
                :notes="notes"
                v-if="notes"
                @remove="removeNote"
            />

        </section>
    `,
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    showSuccessMsg('note removed')
                })
                .catch(err => {
                    showErrorMsg('err: ', err)
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    data() {
        return {
            notes: null,
            filterBy: {},
        }
    },
    components: {
        NoteList,
    }
}
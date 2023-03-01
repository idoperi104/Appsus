import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteList from '../cmps/NoteList.js'
import NoteEdit from '../cmps/NoteEdit.js'

export default {
    template: `
        <button class="btn-add-note" @click="isOnEdit=true">add note</button>

        <section class="note-index">
            <!-- <RouterLink to="/note/edit">Add a note</RouterLink> -->
            <NoteEdit
                @saved="setNotes"
                v-if="isOnEdit"  
                @isOnEdit="setIsOnEdit" 
            />

            <NoteList
                :notes="notes"
                v-if="notes"
                @remove="removeNote"
                @isOnEdit="setIsOnEdit" 
            />

        </section>
    `,
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    data() {
        return {
            notes: null,
            filterBy: {},
            isOnEdit: false,
        }
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
        setNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        setIsOnEdit(isOn){
            console.log(isOn);
            this.isOnEdit = isOn
        }
    },
    components: {
        NoteList,
        NoteEdit,
    }
}
import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteList from '../cmps/NoteList.js'
import NoteEdit from '../cmps/NoteEdit.js'
import NoteFilter from '../cmps/NoteFilter.js'

export default {
    template: `

        <section class="note-index">
            <button class="btn-add-note" @click="isOnEdit=true">add note</button>

            <NoteFilter
                @filter="setFilterBy"
            />

            <NoteEdit
                @saved="setNotes"
                v-if="isOnEdit"  
                @isOnEdit="setIsOnEdit" 
            />

            <NoteList
                :notes="getPinned"
                v-if="notes && getPinned"
                @remove="removeNote"
                @isOnEdit="setIsOnEdit"
                @pin="togglePin" 
            />
            <NoteList
                :notes="getUnPinned"
                v-if="notes"
                @remove="removeNote"
                @isOnEdit="setIsOnEdit"
                @pin="togglePin" 
            />
            <!-- <NoteList
                :notes="notes"
                v-if="notes"
                @remove="removeNote"
                @isOnEdit="setIsOnEdit"
                @pin="togglePin" 
            /> -->

        </section>
    `,
    created() {
        this.filteredNotes()
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
            this.filteredNotes()
        },
        setNotes() {
            this.filterBy = {}
            this.filteredNotes()
        },
        setIsOnEdit(isOn) {
            console.log(isOn);
            this.isOnEdit = isOn
        },
        filteredNotes() {
            noteService.query(this.filterBy)
                .then(notes => this.notes = notes)
        },
        togglePin(note) {
            note.isPinned = !note.isPinned
            noteService.save(note)
        }
    },
    computed: {
        getPinned() {
            return this.notes.filter(note => note.isPinned)
        },
        getUnPinned() {
            return this.notes.filter(note => !note.isPinned)
        }
    },
    components: {
        NoteList,
        NoteEdit,
        NoteFilter,
    }
}
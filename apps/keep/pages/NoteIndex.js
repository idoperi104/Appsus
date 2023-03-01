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
                :notes="filteredNotes"
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
        setIsOnEdit(isOn) {
            console.log(isOn);
            this.isOnEdit = isOn
        }
    },
    computed: {
        filteredNotes() {
            console.log(this.filterBy);
            const regexType = new RegExp(this.filterBy.type, 'i')
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.notes.filter(note => {
                return (regex.test(note.info.txt) || regex.test(note.info.title))
                && regexType.test(note.type)
            })
        },
        orderedNotes() {
            var filtered = this.filteredNotes()
            var ordered = filtered.map(note => {
                return
            })
        }
    },
    components: {
        NoteList,
        NoteEdit,
        NoteFilter,
    }
}
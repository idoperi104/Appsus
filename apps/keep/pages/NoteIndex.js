import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteList from '../cmps/NoteList.js'
import NoteEdit from '../cmps/NoteEdit.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteSearch from '../cmps/NoteSearch.js'

export default {
    template: `
        <section class="note-index">
            <section class="note-nav">
                <NoteFilter
                    @filter="setFilterBy"
                />
            </section>

            <section class="note-header">
                <NoteSearch
                    @filter="setFilterBy"
                />
            </section>


            <section class="note-main">

                <button class="btn-add-note fa-solid fa-plus" @click="isOnEdit=true"></button>

                <NoteEdit
                    @saved="setNotes"
                    v-if="isOnEdit"
                    @isOnEdit="setIsOnEdit" 
                />

                <h3 class="pin-title" v-if="notes && filterBy && isPinnedExist">PINNED</h3>
    
                <NoteList
                    :notes="getPinned"
                    v-if="notes && getPinned && filterBy"
                    @remove="removeNote"
                    @isOnEdit="setIsOnEdit"
                    @pin="togglePin" 
                    @duplicate="duplicateNote"
                />

                <h3 class="pin-title" v-if="notes && filterBy && isUnPinnedExist">OTHERS</h3>

                <NoteList
                    :notes="getUnPinned"
                    v-if="notes && filterBy"
                    @remove="removeNote"
                    @isOnEdit="setIsOnEdit"
                    @pin="togglePin" 
                    @duplicate="duplicateNote"
                />
            </section>
        </section>
    `,
    created() {
        this.queryNotes()
    },
    data() {
        return {
            notes: null,
            filtered: null,
            filterBy: { txt: '', type: '' },
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
            this.queryNotes()
        },
        setIsOnEdit(isOn) {
            this.isOnEdit = isOn
        },
        togglePin(note) {
            note.isPinned = !note.isPinned
            noteService.save(note)
        },
        duplicateNote(note) {
            console.log(note);
            const dup = JSON.parse(JSON.stringify(note))
            dup.id = ''
            noteService.save(dup)
                .then((note) => this.notes.push(note))
        },
        queryNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        }
    },
    computed: {
        getPinned() {
            return this.filtered.filter(note => note.isPinned)
        },
        getUnPinned() {
            return this.filtered.filter(note => !note.isPinned)
        },
        isPinnedExist(){
            return this.notes.some(note => note.isPinned)
        },
        isUnPinnedExist(){
            return this.notes.some(note => !note.isPinned)
        },
        filteredNotes() {
            if (!this.notes) return
            const regexType = new RegExp(this.filterBy.type, 'i')
            const regex = new RegExp(this.filterBy.txt, 'i')
            this.filtered = this.notes.filter(note => {
                return (regex.test(note.info.txt) || regex.test(note.info.title))
                    && regexType.test(note.type)
            })
        },
    },
    watch: {
        filteredNotes() {
            console.log('filteredNotes watched');
        }
    },
    components: {
        NoteList,
        NoteEdit,
        NoteFilter,
        NoteSearch,
    }
}
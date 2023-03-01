import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="note-edit">
            <h2>Add a note</h2>
            <form @submit.prevent="save">
                <label for="title">title:</label>
                <input name="title" type="text" v-model="note.info.title" placeholder="write note">
                <label for="txt">txt:</label>
                <input name="txt" type="text" v-model="note.info.txt" placeholder="write note">
                <label for="bg-color">bg-color:</label>
                <input name="bg-color" type="color" v-model="note.style.backgroundColor" placeholder="write note">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            note: noteService.getEmptyNote()
        }
    },
    created() {
        const { noteId } = this.$route.query
        if (noteId) {
            noteService.get(noteId)
                .then(note => this.note = note)
        }
    },
    computed: {
        noteId() {
            return this.$route.query.noteId
        }
    },
    watch: {
        noteId() {
            console.log('noteId Changed!')
            this.loadNote()
        }
    },
    methods: {
        save() {
            noteService.save(this.note)
                .then(savedNote => {
                    this.note = noteService.getEmptyNote()
                    this.$emit('saved', savedNote)
                    this.$router.push({query:{noteId:''}})
                    showSuccessMsg('note saved')
                })
                .catch(err => {
                    showErrorMsg('note save canceled')
                })
        },
        loadNote() {
            if(!this.noteId) return
            noteService.get(this.noteId)
                .then(note => this.note = note)
        }
    },

}
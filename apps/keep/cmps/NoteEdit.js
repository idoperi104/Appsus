import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section @click.stop class="note-edit">
            <form @submit.prevent="save">
                <button @click="closeEdit">x</button>

                    <label for="note-edit-txt" class="fa-regular fa-file-lines"
                        v-if="note.type === 'NoteTxt'"></label>
                    <label for="note-edit-img"class="fa-regular fa-image"
                        v-if="note.type === 'NoteImg'"></label>
                    <label for="note-edit-vid" class="fa-solid fa-video"
                        v-if="note.type === 'NoteVideo'"></label>
                    <label for="note-edit-todo" class="fa-solid fa-list-ul"
                        v-if="note.type === 'NoteTodos'"></label>
                </div>

                <!-- <label for="title">title:</label> -->
                <input name="title" type="text" v-model="note.info.title" placeholder="title">
                
                <!-- <label v-if="note.type === 'NoteTxt'" for="txt">txt:</label> -->
                <input ref="focusInput" v-if="note.type === 'NoteTxt'" name="txt" type="text" v-model="note.info.txt" placeholder="take a note...">
                
                <img v-if="note.type === 'NoteImg'" :src="note.info.url"/>
                <!-- <label v-if="note.type === 'NoteImg' || note.type === 'NoteVideo'" for="url">url:</label> -->
                <input v-if="note.type === 'NoteImg' || note.type === 'NoteVideo'" name="url" type="text" v-model="note.info.url" placeholder="enter url...">
                
                <label for="bg-color">bg-color:</label>
                <input name="bg-color" type="color" v-model="note.style.backgroundColor" placeholder="write note">


                <button class="btn-save">Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            note: noteService.getEmptyNote(),
            isNew: false,
        }
    },
    created() {
        const { noteId } = this.$route.query
        if (noteId) {
            this.isNew = false
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
                    this.$emit('isOnEdit', false)
                    this.$router.push({ query: { noteId: '' } })
                    showSuccessMsg('note saved')
                })
                .catch(err => {
                    showErrorMsg('note save canceled')
                })
        },
        loadNote() {
            if (!this.noteId) return
            noteService.get(this.noteId)
                .then(note => this.note = note)
        },
        closeEdit() {
            this.$router.push({ query: { noteId: '' } })
            this.$emit('isOnEdit', false)
        },
        setType() {
            console.log(this.type);
            this.note.type = this.type
        }
    },
    mounted() {
        this.$refs.focusInput.focus()
    }

}
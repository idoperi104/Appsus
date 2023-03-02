import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="note-add">
            <form @click.stop="isShowAll = true" @submit.prevent="save" autocomplete="on">

                <input v-if="isShowAll" name="title" type="text" v-model="note.info.title" placeholder="title">
                
                <input ref="focusInput" v-if="note.type === 'NoteTxt'"
                     name="txt" type="text" v-model="note.info.txt" 
                     autocomplete="off" placeholder="take a note...">
                
                <input v-if="note.type === 'NoteImg' || note.type === 'NoteVideo'" name="url" type="text" v-model="note.info.url" placeholder="enter url...">
                
                <label v-if="isShowAll" for="bg-color">bg-color:</label>
                <input v-if="isShowAll" name="bg-color" type="color" v-model="note.style.backgroundColor" placeholder="write note">

                <button class="btn-save">Save</button>

                        
                <div class="note-edit-type">
                        <input @input="setType" type="radio" id="note-edit-txt" value="NoteTxt" v-model="note.type">
                        <label for="note-edit-txt" class="fa-regular fa-file-lines"></label>
                        <input @input="setType" type="radio" id="note-edit-img" value="NoteImg" v-model="note.type">
                        <label for="note-edit-img"class="fa-regular fa-image"></label>
                        <input @input="setType" type="radio" id="note-edit-vid" value="NoteVideo" v-model="note.type">
                        <label for="note-edit-vid" class="fa-solid fa-video"></label>
                        <input @input="setType" type="radio" id="note-edit-todo" value="NoteTodos" v-model="note.type">
                        <label for="note-edit-todo" class="fa-solid fa-list-ul"></label>
                </div>
            </form>
            
            
        </section>
    `,
    data() {
        return {
            note: noteService.getEmptyNote(),
            isShowAll: false,
        }
    },
    created() {
    },
    computed: {
        
    },
    watch: {
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
        setType() {
            console.log(this.type);
            this.note.type = this.type
        },
        setIsShowFalse(){
            this.isShowAll = false
        }
    },
    mounted() {
        window.addEventListener('click', this.setIsShowFalse)
    },
    unmounted() {
        window.removeEventListener('click', this.setIsShowFalse)
    }

}
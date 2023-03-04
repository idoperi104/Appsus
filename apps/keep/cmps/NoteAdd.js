import { noteService } from "../services/note.service.js"
import { showUserMsg, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import ColorPalette from '../cmps/ColorPalette.js'
import NoteTodos from './NoteTodos.js'


export default {
    template: `
        <section class="note-add">
            <form @click.stop="atNewAdd" @submit.prevent="save" ref="form" autocomplete="on" :class="getFormClass">

                <input v-if="isShowAll" name="title" type="text" v-model="note.info.title" placeholder="title:">
                
                <input ref="focusInput" v-if="note.type === 'NoteTxt'"
                     name="txt" type="text" v-model="note.info.txt" 
                     autocomplete="off" placeholder="take a note...">
                

                <img v-if="note.type === 'NoteImg' && note.info.url" :src="note.info.url"/>
                <input v-if="note.type === 'NoteImg' || note.type === 'NoteVideo'" name="url" type="text"
                    autocomplete="off" v-model="note.info.url" placeholder="enter url...">

                    <input 
                        v-if="isShowAll && note.type === 'NoteTodos'" 
                        name="todo" 
                        type="text" 
                        v-model="nextTodo" 
                        placeholder="enter Todo..."
                        class="input-add-todo"
                        ref="inputTodo">
                    <button 
                        v-if="isShowAll && note.type === 'NoteTodos'"
                        class="btn-add-Todo" 
                        @click.prevent="addTodo">+
                    </button>
                <Component 
                    :is="note.type"
                    v-if="isShowAll && note.type === 'NoteTodos'"
                    :note="note"
                    @save="saveNote" 
                />
                
                <ColorPalette
                    v-if="isShowAll"
                    @color="setColor"
                />
                
                <div class="note-edit-type">
                    <input @input="setType" type="radio" id="note-edit-txt" value="NoteTxt" v-model="note.type">
                    <label for="note-edit-txt" class="fa-regular fa-file-lines"></label>
                    <input @input="setType" type="radio" id="note-edit-img" value="NoteImg" v-model="note.type">
                    <label for="note-edit-img" class="fa-regular fa-image"></label>
                    <input @input="setType" type="radio" id="note-edit-vid" value="NoteVideo" v-model="note.type">
                    <label for="note-edit-vid" class="fa-solid fa-video"></label>
                    <input @input="setType" type="radio" id="note-edit-todo" value="NoteTodos" v-model="note.type">
                    <label for="note-edit-todo" class="fa-solid fa-list-ul"></label>
                </div>
                
                <button v-if="isShowAll" class="btn-save">Save</button>
            </form>
            
            
        </section>
    `,
    data() {
        return {
            note: noteService.getEmptyNote(),

            // isShowAll: true,
            // ////////
            isShowAll: false,
            nextTodo: '',
        }
    },
    created() {
    },
    computed: {
        getFormClass() {
            return this.isShowAll ? 'show-all' : ''
        }
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
        setIsShowFalse() {
            this.isShowAll = false
            this.$refs.form.style.backgroundColor = 'var(--clr1)'
        },
        atNewAdd() {
            this.isShowAll = true
            this.note.isPinned = true
        },
        setColor(color) {
            this.note.style.backgroundColor = color
            this.$refs.form.style.backgroundColor = color
        },
        addTodo(){
            this.note.info.todos.push({todo: this.nextTodo, isMarked:false})
            this.$refs.inputTodo.value = ''
        }
    },
    mounted() {
        window.addEventListener('click', this.setIsShowFalse)
        // this.note.isPinned = true
    },
    unmounted() {
        window.removeEventListener('click', this.setIsShowFalse)
    },
    components: {
        ColorPalette,
        NoteTodos,
    }

}
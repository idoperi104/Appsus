import NotePreview from './NotePreview.js'
import NoteImg from './NoteImg.js'
import NoteTxt from './NoteTxt.js'
import NoteVideo from './NoteVideo.js'
import NoteTodos from './NoteTodos.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :style=getStyle(note) :key="note.id">

                    <Component 
                        :is="note.type"
                        :note="note" 
                    />

                    <button hidden @click="showDetails(note.id)">Details</button>
                    <button @click="edit(note.id)">edit</button>
                    <button @click="remove(note.id)">x</button>
                    <button @click="togglePin(note)">pin</button>
                    <button @click="duplicate(note)">dup</button>
                </li>
            </ul>
        </section>
    `,
    data(){
        return{
            
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        edit(noteId) {
            this.$emit('isOnEdit', true)
            this.$router.push({query:{noteId:noteId}})
        },
        togglePin(note) {
            this.$emit('pin', note)
        },
        duplicate(note) {
            this.$emit('duplicate', note)
        },
        showDetails(noteId) {
            this.$emit('show-details', noteId)
        },
        getStyle(note){
            return {
                backgroundColor : note.style.backgroundColor,
                borderColor: (note.isPinned)? 'red' : 'black'
            }
        }
    },
    components: {
        NotePreview,
        NoteImg,
        NoteTxt,
        NoteVideo,
        NoteTodos,
    }
}
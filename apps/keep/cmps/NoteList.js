import NotePreview from './NotePreview.js'
import NoteImg from './NoteImg.js'
import NoteTxt from './NoteTxt.js'
import NoteVideo from './NoteVideo.js'
import NoteTodos from './NoteTodos.js'

export default {
    props: ['notes', 'type'],
    template: `
        <section class="note-list">
            {{type}}
            <ul>
                <li v-for="note in notes" :style=getStyle(note) :key="note.id">
                    <!-- <NotePreview :note="note"/> -->

                    <Component 
                        :is="type"
                        :note="note" 
                    />


                    <!-- <RouterLink :to="'/car/'+car.id">Details</RouterLink> | -->
                    <!-- <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> | -->


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
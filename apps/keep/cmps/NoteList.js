import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :style=getStyle(note) :key="note.id">
                    <NotePreview :note="note"/>
                    <!-- <RouterLink :to="'/car/'+car.id">Details</RouterLink> | -->
                    <!-- <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> | -->


                    <button hidden @click="showDetails(note.id)">Details</button>
                    <button @click="edit(note.id)">edit</button>
                    <button @click="remove(note.id)">x</button>
                    <button @click="togglePin(note)">pin</button>
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
    }
}
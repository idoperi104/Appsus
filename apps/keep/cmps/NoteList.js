import NotePreview from './NotePreview.js'
import NoteImg from './NoteImg.js'
import NoteTxt from './NoteTxt.js'
import NoteVideo from './NoteVideo.js'
import NoteTodos from './NoteTodos.js'
import ColorPalette from '../cmps/ColorPalette.js'

import {noteService} from '../services/note.service.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :style=getStyle(note) :key="note.id">

                    <Component 
                        :is="note.type"
                        :note="note" 
                        @click.prevent="edit(note.id)"
                    />

                    <button class="fa-regular fa-trash-can" @click="remove(note.id)"></button>
                    <button @click="togglePin(note)" 
                            :style=btnPinnedStyle(note)
                            class="btn-pin fa-solid fa-thumbtack"></button>
                    <button @click="duplicate(note)" class="fa-regular fa-clone"></button>

                    <ColorPalette
                        class="palette-li"
                        @color="(color) => {
                            note.style.backgroundColor = color;
                            save(note)
                        }"
                    />

                </li>
            </ul>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        edit(noteId) {
            this.$emit('isOnEdit', true)
            this.$router.push({ query: { noteId: noteId } })
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
        getStyle(note) {
            return {
                backgroundColor: note.style.backgroundColor,
            }
        },
        btnPinnedStyle(note){
            return {
                color: (note.isPinned) ? 'var(--clr5)' : 'var(--clr3)'
            }
        },
        save(note){
            console.log(note);
            noteService.save(note)
        }
    },
    components: {
        NotePreview,
        NoteImg,
        NoteTxt,
        NoteVideo,
        NoteTodos,
        ColorPalette,
    }
}
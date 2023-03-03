import NoteFilter from '../cmps/NoteFilter.js'


export default {
    template: `
        <section class="note-hamburger">
            <button 
                @click="isShow = !isShow" 
                class="fa-solid fa-bars"
                :class="btnClass">
            </button>
            <NoteFilter v-if="isShow"
                    @filter="setFilterBy"
            />
        </section>
    `,
    data() {
        return {
            isShow: true,
        }
    },
    computed: {
        btnClass(){
            return this.isShow ? 'show-filter' : ''
        }
    },
    methods: {
        setFilterBy(filterBy) {
            this.$emit('filter', filterBy)
        }
    },
    components: {
        NoteFilter
    }
}
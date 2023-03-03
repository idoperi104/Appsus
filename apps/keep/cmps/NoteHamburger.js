import NoteFilter from '../cmps/NoteFilter.js'


export default {
    template: `
        <section class="note-hamburger">
            <button 
                @click.stop="isShow = !isShow" 
                class="fa-solid fa-bars"
                :class="btnClass">
            </button>
            <NoteFilter 
                v-if="isShow"
                @filter="setFilterBy"
            />
        </section>
    `,
    data() {
        return {
            isShow: this.setIsShow(),
        }
    },
    computed: {
        btnClass(){
            return this.isShow ? 'show-filter' : ''
        },
    },
    methods: {
        setFilterBy(filterBy) {
            console.log(filterBy);
            this.$emit('filter', filterBy)
            if (window.innerWidth < 640) this.isShow = false
        },
        setIsShow(){
            return window.innerWidth < 640 ? false : true
        },
        closeIsShow(ev){
            console.log(ev);
            if (this.isShow && window.innerWidth < 640 && ev.clientX > 80) this.isShow = false
        },
    },
    mounted(){
        window.addEventListener('click', this.closeIsShow)
    },
    unmounted(){
        window.removeEventListener('click', this.closeIsShow)
    },
    components: {
        NoteFilter
    }
}
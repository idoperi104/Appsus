export default {
    template: `

        <section class="note-filter">

            <input @input="filter" type="radio" id="all" value="" v-model="filterBy.type">
            <label for="all" class="fa-regular fa-lightbulb"></label>
            <input @input="filter" type="radio" id="txt" value="NoteTxt" v-model="filterBy.type">
            <label for="txt" class="fa-regular fa-file-lines"></label>
            <input @input="filter" type="radio" id="img" value="NoteImg" v-model="filterBy.type">
            <label for="img"class="fa-regular fa-image"></label>
            <input @input="filter" type="radio" id="vid" value="NoteVideo" v-model="filterBy.type">
            <label for="vid" class="fa-solid fa-video"></label>
            <input @input="filter" type="radio" id="todo" value="NoteTodos" v-model="filterBy.type">
            <label for="todo" class="fa-solid fa-list-ul"></label>
            
        </section>

    `,
    data() {
        return {
            filterBy: { txt: '', type: '' },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        stop(){
            console.log('stopped');
        }
    },
}
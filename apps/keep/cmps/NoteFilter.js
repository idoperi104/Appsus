export default {
    template: `
        <section class="note-filter">
            <input 
                v-model="filterBy.txt"
                @input="filter" 
                placeholder="Search"
                type="text" />
            <br/>

            <input @input="filter" type="radio" id="all" value="" v-model="filterBy.type">
            <label for="all">all</label><br>
            <input @input="filter" type="radio" id="txt" value="NoteTxt" v-model="filterBy.type">
            <label for="txt">txt</label><br>
            <input @input="filter" type="radio" id="img" value="NoteImg" v-model="filterBy.type">
            <label for="img">img</label><br>
            <input @input="filter" type="radio" id="vid" value="NoteVideo" v-model="filterBy.type">
            <label for="vid">vid</label><br>
            <input @input="filter" type="radio" id="todo" value="NoteTodos" v-model="filterBy.type">
            <label for="todo">todo</label><br>
            
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
        }
    },
    // created() {
    //     this.filter()
    // },
}
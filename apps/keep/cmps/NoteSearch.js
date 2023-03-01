export default {
    template: `
        <section class="note-search">
            <input 
                v-model="filterBy.txt"
                @input="filter" 
                placeholder="Search"
                type="text" />

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
}
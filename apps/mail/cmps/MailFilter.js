export default {
    template: `
        <section class="mail-filter">
            <input 
                v-model="filterBy.subject"
                placeholder="Search"
                type="text" />
        </section>
    `,
    data() {
        return {
            filterBy: { subject: ''},
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
    watch: {
        filterBy: {
            handler() {
                console.log('filterBy changed', this.filterBy)
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
    }
}

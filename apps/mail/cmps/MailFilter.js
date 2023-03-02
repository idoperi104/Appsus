export default {
    template: `
        <section class="mail-filter">
            <input 
                class=""
                v-model="filterBy.subject"
                placeholder="Search"
                type="text" />
                <button @click="toggleOptions" class="fa-solid fa-filter"></button>
                <article v-if="showOptions" class="filter-options">
                    <h4>filter by:</h4>
                    <p>
                       <button :class="filterBy.isRead === 'read' ? filter-active : '' " @click="filterBy.isRead = 'read'">read</button>
                       <button :class="filterBy.isRead === 'unRead' ? filter-active : '' " @click="filterBy.isRead = 'unRead'">unRead</button>
                       <button :class="filterBy.isRead === 'all' ? filter-active : '' " @click="filterBy.isRead = 'all'">all</button>
                    </p>
                </article>
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                isRead: 'all',
            
            },
            showOptions: false,
        }
    },
    methods: {
        filter() {
            console.log('filterBy changed', this.filterBy)
            this.$emit('filter', this.filterBy)
        },
        toggleOptions() {
            this.showOptions = !this.showOptions
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.filter()
            },
            deep: true
        },
    }
}

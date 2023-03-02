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
                       <button :class="{ 'filter-active': filterBy.isRead === 'read' }" @click="filterBy.isRead = 'read'">read</button>
                       <button :class="{ 'filter-active': filterBy.isRead === 'unRead' }" @click="filterBy.isRead = 'unRead'">unRead</button>
                       <button :class="{ 'filter-active': filterBy.isRead === 'all' }" @click="filterBy.isRead = 'all'">all</button>
                    </p>
                    <p>
                       <button :class="{ 'filter-active': filterBy.isStar === 'star' }" @click="filterBy.isStar = 'star'">star</button>
                       <button :class="{ 'filter-active': filterBy.isStar === 'unStar' }" @click="filterBy.isStar = 'unStar'">unStar</button>
                       <button :class="{ 'filter-active': filterBy.isStar === 'all' }" @click="filterBy.isStar = 'all'">all</button>
                    </p>
                </article>
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                isRead: 'all',
                isStar: 'all'
            
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

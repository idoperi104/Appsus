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
                    <button :class="{ 'filter-active': filterBy.isRead === 'all' }" @click="filterBy.isRead = 'all'">all</button>
                    <button data-title="Read" class="fa-solid fa-eye" :class="{ 'filter-active': filterBy.isRead === 'read' }" @click="filterBy.isRead = 'read'"></button>
                    <button data-title="Un read" class="fa-solid fa-eye-slash" :class="{ 'filter-active': filterBy.isRead === 'unRead' }" @click="filterBy.isRead = 'unRead'"></button>
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
        'filterBy.isRead': {
            handler(){
                this.showOptions = false
            }
        }
    }
}

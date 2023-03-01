export default {
    template: `
        <section class="mail-folder-list">
            <ul>
                <li @click="filterBy.status = 'inbox'">Inbox</li>
                <li @click="filterBy.status = 'sent'">Sent</li>
                <li @click="filterBy.status = 'trash'">Trash</li>
                <li @click="filterBy.status = 'draft'">Draft</li>
            </ul>
        </section>
    `,
    data() {
        return {
            filterBy: { status: 'inbox', },
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
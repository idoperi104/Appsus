export default {
    props: ['unReadCount'],
    template: `
        <section class="mail-folder-list">
            <ul class="clean-list">
                <li @click="compose">Compose</li>
                <li @click="filterBy.status = 'inbox'">Inbox <span v-if="checkStatus('inbox')" :title="unReadTitle">{{unReadCount}}</span></li>
                <li @click="filterBy.status = 'sent'">Sent <span v-if="checkStatus('sent')" :title="unReadTitle">{{unReadCount}}</span></li>
                <li @click="filterBy.status = 'trash'">Trash <span v-if="checkStatus('trash')" :title="unReadTitle">{{unReadCount}}</span></li>
                <li @click="filterBy.status = 'draft'">Draft <span v-if="checkStatus('draft')" :title="unReadTitle">{{unReadCount}}</span></li>
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
        },
        compose() {
            this.$emit('compose')
        },
        checkStatus(status) {
            return this.filterBy.status === status
        }
    },
    computed: {
        unReadTitle() {
            const singelMail = this.unReadCount === 1 ? 'mail' : 'mails'
            return 'you have ' + this.unReadCount + ' un read ' + singelMail
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
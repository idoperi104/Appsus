export default {
    props: ['unReadCount'],
    template: `
        <section class="mail-folder-list">
            <ul class="clean-list">
                <li @click="compose"><i class="fa-solid fa-pencil"></i> Compose</li>
                <li  @click="filterBy.status = 'inbox'"> <i class="fa-solid fa-inbox"></i> Inbox <span v-if="checkStatus('inbox')" :title="unReadTitle">{{unReadCount}}</span></li>
                <li @click="filterBy.status = 'sent'"><i class="fa-regular fa-paper-plane"></i> Sent <span v-if="checkStatus('sent')" :title="unReadTitle">{{unReadCount}}</span></li>
                <li @click="filterBy.status = 'trash'"><i class="fa-solid fa-trash-can"></i> Trash <span v-if="checkStatus('trash')" :title="unReadTitle">{{unReadCount}}</span></li>
                <li @click="filterBy.status = 'draft'"><i class="fa-regular fa-file"></i> Draft <span v-if="checkStatus('draft')" :title="unReadTitle">{{unReadCount}}</span></li>
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
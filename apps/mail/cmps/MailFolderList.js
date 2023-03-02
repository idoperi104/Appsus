export default {
    props: ['unReadCount', 'isClose'],
    template: `
        <section class="mail-folder-list">
            <ul v-if="!isClose" class="clean-list">
                <li @click="compose"><i class="fa-solid fa-pencil"></i> Compose</li>
                <li :class="isActive('inbox')"  @click="filterBy.status = 'inbox'"><i class="fa-solid fa-inbox"></i> Inbox <span v-if="checkStatus('inbox')" :data-title="unReadTitle">{{unReadCount}}</span></li>
                <li :class="isActive('star')"  @click="filterBy.status = 'star'"><i class="fa-regular fa-star"></i> Starred <span v-if="checkStatus('star')" :data-title="unReadTitle">{{unReadCount}}</span></li>
                <li :class="isActive('sent')" @click="filterBy.status = 'sent'"><i class="fa-regular fa-paper-plane"></i> Sent <span v-if="checkStatus('sent')" :data-title="unReadTitle">{{unReadCount}}</span></li>
                <li :class="isActive('trash')" @click="filterBy.status = 'trash'"><i class="fa-solid fa-trash-can"></i> Trash <span v-if="checkStatus('trash')" :data-title="unReadTitle">{{unReadCount}}</span></li>
                <li :class="isActive('draft')" @click="filterBy.status = 'draft'"><i class="fa-regular fa-file"></i> Draft <span v-if="checkStatus('draft')" :data-title="unReadTitle">{{unReadCount}}</span></li>
            </ul>
            <ul v-if="isClose" class="clean-list">
                <li @click="compose"><i class="fa-solid fa-pencil"></i></li>
                <li :class="isActive('inbox')"  @click="filterBy.status = 'inbox'"><i class="fa-solid fa-inbox"></li>
                <li :class="isActive('star')"  @click="filterBy.status = 'star'"><i class="fa-regular fa-star"></li>
                <li :class="isActive('sent')" @click="filterBy.status = 'sent'"><i class="fa-regular fa-paper-plane"></li>
                <li :class="isActive('trash')" @click="filterBy.status = 'trash'"><i class="fa-solid fa-trash-can"></li>
                <li :class="isActive('draft')" @click="filterBy.status = 'draft'"><i class="fa-regular fa-file"></li>
            </ul>
        </section>
    `,
    data() {
        return {
            filterBy: { status: 'inbox', },
            activeClass: 'active-folder',
        }
    },
    created() {
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
        },
        isActive(status) {
            return this.checkStatus(status) ? this.activeClass : ''
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
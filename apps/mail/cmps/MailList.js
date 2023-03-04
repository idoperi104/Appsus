import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <div class="mail-sort-by">
                <label class="mail-sort-subject">subject <button @click="toggleSortDirection(), setSortBy('subject')" :class="classSubSort" class="fa-solid"></button></label>
                <label class="mail-sort-date">date <button @click="toggleSortDirection(), setSortBy('date')" :class="classDateSort" class="fa-solid"></button></label>
            </div>
            <ul class="clean-list">
                <li  v-for="mail in mails" :key="mail.id">
                    <RouterLink :to="{name:'MailDetails', params:{mailId:mail.id}}">
                        <MailPreview :mail="mail"/>
                    </RouterLink> 
                    <button class="mail-btn-remove fa-regular fa-trash-can" :data-title="!!mail.removedAt ? 'Delete for good' : 'Move To trash'" @click="remove(mail.id)"></button>
                    <button :class="(mail.isRead) ? 'fa-eye-slash' : 'fa-eye'" class="mail-btn-unRead fa-solid" :data-title="(mail.isRead) ? 'Mark as un read' : 'Mark as read'" @click="unRead(mail)"></button>
                </li>
            </ul>
            <h3 v-if="!mails.length" >There are no mails to show in this category</h3>
        </section>
    `,
    created() {
        this.sortMails()
    },
    data() {
        return {
            sortBy: 'date',
            sortDirection: 'desc',
        }
    },
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
        unRead(mail) {
            this.$emit('unRead', mail)
        },
        toggleSortDirection() {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        },
        setSortBy(sortBy) {
            this.sortBy = sortBy
        },
        sortMails() {
            this.mails.sort((a, b) => {
                if (this.sortBy === 'subject') {
                    return this.sortDirection === 'asc'
                        ? a.subject.localeCompare(b.subject)
                        : b.subject.localeCompare(a.subject);
                } else if (this.sortBy === 'date') {
                    return this.sortDirection === 'asc'
                        ? new Date(a.sentAt) - new Date(b.sentAt)
                        : new Date(b.sentAt) - new Date(a.sentAt)
                }
            })
        },
    },
    computed: {
        classSubSort() {
            return {
                "fa-sort": this.sortBy !== 'subject',
                "fa-sort-down": this.sortBy === 'subject' && this.sortDirection === 'desc',
                "fa-sort-up": this.sortBy === 'subject' && this.sortDirection === 'asc',
            }
        },
        classDateSort() {
            return {
                "fa-sort": this.sortBy !== 'date',
                "fa-sort-down": this.sortBy === 'date' && this.sortDirection === 'desc',
                "fa-sort-up": this.sortBy === 'date' && this.sortDirection === 'asc',
            }
        },
    },
    watch: {
        sortDirection: {
            handler() {
                this.sortMails()
            }
        }
    },
    components: {
        MailPreview,
    }
}
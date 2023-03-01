import { MailService } from '../services/mail.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'
import MailFolderList from '../cmps/MailFolderList.js'

export default {
    template: `
    <section class="mail-index">
        <header class="main-mail-header">
            <h1>im mail index</h1>
            <MailFilter @filter="setFilterBy" />
        </header>
        <MailFolderList class="mail-folder-list" @filter="setFilterBy" />
        <MailList 
        :mails="mails"
        />

    </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: {
                status: '',
                subject: '', // no need to support complex text search
                isRead: null, // (optional property, if missing: show all)
                isStared: false, // (optional property, if missing: show all)
                labels: [] // has any of the labels
            },
        }

    },
    created() {
        MailService.query()
            .then(mails => this.mails = mails)
    },
    methods: {
        setFilterBy(filterBy) {
            const { status, subject, isRead, isStared, labels } = filterBy
            this.filterBy.status = status || this.filterBy.status
            this.filterBy.subject = subject || this.filterBy.subject
            this.filterBy.isRead = isRead || this.filterBy.isRead
            this.filterBy.isStared = isStared || this.filterBy.isStared
            this.filterBy.labels = labels || this.filterBy.labels
            this.filterMails()
        },
        filterMails() {
            MailService.query(this.filterBy)
                .then(mails => {
                    this.mails = mails
                })
        }
    },
    computed: {

    },
    components: {
        MailList,
        MailFilter,
        MailFolderList,
    }
}
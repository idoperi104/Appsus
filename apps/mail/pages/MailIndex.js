import { MailService } from '../services/mail.service.js'
import { eventBus } from "../../../services/event-bus.service.js"

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'
import MailFolderList from '../cmps/MailFolderList.js'
import MailCompose from '../cmps/MailCompose.js'

export default {
    template: `
    <section class="mail-index">
        <header class="main-mail-header">
            <h1>im mail index</h1>
            <MailFilter @filter="setFilterBy" />
        </header>
        <MailFolderList :unReadCount="totalUnReadMails" class="mail-folder-list" @compose="showCompose" @filter="setFilterBy" />
        <MailList
            :mails="mails"
            @remove="removeMail"
            @unRead="setUnRead"        />
        <MailCompose
            v-if="isCompose"
            @sand="sandMail"
        />

    </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: {
                status: 'inbox',
                subject: '', // no need to support complex text search
                isRead: null, // (optional property, if missing: show all)
                isStared: false, // (optional property, if missing: show all)
                labels: [] // has any of the labels
            },
            isCompose: false,
        }

    },
    created() {
        eventBus.on('setToRead', this.setToRead)
        this.filterMails()
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
        },
        showCompose() {
            this.isCompose = true
        },
        removeMail(mailId) {
            MailService.get(mailId)
                .then(mail => {
                    console.log("mail: ", mail);
                    mail.removedAt
                        ? MailService.remove(mail.id)
                        : mail.removedAt = Date.now()
                })
                .then(this.filterMails)

        },
        setUnRead(mail) {
            mail.isRead = !mail.isRead
            MailService.save(mail)
                .then(mail => console.log(mail))

        },
        sandMail(mail) {
            MailService.save(mail)
                .then(this.isCompose = false)
        },
        setToRead(mailId) {
            MailService.get(mailId)
                .then(mail => {
                    mail.isRead = true
                    return mail
                })
                .then(MailService.save)
        },
    },
    computed: {
        totalUnReadMails() {
            return this.mails.filter(mail => !mail.isRead).length
        },
    },
    components: {
        MailList,
        MailFilter,
        MailFolderList,
        MailCompose,
    }
}
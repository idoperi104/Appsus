import { MailService } from '../../mail/services/mail.service.js'
import { eventBus, showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'
import MailFolderList from '../cmps/MailFolderList.js'
import MailCompose from '../cmps/MailCompose.js'

export default {
    template: `
    <section class="mail-index">
        <header class="main-mail-header">
            <article class="mail-logo">
                <i class="fa-solid fa-bars"></i>
                <div class="mail-logo-img"></div>
                <h1>G'AMAL</h1>
            </article>
            <MailFilter @filter="setFilterBy" />
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg> -->
        </header>
        <MailFolderList :unReadCount="totalUnReadMails" class="mail-folder-list" @compose="showCompose" @filter="setFilterBy" />
        <MailList
            :mails="filteredMails"
            @remove="removeMail"
            @unRead="setUnRead"
            />
        <MailCompose
            v-if="isCompose"
            @sand="sandMail"
            @close="isCompose = false"
        />

    </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: {
                status: 'inbox',
                subject: '', 
                isRead: 'all',
                isStar: 'all',
                isStared: false, 
                labels: [] 
            },
            isCompose: false,
        }

    },
    created() {
        eventBus.on('setToRead', this.setToRead)
        eventBus.on('setIsStar', this.setIsStar)
        eventBus.on('removeMail', this.removeMail)
        this.filterMails()
    },
    methods: {
        setFilterBy(filterBy) {
            const { status, subject, isRead, isStar ,isStared, labels } = filterBy
            this.filterBy.status = status || this.filterBy.status
            this.filterBy.subject = subject || this.filterBy.subject
            this.filterBy.isRead = isRead || this.filterBy.isRead
            this.filterBy.isStar = isStar || this.filterBy.isStar
            this.filterBy.isStared = isStared || this.filterBy.isStared
            this.filterBy.labels = labels || this.filterBy.labels
            this.filterMails()
        },
        filterMails() {
            MailService.query(this.filterBy)
                .then(mails => {
                    this.mails = mails
                    console.log("this.mails: ", mails);
                })


        },
        showCompose() {
            this.isCompose = true
        },
        removeMail(mailId) {
            if (this.filterBy.status !== 'trash') {
                MailService.get(mailId)
                    .then(mail => {
                        mail.removedAt = Date.now()
                        return MailService.save(mail)
                    })
                    .then(this.filterMails)
                    .then(() => this.filterBy.status = 'trash')
                    .then(() => {
                        showSuccessMsg('Mail moved to trash')
                    })
                    .catch(err => {
                        showErrorMsg('Mail remove failed')
                    })
            } else {
                MailService.remove(mailId)
                    .then(this.filterMails)
                    .then(() => {
                        showSuccessMsg('Mail Deleted for good')
                    })
                    .catch(err => {
                        showErrorMsg('Mail Delete failed')
                    })
            }


        },
        setUnRead(mail) {
            mail.isRead = !mail.isRead
            MailService.save(mail)
                .then(mail => console.log(mail))

        },
        sandMail(mail) {
            MailService.save(mail)
                .then(() => {
                    this.isCompose = false
                    this.filterMails()
                })
                .then(() => {
                    showSuccessMsg('Email sent')
                })
                .catch(err => {
                    showErrorMsg('Email failed to send')
                })
        },
        setToRead(mailId) {
            MailService.get(mailId)
                .then(mail => {
                    mail.isRead = true
                    return mail
                })
                .then(MailService.save)
        },
        setIsStar(mail) {
            MailService.save(mail)
                .then((mail) => {
                    showSuccessMsg(mail.isStar ? 'Mail stared' : 'Mail UnStared')
                })
                .catch(err => {
                    showErrorMsg('Staring failed')
                })
        },
    },
    computed: {
        totalUnReadMails() {
            return this.mails.filter(mail => !mail.isRead).length
        },
        filteredMails() {
            if (!this.filterBy.subject) return this.mails
            const regex = new RegExp(this.filterBy.subject, 'i')
            return this.mails.filter(mail => {
                return regex.test(mail.subject)
            })
        }
    },
    components: {
        MailList,
        MailFilter,
        MailFolderList,
        MailCompose,
    }
}
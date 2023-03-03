import { mailService } from '../../mail/services/mail.service.js'
import { eventBus, showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'
import MailFolderList from '../cmps/MailFolderList.js'
import MailCompose from '../cmps/MailCompose.js'

export default {
    template: `
    <section :class="(isClose) ? 'close' : 'open'" class="mail-index">
        <header class="main-mail-header">
            <article class="mail-logo">
                <i @click="toggleMenu" class="fa-solid fa-bars"></i>
                <div class="mail-logo-img"></div>
                <h1>G'AMAL</h1>
            </article>
            <MailFilter @filter="setFilterBy" />
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg> -->
        </header>
        <MailFolderList :filterStatus="filterBy.status" :isClose="isClose" :unReadCount="totalUnReadMails" class="mail-folder-list" @compose="showCompose" @filter="setFilterBy" />
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
            isClose: true
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
            const { status, subject, isRead, isStar, isStared, labels } = filterBy

            this.filterBy.status = status || this.filterBy.status
            this.filterBy.subject = subject === '' ? 'all' : subject || this.filterBy.subject
            this.filterBy.isRead = isRead || this.filterBy.isRead
            this.filterBy.isStar = isStar || this.filterBy.isStar
            this.filterBy.isStared = isStared || this.filterBy.isStared
            this.filterBy.labels = labels || this.filterBy.labels
            this.filterMails()
        },
        filterMails() {
            mailService.query(this.filterBy)
                .then(mails => {
                    this.mails = mails
                    console.log("this.mails: ", mails);
                })


        },
        showCompose() {
            this.isCompose = !this.isCompose
        },
        removeMail(mailId) {
            console.log("mailId: ", mailId);
            if (this.filterBy.status !== 'trash') {
                mailService.get(mailId)
                    .then(mail => {
                        mail.removedAt = Date.now()
                        return mailService.save(mail)
                    })
                    .then(() => this.filterBy.status = 'trash')
                    .then(this.setFilterBy)
                    .then(() => {
                        showSuccessMsg('Mail moved to trash')
                    })
                    .catch(err => {
                        showErrorMsg('Mail remove failed')
                    })
            } else {
                mailService.remove(mailId)
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
            mailService.save(mail)
                .then(mail => console.log(mail))

        },
        sandMail(mail) {
            mailService.save(mail)
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
            mailService.get(mailId)
                .then(mail => {
                    mail.isRead = true
                    return mail
                })
                .then(mailService.save)
        },
        setIsStar(mail) {
            mailService.save(mail)
                .then((mail) => {
                    showSuccessMsg(mail.isStar ? 'Mail stared' : 'Mail UnStared')
                })
                .catch(err => {
                    showErrorMsg('Staring failed')
                })
        },
        toggleMenu() {
            this.isClose = !this.isClose
        }
    },
    computed: {
        totalUnReadMails() {
            return this.mails.filter(mail => !mail.isRead).length
        },
        filteredMails() {
            if (this.filterBy.subject === 'all') return this.mails
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
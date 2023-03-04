import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            return mails.filter(mail => {
                return _setStatusFilter(mail, filterBy.status)
                    && _setIsReadFilter(mail, filterBy.isRead)
            })
        })
}

function _setStatusFilter(mail, status) {
    switch (status) {
        case 'inbox':
            return mail.to === loggedinUser.email && !mail.removedAt
        case 'sent':
            return mail.from === loggedinUser.email && !mail.removedAt
        case 'trash':
            return !!mail.removedAt
        case 'star':
            return mail.isStar
        // case 'draft':
    }
}

function _setIsReadFilter(mail, isRead) {
    switch (isRead) {
        case 'all':
            return true
        case 'unRead':
            return !mail.isRead
        case 'read':
            return mail.isRead
    }
}

function get(MailId) {
    return storageService.get(MAIL_KEY, MailId)
    // .then(_setNextPrevCarId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (!mail.from) mail.from = loggedinUser.email
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}
//-----------------------   DEMO DATA  ---------------------- \\

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Dropbox', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 1)))
        mails.push(_createMail('Google', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 2)))
        mails.push(_createMail('Amazon', utilService.makeLorem(100), Date.now() - (1000 * 60 * 60 * 24 * 5)))
        mails.push(_createMail('Dropbox', utilService.makeLorem(50), Date.now() - (1000 * 60 * 60 * 24 * 12)))
        mails.push(_createMail('YouTube', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 1)))
        mails.push(_createMail('birds', utilService.makeLorem(24), Date.now() - (1000 * 60 * 60 * 13)))
        mails.push(_createMail('Facebook', utilService.makeLorem(60), Date.now() - (1000 * 60 * 60 * 24 * 1)))
        mails.push(_createMail('Amazon', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 24)))
        mails.push(_createMail('Coding Academy', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 24)))
        mails.push(_createMail('YouTube', utilService.makeLorem(50), Date.now() - (1000 * 60 * 60 * 24 * 1)))
        mails.push(_createMail('birds', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 2)))
        mails.push(_createMail('Facebook', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 5)))
        mails.push(_createMail('Coding Academy', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 5)))
        mails.push(_createMail('Dropbox', utilService.makeLorem(20), Date.now() - (1000 * 60 * 60 * 24 * 3)))
        mails.push(_createMail('Facebook', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 12)))
        mails.push(_createMail('Google', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 400)))
        mails.push(_createMail('Slack', utilService.makeLorem(70), Date.now() - (1000 * 60 * 60 * 12)))
        mails.push(_createMail('Coding Academy', utilService.makeLorem(70), Date.now() - (1000 * 60 * 60 * 12)))
        mails.push(_createMail('Facebook', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 5)))
        mails.push(_createMail('Dropbox', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 5)))
        mails.push(_createMail('Google', utilService.makeLorem(90), Date.now() - (1000 * 60 * 60 * 24 * 1)))
        mails.push(_createMail('Amazon', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 2)))
        mails.push(_createMail('Google', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 5)))
        mails.push(_createMail('Slack', utilService.makeLorem(70), Date.now() - (1000 * 60 * 60 * 12)))
        mails.push(_createMail('ebay', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 5)))
        mails.push(_createMail('ebay', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 5)))
        mails.push(_createMail('ebay', utilService.makeLorem(90), Date.now() - (1000 * 60 * 60 * 24 * 1)))
        mails.push(_createMail('ebay', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 8)))
        mails.push(_createMail('ebay', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 23)))
        mails.push(_createMail('Coding Academy', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 12)))
        mails.push(_createMail('Narcos is the bast tv show ever!', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 5)))
        
        mails.push(_createMail('YouTube', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 1)))
        mails.push(_createMail('birds', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 2)))
        mails.push(_createMail('Dropbox', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 5)))
        mails.push(_createMail('Slack', utilService.makeLorem(10), Date.now() - (1000 * 60 * 60 * 24 * 380)))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, sentAt) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: (Math.random() > 0.4),
        isStar: (Math.random() > 0.8),
        sentAt,
        removedAt: null,
        from: (Math.random() > 0.2) ? 'momo@momo.com' : 'user@appsus.com',
        to: 'user@appsus.com'
    }

}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}
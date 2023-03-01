import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const MailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const regex = new RegExp(filterBy.subject, 'i')
            return mails.filter(mail => {
                return regex.test(mail.subject)
                && (filterBy.status === 'inbox') ? mail.to === loggedinUser.email : true
                && (filterBy.status === 'sent') ? mail.from === loggedinUser.email : true
                && (filterBy.status === 'trash') ? mail.removedAt : true
                && (filterBy.status === 'darft') ? mail.removedAt : true
            })
        })
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

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('gloves', utilService.makeLorem(10)))
        mails.push(_createMail('birds', utilService.makeLorem(10)))
        mails.push(_createMail('gold', utilService.makeLorem(10)))
        mails.push(_createMail('avatar', utilService.makeLorem(10)))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
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
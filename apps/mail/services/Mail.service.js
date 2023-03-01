import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
   }

export const carService = {
    query,
    get,
    remove,
    save,
    // getEmptyMail,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // TODO: filterBy params
            // if (filterBy.txt) {
            //     const regex = new RegExp(filterBy.txt, 'i')
            //     mails = mails.filter(car => regex.test(car.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     mails = mails.filter(car => car.maxSpeed >= filterBy.minSpeed)
            // }
            return mails
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
        mails.push(_createMail('audu', 300))
        mails.push(_createMail('fiak', 120))
        mails.push(_createMail('subali', 100))
        mails.push(_createMail('mitsu', 150))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

// function getEmptyMail(vendor = '', maxSpeed = 0) {
//     return { id: '', vendor, maxSpeed }
// }
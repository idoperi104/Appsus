import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
}

function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(_setNextPrevNoteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#eeeeee'
        },
        info: {
            txt: ''
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#fff'
                }, info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n201',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#eee'
                }, info: {
                    txt: utilService.makeLorem(30)
                }
            },
            {
                id: 'n301',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#fff'
                }, info: {
                    txt: 'puki muki shuki!'
                }
            },
            {
                id: 'n401',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#eee'
                }, info: {
                    txt: utilService.makeLorem()
                }
            },
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

// function _createNote(vendor, maxSpeed = 250) {
//     const car = getEmptyNote(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        note.nextNoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
        note.prevNoteId = notes[noteIdx - 1]
            ? notes[noteIdx - 1].id
            : notes[notes.length - 1].id
        return note
    })
}


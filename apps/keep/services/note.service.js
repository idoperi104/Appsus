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

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            const regexType = new RegExp(filterBy.type, 'i')
            const regex = new RegExp(filterBy.txt, 'i')
            return notes.filter(note => {
                return (regex.test(note.info.txt) || regex.test(note.info.title))
                && regexType.test(note.type)
            })
        })
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
                isPinned: false,
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
                isPinned: false,
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
            {
                id: 'nf43',
                createdAt: 1112222,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#fff'
                }, info: {
                    title: 'im img!',
                    url: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285__340.jpg'
                }
            },
            {
                id: 'nf93',
                createdAt: 1112222,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#fff'
                }, info: {
                    title: 'im img!',
                    url: 'https://thumbs.dreamstime.com/b/beach-sea-18378306.jpg'
                }
            },
            {
                id: 'n234',
                createdAt: 1112222,
                type: 'NoteVideo',
                isPinned: true,
                style: {
                    backgroundColor: '#eee'
                }, info: {
                    txt: 'im video!'
                }
            },
            {
                id: 'n543',
                createdAt: 1112222,
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#fff'
                }, 
                info: {
                    txt: 'im totod!'
                }
            },
            {
                id: 'n445',
                createdAt: 1112222,
                type: 'NoteVideo',
                isPinned: true,
                style: {
                    backgroundColor: '#eee'
                }, info: {
                    txt: 'im video!'
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
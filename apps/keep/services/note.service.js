import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import notesDB from "../data/notes.json" assert { type: "json" }

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
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#f0efeb'
        },
        info: {
            txt: '',
            title: '',
            url: '',
            todos: []
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = notesDB
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


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
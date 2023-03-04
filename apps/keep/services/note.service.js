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
        var notesDB = [
            {
                "id": "n0001",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#a0c4ff"
                },
                "info": {
                    "title": "Vacation",
                    "url": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8NGslMjBtb3VudGFpbnxlbnwwfHwwfHw%3D&w=1000&q=80"
                }
            },
            {
                "id": "n00097",
                "type": "NoteVideo",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#bdb2ff"
                },
                "info": {
                    "title": "Grid",
                    "url": "https://www.youtube.com/watch?v=EiNiSFIPIQE"
                }
            },
            {
                "id": "n00096",
                "type": "NoteVideo",
                "isPinned": true,
                "style": {
                    "backgroundColor": "#caffbf"
                },
                "info": {
                    "title": "Vue",
                    "url": "https://www.youtube.com/watch?v=1GNsWa_EZdw"
                }
            },
            {
                "id": "n001102",
                "type": "NoteTxt",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#caffbf"
                },
                "info": {
                    "title": "Just You To Know",
                    "txt": "Yuval is the best mentor!!!!!!"
                }
            },
            {
                "id": "n001104",
                "type": "NoteTxt",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#ffd6a5"
                },
                "info": {
                    "title": "AppStore Password",
                    "txt": "*********"
                }
            },
            {
                "id": "n0002",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#caffbf"
                },
                "info": {
                    "title": "River",
                    "url": "data:image/jpeg;base64,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"
                }
            },
            {
                "id": "n0011011",
                "type": "NoteTxt",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#fdffb6"
                },
                "info": {
                    "title": "BirthDay",
                    "txt": "april 10 2001"
                }
            },
            {
                "id": "n0003",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#ffadad"
                },
                "info": {
                    "title": "Fire",
                    "url": "data:image/jpeg;base64,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"
                }
            },
            {
                "id": "n00098",
                "type": "NoteTodos",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#f0efeb"
                },
                "info": {
                    "title": "To Buy:",
                    "todos": [
                        {
                            "todo": "pasta",
                            "isMarked": false
                        },
                        {
                            "todo": "Coke Zero",
                            "isMarked": false
                        },
                        {
                            "todo": "tomatos",
                            "isMarked": true
                        },
                        {
                            "todo": "meat",
                            "isMarked": true
                        },
                        {
                            "todo": "milk",
                            "isMarked": false
                        }
                    ]
                }
            },
            {
                "id": "n0006",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#bdb2ff"
                },
                "info": {
                    "title": "Sunset",
                    "url": "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&w=300"
                }
            },
            {
                "id": "n0008",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#f0efeb"
                },
                "info": {
                    "title": "My Cat",
                    "url": "https://images.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg?auto=compress&cs=tinysrgb&w=300"
                }
            },
            {
                "id": "n00099",
                "type": "NoteTodos",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#fdffb6"
                },
                "info": {
                    "title": "Tasks:",
                    "todos": [
                        {
                            "todo": "training",
                            "isMarked": true
                        },
                        {
                            "todo": "haircut",
                            "isMarked": false
                        },
                        {
                            "todo": "meet Grandma",
                            "isMarked": false
                        }
                    ]
                }
            },
            {
                "id": "n0009",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#ffc6ff"
                },
                "info": {
                    "title": "Anoter Sunset",
                    "url": "https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&w=300"
                }
            },
            {
                "id": "n00091",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#ffd6a5"
                },
                "info": {
                    "title": "Tom...",
                    "url": "https://media.tenor.com/zd9tDCODRdkAAAAM/cartoons.gif"
                }
            },
            {
                "id": "n00092",
                "type": "NoteImg",
                "isPinned": true,
                "style": {
                    "backgroundColor": "#f0efeb"
                },
                "info": {
                    "title": "hahaha",
                    "url": "https://media.tenor.com/5vAKem8zo6wAAAAM/laugh-donald-duck.gif"
                }
            },
            {
                "id": "n001101",
                "type": "NoteTxt",
                "isPinned": true,
                "style": {
                    "backgroundColor": "#bdb2ff"
                },
                "info": {
                    "title": "Remember!!!",
                    "txt": "data is a function that returns object!"
                }
            },
            {
                "id": "n00093",
                "type": "NoteImg",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#9bf6ff"
                },
                "info": {
                    "title": "SphongeBob",
                    "url": "https://media.tenor.com/kwoZiw3sdlwAAAAM/spongebob-cartoon.gif"
                }
            },
            {
                "id": "n00094",
                "type": "NoteVideo",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#ffadad"
                },
                "info": {
                    "title": "FlexBox",
                    "url": "https://www.youtube.com/watch?v=phWxA89Dy94"
                }
            },
            {
                "id": "n00097",
                "type": "NoteVideo",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#bdb2ff"
                },
                "info": {
                    "title": "Grid",
                    "url": "https://www.youtube.com/watch?v=EiNiSFIPIQE"
                }
            },
            {
                "id": "n00097",
                "type": "NoteTodos",
                "isPinned": true,
                "style": {
                    "backgroundColor": "#a0c4ff"
                },
                "info": {
                    "title": "Sprint 3",
                    "todos": [
                        {
                            "todo": "delivery 1",
                            "isMarked": true
                        },
                        {
                            "todo": "delivery 2",
                            "isMarked": true
                        },
                        {
                            "todo": "delivery 3",
                            "isMarked": true
                        },
                        {
                            "todo": "beers and apps",
                            "isMarked": false
                        }
                    ]
                }
            },
            {
                "id": "n001106",
                "type": "NoteTxt",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#ffc6ff"
                },
                "info": {
                    "title": "My Phone Number:",
                    "txt": "0525000164"
                }
            },
        
        
            {
                "id": "n001105",
                "type": "NoteTxt",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#f0efeb"
                },
                "info": {
                    "title": "My Name:",
                    "txt": "Ido Peri"
                }
            },
            {
                "id": "n00100",
                "type": "NoteTodos",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#ffd6a5"
                },
                "info": {
                    "title": "Keep:",
                    "todos": [
                        {
                            "todo": "txt",
                            "isMarked": true
                        },
                        {
                            "todo": "img",
                            "isMarked": true
                        },
                        {
                            "todo": "video",
                            "isMarked": true
                        },
                        {
                            "todo": "todos",
                            "isMarked": true
                        },
                        {
                            "todo": "responsive",
                            "isMarked": true
                        }
                    ]
                }
            },
        
            {
                "id": "n001103",
                "type": "NoteTxt",
                "isPinned": false,
                "style": {
                    "backgroundColor": "#a0c4ff"
                },
                "info": {
                    "title": "",
                    "txt": "Tomer Huberman is a mechine"
                }
            }
        ]
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


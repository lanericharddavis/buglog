
import { AppState } from '../AppState.js'
// import router from '../router.js'
import { api } from './AxiosService.js'
import { logger } from '../utils/Logger'

class NotesService {
  async getNotesByBugId(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.activeNote = res.data
    logger.log(AppState.notes)
  }

  async getNoteById(id) {
    const res = await api.get('api/notes/' + id)
    AppState.activeNote = res.data
  }

  async createNote(newNote) {
    await api.post('api/notes/', newNote)
    this.getAllNotesByBugId(newNote.bug)
  }

  async addNote(newNote) {
    await api.post(`api/notes/${newNote.NoteId}/notes`, newNote)
    this.getNoteById(newNote.NoteId)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
    AppState.Notes = AppState.Notes.filter(Note => Note.id !== id)
  }
}

export const notesService = new NotesService()

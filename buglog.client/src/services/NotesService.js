
import { AppState } from '../AppState.js'
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
    const res = await api.post('api/notes/', newNote)
    AppState.notes.push(res.data)
    this.getNotesByBugId(newNote.bug)
  }

  async deleteNote(id) {
    try {
      await api.delete('api/notes/' + id)
      AppState.notes.filter(note => note.id !== id)
    } catch (error) {
      Notification.toast('Error:' + error, 'error')
    }
  }
}

export const notesService = new NotesService()

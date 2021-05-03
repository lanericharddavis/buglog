
import { AppState } from '../AppState.js'
// import router from '../router.js'
import { api } from './AxiosService.js'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs/', newBug)
    AppState.bugs.push(res.data)
    // router.push({ name: 'BugDetails', params: { id: res.data.id } })
  }

  async addNote(newNote) {
    await api.post(`api/bugs/${newNote.BugId}/notes`, newNote)
    this.getBugById(newNote.bugId)
  }

  async deleteNote(bugId, noteId) {
    await api.delete(`api/Bugs/${bugId}/notes/${noteId}`)
    this.getBugById(bugId)
  }

  async bid(bug) {
    await api.put('api/bugs/' + bug.id + '/bid', bug)
  }

  async deleteBug(id) {
    await api.delete('api/bugs/' + id)
    AppState.bugs = AppState.bugs.filter(bug => bug.id !== id)
  }
}

export const bugsService = new BugsService()

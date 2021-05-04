
import { AppState } from '../AppState.js'
import router from '../router.js'
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

  async editBug(newBug, id) {
    const res = await api.put(`api/bugs/${id}`, newBug)
    // NOTE the put request goes through but it is not being assigned to the const 'res' and not being pushed to AppState.activeBug.  ???
    AppState.activeBug.push(res.data)
    this.getBugById(id)
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs/', newBug)
    AppState.bugs.push(res.data)
    router.push({ name: 'BugReportPage', params: { id: res.data.id } })
  }

  async addNote(newNote) {
    await api.post(`api/bugs/${newNote.BugId}/notes`, newNote)
    this.getBugById(newNote.bugId)
  }

  async deleteNote(bugId, noteId) {
    await api.delete(`api/Bugs/${bugId}/notes/${noteId}`)
    this.getBugById(bugId)
  }

  async filterClosedBugs(toggleState) {
    const res = await api.get('api/bugs')
    if (toggleState === true) {
      res.filter(bug => bug.closed === true)
    } else {
      this.getBugs()
    }
  }

  async closeOutBug(bug) {
    if (bug.closed === false) {
      bug.closed = true
    } else {
      bug.closed = false
    }
    const bugWithNewBugState = await api.put('api/bugs/' + bug.id, bug)
    AppState.activeBug = bugWithNewBugState.data
  }

  // async filterClosedBugs(checkedBox) {
  //   if (checkedBox.closed === true)
  // }
}

export const bugsService = new BugsService()

import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return notes
  }

  async getAllNotesByBugId(id) {
    const data = await dbContext.Notes.find({ bug: id }).populate('Bug')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async editNote(body) {
    const found = await this.findById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new Forbidden('You Cannot modify another users Note')
    }
    const data = await dbContext.Notes.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return data
  }

  async deleteNote(id) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted Note'
  }
}

export const notesService = new NotesService()

import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const bugs = await dbContext.Notes.find(query)
    return bugs
  }

  async getAllNotesByBugId(id) {
    const data = await dbContext.Notes.find({ bugId: id }).populate('Bug')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findById(id) {
    const data = await dbContext.Notes.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async deleteNote(id) {
    const data = await dbContext.Notes.findOneAndUpdate({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted Note'
  }
}

export const notesService = new NotesService()

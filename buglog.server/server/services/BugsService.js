import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator', 'name picture')
    return bugs
  }

  async findById(id) {
    const data = await dbContext.Bugs.findOne({ _id: id }).populate('creator', 'name picture')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async editBug(body) {
    const found = await this.findById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new Forbidden('You Cannot modify another users Bug')
    }
    const { closed, ...bodyExceptClosed } = body
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, bodyExceptClosed, { new: true })
    return data
  }

  async closeBug(body) {
    const found = await this.findById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new Forbidden('You Cannot close another users Bug')
    }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body.closed, { new: true }).populate('Bug')
    return data
  }
}

export const bugsService = new BugsService()

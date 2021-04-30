import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bug.find(query)
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async createBug(body) {
    return await dbContext.Bug.create(body)
  }
}

export const bugsService = new BugsService()

import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.findById)
      .get('/:id/notes', this.getAllNotesByBugId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.closeBug)
  }

  async getAll(req, res, next) {
    try {
      const data = await bugsService.getAll(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      const data = await notesService.getAllNotesByBugId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findById(req, res, next) {
    try {
      const data = await bugsService.findById({ _id: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.createBug(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await bugsService.editBug(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.closeBug(req.body, req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

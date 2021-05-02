<template>
  <div class="modal fade"
       id="new-bug-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Bug Report
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createBug">
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="Title..."
                     v-model="state.newBug.title"
                     required
              >
            </div>
            <div class="form-group">
              <label for="reportedBy">Reported By</label>
              <input type="text"
                     class="form-control"
                     id="reportedBy"
                     placeholder="Person Reporting Bug..."
                     v-model="state.newBug.creator"
                     required
              >
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea type="text"
                        class="form-control"
                        id="description"
                        placeholder="Bug Description..."
                        rows="3"
                        v-model="state.newBug.description"
                        required
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import $ from 'jquery'
import Notification from '../utils/Notification'

export default {
  name: 'BugModal',
  setup() {
    const state = reactive({
      newBug: {
      }
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          // NOTE reseting to the empty object resets the input fields
          state.newBug = {}
          Notification.toast('Bug Report Created!', 'success')
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
          $('#new-bug-form').modal('hide')
        } catch (error) {
          Notification.toast('Cannot Create Bug Report', 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

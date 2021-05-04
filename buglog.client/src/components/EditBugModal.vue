<template>
  <div class="modal fade"
       id="edit-bug-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit Bug Report
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="editBug">
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="bugTitle"
                     placeholder="Title..."
                     v-model="state.editedBug.title"
                     required
              >
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea type="text"
                        class="form-control"
                        id="bugDescription"
                        placeholder="Bug Description..."
                        rows="3"
                        v-model="state.editedBug.description"
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
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { bugsService } from '../services/BugsService'
import $ from 'jquery'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'

export default {
  name: 'BugModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      editedBug: {
      },
      bug: computed(() => AppState.activeBug)
    })
    return {
      state,
      route,
      async editBug() {
        try {
          await bugsService.editBug(state.editedBug, route.params.id)
          // NOTE reseting to the empty object resets the input fields
          state.editedBug = {}
          Notification.toast('Bug Report Edited!', 'success')
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
          $('#edit-bug-form').modal('hide')
        } catch (error) {
          Notification.toast('Cannot Edited Report', 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

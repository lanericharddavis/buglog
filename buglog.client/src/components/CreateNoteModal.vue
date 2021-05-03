<template>
  <div class="modal fade"
       id="new-note-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createNote">
          <div class="modal-body">
            <div class="form-group">
              <label for="note">Note</label>
              <input type="text"
                     class="form-control"
                     id="note"
                     placeholder="Note..."
                     rows="3"
                     v-model="state.newNote.description"
                     required
              >
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
import { notesService } from '../services/NotesService'
import $ from 'jquery'
import Notification from '../utils/Notification'

export default {
  name: 'NoteModal',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    // NOTE why can't I pass props through setup here to attach the bug ID to the new Note without the console giving me "cannot read property 'id' of undefined"
    const state = reactive({
      newNote: {
        // bug: props.bugProp.id
      }
    })
    return {
      state,
      async createNote() {
        try {
          await notesService.createNote(state.newNote)
          // NOTE reseting to the empty object resets the input fields
          state.newNote = {}
          Notification.toast('Note Report Created!', 'success')
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
          $('#new-note-form').modal('hide')
        } catch (error) {
          Notification.toast('Cannot Create Note Note', 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

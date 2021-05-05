<template>
  <div class="bug-report-page container-fluid">
    <div class="row">
      <div class="col ml-3 mt-3">
        <p>
          Report Title:
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-12">
        <h1 class="font-bold" v-if="state.bug">
          {{ state.bug.title }}
        </h1>
      </div>
      <div class="col-md-4 col-6" v-if="state.bug">
        <button :disabled="state.bug.closed == true" v-if="state.account.id === state.bug.creatorId" class="btn btn-outline-danger" title="close this bug" @click="closeOutBug">
          Close Out Report
        </button>
      </div>
      <div class="col-md-4 col-6" v-if="state.bug">
        <button :disabled="state.bug.closed == true"
                v-if="state.account.id === state.bug.creatorId"
                class="btn btn-outline-info"
                title="close this bug"
                data-toggle="modal"
                data-target="#edit-bug-form"
        >
          Edit Report
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="row ml-3">
          <p>Reported by: </p>
          <h5 v-if="state.bug">
            {{ state.bug.creator.name }}
          </h5>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <p>Status: </p>
          <h5 v-if="state.bug" class="mb-3">
            {{ state.bug.closed }}
          </h5>
          <!-- NOTE why does this not work? -->
          <!-- <h5 v-if="state.bug.closed == false">
            Open
          </h5>
          <h5 v-else>
            Closed
          </h5> -->
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <img v-if="state.bug" class="creator-img ml-3 mb-3" :src="state.bug.creator.picture" alt="">
      </div>
      <div class="col-md-10">
        <p v-if="state.bug" class="outline p-2">
          {{ state.bug.description }}
        </p>
      </div>
    </div>
    <div class="row pt-5 pb-2 justify-content-around">
      <div class="col-md-2">
        <h5>Notes</h5>
      </div>
      <div class="col-md-10 d-flex justify-content-center">
        <form class="form col-md-10" @submit.prevent="createNote">
          <div class="form-group m-2">
            <label for="noteInput" class="m-2"><strong>Create New Note</strong></label>
            <button type="submit" class="btn btn-primary pb-1 mr-2 mb-2" title="submit note">
              <strong>Submit</strong>
            </button>
            <textarea type="text"
                      class="form-control pt-1 w-100"
                      id="noteInput"
                      aria-describedby="noteInput"
                      placeholder="Your Note..."
                      rows="2"
                      v-model="state.newNote.body"
                      required
            ></textarea>
          </div>
        </form>
      </div>
      <!-- <div class="col">
        <button class="btn btn-outline-success"
                title="create new note"
                data-toggle="modal"
                data-target="#new-note-form"
        >
          New Note
        </button>
      </div> -->
    </div>
    <div class="row">
      <div class="col-md-12 col-11 p-3 table-wrapper-scroll-y my-custom-scrollbar ">
        <table class="outline">
          <tr>
            <th class="notes-image-width">
              Image
            </th>
            <th class="notes-name-width">
              Name
            </th>
            <th class="notes-message-width">
              Message
            </th>
            <th class="notes-delete-width">
              Delete
            </th>
          </tr>
          <NoteComponent v-for="note in state.note" :key="note.id" :note-prop="note" />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'

export default {
  name: 'BugReportPage',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newNote: {
        bug: route.params.id
      },
      bug: computed(() => AppState.activeBug),
      note: computed(() => AppState.activeNote),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
      try {
        await notesService.getNotesByBugId(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createNote() {
        try {
          await notesService.createNote(state.newNote)
          // NOTE reseting to the empty object resets the input fields
          state.newNote = { bug: route.params.id }
          Notification.toast('Note Created!', 'success')
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
        } catch (error) {
          Notification.toast('Cannot Create Note', 'error')
        }
      },
      async editBug() {
        try {
          await bugsService.editBug(state.bug)
          Notification.toast('Note Edited')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async closeOutBug() {
        try {
          const confirmation = window.confirm('Are You Sure? Confirm to Close Out This Bug Report.')
          if (confirmation === true) {
            await bugsService.closeOutBug(state.bug)
            Notification.toast('Bug Report Closed', 'success')
          } else {
            Notification.toast('cancel')
          }
        } catch (error) {
          Notification.toast('Cannot Close Out Bug Report', 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
textarea{
  width: 100%;
}
.trash-cursor{
  cursor: pointer;
}

.outline{
  outline: 1px solid black;
}

.notes-image-width{
  width: 10%;
}

.notes-name-width{
  width:20%;
}

.notes-message-width{
  width:75%;
}

.notes-delete-width{
  width:10%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  font-size: 1.5rem;
  padding: 15px;
}

td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.font-bold{
  font-weight: 800;
}

.my-custom-scrollbar {
position: relative;
height: 450px;
overflow: auto;
}
.table-wrapper-scroll-y {
display: block;
}
</style>

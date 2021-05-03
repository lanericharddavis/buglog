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
      <div class="col">
        <h1 class="font-bold" v-if="state.bug">
          {{ state.bug.title }}
        </h1>
      </div>
      <div class="col" v-if="state.bug">
        <button :disabled="state.bug.closed == true" class="btn btn-outline-danger" title="close this bug" @click="closeOutBug">
          Close
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
          <h5 v-if="state.bug">
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
        <img v-if="state.bug" class="creator-img ml-3" :src="state.bug.creator.picture" alt="">
      </div>
      <div class="col-md-10">
        <p v-if="state.bug" class="outline p-2">
          {{ state.bug.description }}
        </p>
      </div>
    </div>
    <div class="row pt-5 pb-2">
      <div class="col">
        <h5>Notes</h5>
      </div>
      <div class="col">
        <button class="btn btn-outline-success"
                title="create new note"
                data-toggle="modal"
                data-target="#new-note-form"
        >
          New Note
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col p-3">
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
          <tr>
            <td>
              <img v-if="state.bug" class="creator-img ml-3" :src="state.bug.creator.picture" alt="">
            </td>
            <td>
              SAMPLE Authors Name
            </td>
            <td>
              SAMPLE MESSAGE HERE Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos repellat recusandae laborum repellendus totam explicabo!
            </td>
            <td class="text-center">
              <i class="fas fa-trash trash-cursor" title="delete note" @click="deleteNote"></i>
            </td>
          </tr>
          <!-- NOTE to confirm I'm getting data from server -->
          <!-- {{ state.note }} -->
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
      bug: computed(() => AppState.activeBug),
      note: computed(() => AppState.activeNote)
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
      async deleteNote() {
        try {
          window.confirm('Are You Sure? Confirm to Delete Note.')
          await notesService.deleteNote(props.noteProp.id)
          Notification.toast('Note Deleted')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async closeOutBug() {
        try {
          window.confirm('Are You Sure? Confirm to Close Out This Bug Report.')
          await bugsService.closeOutBug(state.bug)
          Notification.toast('Bug Report Closed')
        } catch (error) {
          Notification.toast('Cannot Close Out Bug Report')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
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
</style>

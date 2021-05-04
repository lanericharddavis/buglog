<template>
  <div class="bug-log-page container-fluid">
    <div class="row d-flex justify-content-around align-items-center p-2">
      <div class="col-md-4">
        <h1 class="font-bold">
          Current Bug Reports
        </h1>
        <!-- NOTE Not sure how to go about passing the state of the checkbox through for toggling my filter -->
        <!-- v-model="state.toggle.toggleState" -->
        <div class="btn-group d-flex align-items-center" data-toggle="buttons">
          <input class="btn btn-primary m-2 mb-3"
                 type="checkbox"
                 name="hideClosedBugs"
                 id="hideClosedBugsToggle"
                 autocomplete="off"
                 title="hide closed reports"
                 @click="filterClosedBugs"
          >
          <p>Filter Closed Reports</p>
        </div>
      </div>
      <!-- NOTE Review how to only allow authenticated user see features (buttons)  I had the following line in the div below and it wasn't working  -->
      <!-- v-if="state.user.isAuthenticated && state.account.id === state.bugs.creatorId" -->
      <div class="col-md-5 justify-content-center">
        <form class="form" @submit.prevent="createBug">
          <div class="form-group m-2">
            <label for="bugInput" class="m-2"><strong>Create New Bug Report</strong></label>
            <button type="submit" class="btn btn-primary pb-1" title="submit bug report">
              <strong>Submit</strong>
            </button>
            <input type="text"
                   class="form-control pt-1"
                   id="bugInput"
                   aria-describedby="bugInput"
                   placeholder="Bug Report Title..."
                   v-model="state.newBug.title"
                   required
            >
          </div>
          <div class="form-group m-2">
            <textarea type="text"
                      class="form-control"
                      id="bugDescriptionInput"
                      aria-describedby="bugDescriptionInput"
                      placeholder="Description..."
                      rows="3"
                      v-model="state.newBug.description"
                      required
            ></textarea>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 table-wrapper-scroll-y my-custom-scrollbar">
        <table>
          <tr>
            <th>Title</th>
            <th>Reported By</th>
            <th>Status</th>
            <th>Last Modified</th>
          </tr>
          <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'

export default {
  name: 'BugLogPage',
  setup() {
    const state = reactive({
      // NOTE Can I pass the state of a checkbox through a v-model?
      // toggle: boolean?,
      newBug: {},
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })

    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Notification.toast(error, 'Cannot getAllBugs')
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
        } catch (error) {
          Notification.toast('Cannot Create Bug Report', 'error')
        }
      },
      async filterClosedBugs() {
        try {
          await bugsService.filterClosedBugs(state.toggle)
        } catch (error) {
          Notification.toast('Cannot Filter Closed Reports', 'error')
        }
      }
    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>
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

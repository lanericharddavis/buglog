<template>
  <div class="bug-log-page container-fluid">
    <div class="row d-flex justify-content-around align-items-center p-2">
      <div class="col-md-4">
        <h1 class="font-bold">
          Current Bug Reports
        </h1>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-primary"
                title="create new bug report"
                data-toggle="modal"
                data-target="#new-bug-form"
        >
          New Report
        </button>
      </div>
      <div class="btn-group d-flex align-items-center" data-toggle="buttons">
        <input class="btn btn-primary m-2 mb-3"
               type="checkbox"
               name="hideClosedBugs"
               id="hideClosedBugsToggle"
               autocomplete="off"
               title="hide closed reports"
               @click="filterClosedBugs"
        >
        <p>Hide Closed</p>
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
      newBug: {},
      bugs: computed(() => AppState.bugs)
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
          state.newBug = {}
        } catch (error) {
          Notification.toast(error, 'Cannot Create New Report')
        }
      },
      async filterClosedBugs() {
        try {
          await bugsService.filterClosedBugs()
        } catch (error) {
          Notification.toast(error, 'Cannot Filter Closed Reports')
        }
      }
    }
  },
  components: {}
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

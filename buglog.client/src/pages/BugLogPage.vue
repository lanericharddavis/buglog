<template>
  <div class="bug-log-page container-fluid">
    <div class="row d-flex justify-content-around align-items-center p-2">
      <div class="col-md-4">
        <h1 class="font-bold">
          Current Bugs
        </h1>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-primary" title="create new bug report">
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
        >
        <p>Hide Closed</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table>
          <tr>
            <th>Title</th>
            <th>Reported By</th>
            <th>Status</th>
            <th>Last Modified</th>
          </tr>
          <tr>
            <router-link :to="{ name: 'BugReportPage' }">
              <td>Alfreds Futterkiste</td>
            </router-link>
            <td>Maria Anders</td>
            <td>Open</td>
            <td>12/12/12</td>
          </tr>
          <tr>
            <router-link :to="{ name: 'BugReportPage' }">
              <td>Centro comercial Moctezuma</td>
            </router-link>
            <td>Francisco Chang</td>
            <td>Open</td>
            <td>12/12/12</td>
          </tr>
          <tr>
            <router-link :to="{ name: 'BugReportPage' }">
              <td>Ernst Handel</td>
            </router-link>
            <td>Roland Mendel</td>
            <td>Closed</td>
            <td>12/12/12</td>
          </tr>
          <tr>
            <router-link :to="{ name: 'BugReportPage' }">
              <td>Island Trading</td>
            </router-link>
            <td>Helen Bennett</td>
            <td>Open</td>
            <td>12/12/12</td>
          </tr>
          <tr>
            <router-link :to="{ name: 'BugReportPage' }">
              <td>Laughing Bacchus Winecellars</td>
            </router-link>
            <td>Yoshi Tannamuri</td>
            <td>Closed</td>
            <td>12/12/12</td>
          </tr>
          <tr>
            <router-link :to="{ name: 'BugReportPage' }">
              <td>Magazzini Alimentari Riuniti</td>
            </router-link>
            <td>Giovanni Rovelli</td>
            <td>Closed</td>
            <td>12/12/12</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BugLogPage',
  setup() {
    return {}
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
</style>

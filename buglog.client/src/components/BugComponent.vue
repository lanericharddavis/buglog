<template>
  <tr :class="{'text-danger' : bugProp.closed == true}" class="bug-component">
    <router-link :to="{ name: 'BugReportPage', params: {id: bugProp.id} }">
      <td>{{ bugProp.title }}</td>
    </router-link>
    <td>{{ bugProp.creator.name }}</td>
    <td v-if="bugProp.closed == false">
      Open
    </td>
    <td v-else>
      Closed
    </td>
    <td>{{ bugProp.updatedAt }}</td>
  </tr>
</template>

<script>
// import { reactive, computed, onMounted } from 'vue'
// import { AppState } from '../AppState'

export default {
  name: 'BugComponent',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    // const state = reactive({
    //   bug: computed(() => AppState.bugs)
    // })
    // onMounted(async() => {

    // })

    return {
      // state
      // timeDateStamp() {
      //   const newtimeDate = newtimeDate.toDateString(bugProp.createdAt)
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
td {
  text-align: left;
  padding: 8px;
}
</style>

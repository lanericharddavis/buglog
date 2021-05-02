<template>
  <tr class="note-component">
    <td><img src="//placehold.it/100x100" alt=""></td>
    <td>{{ noteProp.creator.name }}</td>
    <td>{{ noteProp.body }}</td>
    <td class="text-center">
      <i class="fas fa-trash" title="delete note"></i>
    </td>
  </tr>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'NoteComponent',
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      note: computed(() => AppState.activeNote)
    })
    onMounted(async() => {

    })

    return {
      state
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

<template>
  <tr class="note-component">
    <td><img v-if="state.note" src="//placehold.it/100x100" alt=""></td>
    <td v-if="state.note">
      {{ state.note.creator.name }}
    </td>
    <td v-if="state.note">
      {{ state.note.body }}
    </td>
    <td class="text-center">
      <i class="fas fa-trash" title="delete note"></i>
    </td>
  </tr>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'

export default {
  name: 'NoteComponent',
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      note: computed(() => AppState.activeNote)
    })
    onMounted(async() => {
      try {
        await bugsService.getNotesByBug(route.params.id)
      } catch (error) {
        Notification.toast('Cannot getBug by url')
      }
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

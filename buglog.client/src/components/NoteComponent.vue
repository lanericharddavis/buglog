<template>
  <tr class="note-component">
    <td> <img class="creator-img ml-3" :src="noteProp.creator.picture" alt=""></td>
    <td>
      {{ noteProp.creator.name }}
    </td>
    <td>
      {{ noteProp.body }}
    </td>
    <td class="text-center">
      <i class="fas fa-trash trash-cursor" title="delete note" @click="deleteNote"></i>
    </td>
  </tr>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
// import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
// import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export default {
  name: 'NoteComponent',
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      note: computed(() => AppState.activeNote)
    })
    onMounted(async() => {
      // try {
      //   await bugsService.getNotesByBug(route.params.id)
      // } catch (error) {
      //   Notification.toast('Cannot getBug by url')
      // }
    })

    return {
      state,
      async deleteNote() {
        try {
          window.confirm('Are You Sure? Confirm to Delete')
          await notesService.deleteNote(props.noteProp.id)
          Notification.toast('Note Deleted')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
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

td {
  text-align: left;
  padding: 8px;
}
</style>

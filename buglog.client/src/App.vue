<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <!-- <CreateBugModal /> -->
    <CreateNoteModal />
    <EditBugModal />
    <!-- <moment /> -->
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      <img class="my-mug-img mr-3" src="../src/assets/img/myMug.jpg" alt="">  Created By Lane Davis
    </div>
  </footer>
</template>

<script>
// import CreateBugModal from './components/CreateBugModal'
import CreateNoteModal from './components/CreateNoteModal'
import EditBugModal from './components/EditBugModal'
import { computed } from 'vue'
import { AppState } from './AppState'
// import moment from 'vue-moment'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: {
    // CreateBugModal,
    CreateNoteModal,
    EditBugModal
    // moment
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.my-mug-img{
  border-radius: 50%;
  width: 45px;
}
</style>

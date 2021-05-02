<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <CreateBugModal />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      <img class="my-mug-img mr-3" src="../src/assets/img/myMug.jpg" alt="">  Created By Lane Davis
    </div>
  </footer>
</template>

<script>
import CreateBugModal from './components/CreateBugModal'
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: {
    CreateBugModal
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

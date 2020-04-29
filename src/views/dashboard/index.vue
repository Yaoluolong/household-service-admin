<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import guestDashboard from './guest'

export default {
  name: 'Dashboard',
  components: { adminDashboard, guestDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('guest')) {
      this.currentRole = 'guestDashboard'
    }
  }
}
</script>

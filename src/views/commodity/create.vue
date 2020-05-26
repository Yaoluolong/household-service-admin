<template>
  <div class="app-container">
    <h2>产品新增</h2>
    <el-divider />
    <create-or-edit />
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'

export default {

  name: 'Create',
  components: { CreateOrEdit },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>

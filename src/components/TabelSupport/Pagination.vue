<template>
  <div style="text-align:center">
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="15"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    currentChange(page) {
      console.log(this.total)
      this.$emit('current-change', page)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

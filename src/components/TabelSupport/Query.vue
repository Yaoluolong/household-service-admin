<template>
  <div class="queryInput">
    <div class="label">编号</div>
    <div>
      <el-input v-model="input" placeholder="请输入内容" />
    </div>
    <div class="button">
      <el-button type="success" size="small" @click="handleQuery">查询</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Query',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    word: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleQuery() {
      if (this.input !== '' && this.data.length !== 0) {
        const queryData = this.data.filter(obj => {
          return obj[this.word].includes(this.input)
        })
        this.$emit('query', queryData)
      }
    },
    reset() {
      this.input = ''
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.queryInput{
  display: flex;
  margin: 15px 0;
  .label{
    padding:10px ;
  }
  .button{
    padding: 2px;
    margin-left:10px;
  }
}
</style>

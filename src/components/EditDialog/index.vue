<template>
  <el-dialog :visible.sync="visible" width="500px" @close="handleClose()">
    <div slot="title">
      <span class="detail__title">{{ title }}</span>
      <el-divider />
    </div>
    <div style="margin-left:40px">
      <div v-for="(obj,index) in item" :key="index" style="margin:5px 0">
        <div class="detail__name">{{ obj.label }}</div>
        <span v-if="!obj.type" class="detail__value">{{ obj.value }}</span>
        <el-image
          v-if="obj.type==='image'"
          style="width: 100px; height: 150px;vertical-align:top"
          :src="obj.value"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="handleClose()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DetailsDialog',
  props: {
    dialogVisible: Boolean,
    title: { type: String, required: false, default: '详情' },
    item: { type: Array, required: false, default: null }
  },
  data() {
    return {
      visible: this.dialogVisible
    }
  },
  watch: {
    dialogVisible: function(val) {
      this.visible = val
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClose() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal{
  margin:16px 0 0 0;
}

.detail__title{
  font-size:18px;
}

.detail__name{
  margin:auto 0;
  font-size:16px;
  color:#92a89e ;
  display: inline-block;
  margin: 10px 10px;
  width:100px
}

.detail__value{
  font-size:16px;
  color:#444444 ;
}
</style>

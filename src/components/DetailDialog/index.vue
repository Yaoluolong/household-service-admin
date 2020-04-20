<template>
  <el-dialog
    :visible.sync="visible"
    width="500px"
    @close="handleClose()"
    @closed="$emit('closed')"
  >
    <div slot="title">
      <span class="detail__title">{{ title }}</span>
      <el-divider />
    </div>
    <slot>
      <div style="margin-left:40px">
        <div v-for="(obj,index) in item" :key="index" style="margin:5px 0">
          <div class="detail__name">{{ obj.label }}</div>
          <span v-if="!obj.type" class="detail__value">{{ obj.value }}</span>
          <el-image
            v-if="obj.type==='image'"
            style="width: 140px; height: 170px;vertical-align:top"
            :src="obj.value"
            fit="cover"
          />
        </div>
      </div>
    </slot>
    <div v-if="isEdit" slot="footer" class="dialog-footer">
      <el-button type="info" @click="isEdit=false;$emit('cancel')">取 消</el-button>
    </div>
    <div v-else slot="footer" class="dialog-footer">
      <el-button type="danger" @click="handleRemove()">移 除</el-button>
      <el-button type="success" @click="$emit('on-edit');isEdit=true">编 辑</el-button>
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
      isEdit: false,
      visible: this.dialogVisible
    }
  },
  watch: {
    dialogVisible: function(val) {
      this.visible = val
    }
  },
  methods: {
    handleRemove() {
      this.$confirm('确认移除该员工?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('on-remove', this.item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClose() {
      this.$emit('close')
      this.isEdit = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog{
  margin-top:8vh  !important;
}

.el-divider--horizontal{
  margin:16px 0 0 0;
}

.detail__title{
  font-size:18px;
}

.detail__name{
  margin:auto 0;
  font-size:16px;
  font-weight: 700;
  text-align: right;
  color:#92a89e ;
  display: inline-block;
  margin: 10px 10px;
  width:100px
}

.detail__value{
  font-size:16px;
  font-weight: 700;
  color:#444444 ;
}
</style>

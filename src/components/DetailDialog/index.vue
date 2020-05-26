<template>
  <el-dialog
    :visible.sync="visible"
    width="800px"
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
          <div v-if="obj.type==='image'" style="display:inline-block">
            <el-image
              v-for="(item2,index2) in obj.value"
              :key="index2"
              style="width: 140px; height: 170px;vertical-align:top;margin-right:5px"
              :src="item2"
              fit="fit"
            />
          </div>
          <div v-if="obj.type==='tag'" style="display:inline-block;vertical-align: middle">
            <el-tag
              v-for="(item2,index2) in obj.value"
              :key="index2"
              type="info"
              style="margin-right:5px;height:100%"
            >
              <span style="margin-right:5px;float: left;font-weight:600">{{ item2.name }}</span>
              <span style="float:right;color: #8492a6; font-size: 13px">{{ item2.staffID }}</span>
            </el-tag>
          </div>
        </div>
      </div>
    </slot>
    <div v-if="isEdit" slot="footer" class="dialog-footer">
      <el-button type="info" @click="isEdit=false;$emit('cancel')">取 消</el-button>
    </div>
    <div v-else-if="checkPermission(['admin','planner','salesman','hr'])" slot="footer" class="dialog-footer">
      <el-button v-if="showButton" type="danger" @click="handleRemove()">移 除</el-button>
      <el-button v-if="showButton" type="success" @click="$emit('on-edit');isEdit=true">编 辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkPermission from '@/utils/permission'
export default {
  name: 'DetailsDialog',
  props: {
    dialogVisible: Boolean,
    title: { type: String, required: false, default: '详情' },
    item: { type: Array, required: false, default: null },
    edit: { type: Boolean, required: false, default: false },
    showButton: { type: Boolean, required: false, default: true }
  },
  data() {
    return {
      isEdit: this.edit,
      visible: this.dialogVisible
    }
  },
  watch: {
    dialogVisible: function(val) {
      this.visible = val
    }
  },
  methods: {
    checkPermission,
    handleRemove() {
      this.$confirm('确认移除?', '提示', {
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

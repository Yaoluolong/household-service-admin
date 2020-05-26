<template>
  <el-row style="min-width:1425px">
    <el-col v-for="(obj, index) in cardData" :key="index" style="margin:15px 23px" :span="4">
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <el-image
          style="width:235px;height:100px"
          :src="obj.show[0]"
          fit="fill"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
        <div style="padding: 14px;">
          <span style="font-weight: 600;font-size: larger;">{{ obj.name }}</span>
          <div class="bottom clearfix">
            <el-button-group>
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(obj)" />
              <el-button size="mini" type="primary" icon="el-icon-search" @click="handleDetail(obj)" />
              <el-button size="mini" type="primary" icon="el-icon-delete" @click="handleRemove(obj)" />
            </el-button-group>
          </div>
        </div>
      </el-card>
    </el-col>
    <detail-dialog
      :dialog-visible="dialogVisible"
      :item="detailData"
      :title="'商品详情'"
      :edit="isEdit"
      :show-button="false"
      @close="dialogVisible=false;isEdit=false"
    >
      <create-or-edit v-if="isEdit" :ori="oriData" :edit="true" @on-success="onEdit" />
    </detail-dialog>
  </el-row>
</template>

<script>
import DetailDialog from '@/components/DetailDialog'
import CreateOrEdit from './CreateOrEdit'
import { query } from '@/api/staff'
import { queryPromotion } from '@/api/promotion'
import { remove } from '@/api/commodity'

export default {
  name: 'ItemCard',
  components: { DetailDialog, CreateOrEdit },
  props: { cards: { type: Array, required: false, default: () => [] }},
  data() {
    return {
      isEdit: false,
      dialogVisible: false,
      detailData: [],
      oriData: {},
      staffs: []
    }
  },
  computed: {
    cardData() {
      if (this.cards.length === 0) {
        return []
      } else {
        const arr = this.cards
        arr.forEach(obj => {
          obj.show = obj.show.split(',')
          obj.staffID = obj.staffID.split(',')
        })
        return arr
      }
    }
  },
  methods: {
    onEdit() {
      this.$emit('on-edit')
      this.isEdit = false
      this.dialogVisible = false
    },
    handleEdit(obj) {
      this.oriData = obj
      this.isEdit = true
      this.dialogVisible = true
    },
    handleRemove(obj) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        queryPromotion(obj.commodityID).then(result => {
          if (result.data.length !== 0) {
            this.$message({
              type: 'warning',
              message: '存在涉及此产品的活动，无法移除!'
            })
          } else {
            remove(obj.commodityID, obj.show).then(result => {
              this.$message({
                type: 'success',
                message: '移除成功!'
              })
              this.$emit('on-remove')
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleDetail(object) {
      this.staffs = []
      object.staffID.forEach(val => {
        this.handleQuery(val)
      })
      this.detailData = [
        { type: 'image', label: '商品图片', value: object.show },
        { label: '商品编号', value: object.commodityID },
        { label: '商品名称', value: object.name },
        { label: '商品价格', value: object.price },
        { label: '商品类别', value: object.className },
        { type: 'tag', label: '可用员工', value: this.staffs },
        { label: '商品描述', value: object.describe }
      ]
      this.dialogVisible = true
    },
    handleQuery(id) {
      query(id).then(result => {
        this.staffs.push(result.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.el-button-group {
  float: right;
}

.el-button--primary{
  background: #42b983;
}

.el-button--primary:hover,.el-button--primary:focus,.el-button--primary:active{
  background: #4bd396;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>


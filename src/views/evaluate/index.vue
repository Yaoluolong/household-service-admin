<template>
  <div class="app-container">
    <query word="evaluateID" :data="tableData" @query="(data)=>tableData=data" @reset="fetchData" />
    <el-table :data="tableData.slice(begin,end)" style="width: 100%" border>
      <el-table-column label="评价编号" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.evaluateID }}</template>
      </el-table-column>
      <el-table-column label="关联订单" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.orderID }}</template>
      </el-table-column>
      <el-table-column label="关联商品" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.commodityName }}</template>
      </el-table-column>
      <el-table-column label="商品类别" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.className }}</template>
      </el-table-column>
      <el-table-column label="留言客户" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="评分" align="center" width="50">
        <template slot-scope="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="反馈" align="center">
        <template slot-scope="scope">{{ scope.row.feedback }}</template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['admin','salesman'])" label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.feedback===''||scope.row.feedback===null" size="mini" type="success" @click="dialogVisible=true;currentItem=scope.row">回复</el-button>
          <span v-else>已回复</span>
          <el-dialog
            title="评价反馈"
            :visible.sync="dialogVisible"
            width="600px"
          >
            <div>
              <el-input
                v-model="textarea"
                type="textarea"
                placeholder="请输入回复的内容"
                maxlength="100"
                :autosize="{ minRows: 10, maxRows: 10}"
                show-word-limit
              />
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleReply(currentItem)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="tableData.length" @current-change="pageChange" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { list, update } from '@/api/evaluate'
import { check } from '@/utils/check-data'
import Query from '@/components/TabelSupport/Query'
import Pagination from '@/components/TabelSupport/Pagination'
import table from '@/mixins/table'

export default {
  components: {
    Query,
    Pagination
  },
  mixins: [table],
  data() {
    return {
      dialogVisible: false,
      textarea: '',
      tableData: [],
      currentItem: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    checkPermission,
    fetchData() {
      list().then(res => {
        this.tableData = check(res.data)
        this.textarea = ''
      }).catch(err => {
        console.log(err)
      })
    },
    handleReply(row) {
      console.log(row.evaluateID)
      if (this.textarea.trim() === '') {
        this.$message({
          message: '输入不能为空',
          type: 'warning'
        })
      } else {
        this.$confirm(`确定将此内容回复给订单编号 ${row.evaluateID} 的客户 ${row.customerName} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          update(row.evaluateID, this.textarea).then(res => {
            this.$message({
              type: 'success',
              message: '回复成功!'
            })
            this.fetchData()
            this.dialogVisible = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

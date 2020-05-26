<template>
  <div class="app-container">
    <query word="promotionID" :data="tableData" @query="(data)=>tableData=data" @reset="fetchData" />
    <el-table :data="tableData.slice(begin,end)" style="width: 100%" border>
      <el-table-column label="活动编号" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.promotionID }}</template>
      </el-table-column>
      <el-table-column label="活动海报" align="center" width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.poster"
            fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.promotionName }}</template>
      </el-table-column>
      <el-table-column label="产品编号" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.commodityID }}</template>
      </el-table-column>
      <el-table-column label="产品名称" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="活动价格" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.promotionPrice }}</template>
      </el-table-column>
      <el-table-column label="活动描述" align="center">
        <template slot-scope="scope">{{ scope.row.describe }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='待审核'&&checkPermission(['admin','manager'])">
            <el-button size="mini" type="success" @click="handleOperation(scope.row,'resolve')">通过</el-button>
            <el-button size="mini" type="danger" @click="handleOperation(scope.row,'reject')">驳回</el-button>
          </span>
          <span v-else-if="scope.row.status==='待激活'&&checkPermission(['admin','planner'])">
            <el-button size="mini" type="success" @click="handleOperation(scope.row,'activate')">激活</el-button>
            <el-button size="mini" type="danger" @click="handleOperation(scope.row,'reject')">移除</el-button>
          </span>
          <span v-else-if="checkPermission(['admin','planner'])">
            <el-button size="mini" type="warning" @click="handleOperation(scope.row,'inactivate')">失活</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="tableData.length" @current-change="pageChange" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { list, update, remove } from '@/api/promotion'
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
      item: [],
      dialogVisible: false,
      tableData: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    checkPermission,
    fetchData() {
      list()
        .then(result => {
          this.tableData = check(result.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleOperation(row, operation) {
      let status = ''
      const count = this.tableData.filter(obj => {
        return obj.status === '已激活'
      })
      switch (operation) {
        case 'resolve' :
          status = '待激活'
          break
        case 'inactivate':
          status = '待激活'
          break
        case 'reject':
          status = '移除'
          break
        case 'activate':
          if (count.length >= 4) {
            this.$message({
              message: '激活的活动不能超过4个！',
              type: 'warning'
            })
          } else if (count.some(obj => {
            return obj.commodityID === row.commodityID
          })) {
            this.$message({
              message: '此产品已存在上线活动！',
              type: 'warning'
            })
          } else { status = '已激活' }
          break
        default:
          break
      }
      if (status !== '') {
        this.$confirm('确定进行 ' + operation + ' 操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (status !== '移除') {
            update(row.promotionID, status, row.promotionPrice, row.commodityID).then(res => {
              this.fetchData()
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }).catch(err => {
              console.log(err)
            })
          } else {
            remove(row.promotionID).then(res => {
              this.fetchData()
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }).catch(err => {
              console.log(err)
            })
          }
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

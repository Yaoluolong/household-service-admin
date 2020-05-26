<template>
  <div class="app-container">
    <query word="orderID" :data="tableData" @query="(data)=>tableData=data" @reset="fetchData" />
    <el-table :data="tableData.slice(begin,end)" style="width: 100%" border>
      <el-table-column label="订单编号" align="center" width="130">
        <template slot-scope="scope">{{ scope.row.orderID }}</template>
      </el-table-column>
      <el-table-column label="下单时间" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.orderDate }}</template>
      </el-table-column>
      <el-table-column label="服务时间" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.serviceDate }}</template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" width="160">
        <template slot-scope="scope">{{ scope.row.commodityName }}</template>
      </el-table-column>
      <el-table-column label="服务地址" align="center">
        <template slot-scope="scope">{{ scope.row.serviceAddress }}</template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="联系方式" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.contact }}</template>
      </el-table-column>
      <el-table-column label="金额" align="center" width="80">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['admin','salesman'])" label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <span v-show="switchBtn(scope.row.status).visible">
            <el-button size="mini" :type="switchBtn(scope.row.status).type" @click="handleStatus(scope.$index, scope.row)">{{ switchBtn(scope.row.status).label }}</el-button>
            <el-button v-if="switchBtn(scope.row.status).type2" size="mini" :type="switchBtn(scope.row.status).type2" @click="handleStatus2(scope.$index, scope.row)">{{ switchBtn(scope.row.status).label2 }}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="tableData.length" @current-change="pageChange" />
    <detail-dialog
      :dialog-visible="dialogVisible"
      :title="'订单信息详情'"
      :item="item"
      :show-button="false"
      @close="_=>dialogVisible=false"
    />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { list, update } from '@/api/order'
import { query } from '@/api/staff'
import { check } from '@/utils/check-data'
import { judge } from '@/utils/judge-status'
import DetailDialog from '@/components/DetailDialog'
import Query from '@/components/TabelSupport/Query'
import Pagination from '@/components/TabelSupport/Pagination'
import table from '@/mixins/table'

export default {
  components: {
    DetailDialog,
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
    switchBtn(status) {
      return judge(status)
    },
    fetchData() {
      list()
        .then(result => {
          this.tableData = check(result.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDetail(index, row) {
      const staffs = []
      row.staffID.split(',').forEach(val => {
        query(val).then(res => {
          staffs.push(res.data)
        }).catch(err => {
          console.log(err)
        })
      })
      this.item = [
        { label: '订单编号', value: row.orderID },
        { label: '下单时间', value: row.orderDate },
        { label: '订单状态', value: row.status },
        { label: '商品名称', value: row.commodityName },
        { label: '商品编号', value: row.commodityID },
        { label: '商品类别', value: row.className },
        { label: '服务员工', value: staffs, type: 'tag' },
        { label: '价格', value: row.amount },
        { label: '客户姓名', value: row.customerName },
        { label: '客户编号', value: row.customerID },
        { label: '联系方式', value: row.contact },
        { label: '服务地址', value: row.serviceAddress },
        { label: '服务时间', value: row.serviceDate }
      ]
      this.dialogVisible = true
    },
    handleStatus(index, row) {
      const order = judge(row.status).label
      let newStatus = ''
      this.$confirm('确定进行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (order === '取消' && row.status === '待支付') {
          newStatus = '已取消'
        } else if (order === '取消' && row.status === '待服务') {
          newStatus = '已退款'
        } else if (order === '退款') {
          newStatus = '已退款'
        } else if (order === '驳回') {
          newStatus = '待服务'
        }
        update(row.orderID, newStatus).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: newStatus + '成功!'
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + newStatus
        })
      })
    },
    handleStatus2(index, row) {
      const order = judge(row.status).label2
      let newStatus = ''
      this.$confirm('确定进行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (order === '服务') {
          newStatus = '服务中'
        } else {
          newStatus = '待服务'
        }
        update(row.orderID, newStatus).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: newStatus + '成功!'
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + newStatus
        })
      })
    }
  }
}
</script>

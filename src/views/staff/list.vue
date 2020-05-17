<template>
  <div class="app-container">
    <query word="staffID" :data="tableData" @query="(data)=>tableData=data" @reset="fetchData" />
    <el-table :data="tableData.slice(begin,end)" style="width: 100%" border>
      <el-table-column label="员工编号" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.staffID }}</template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="性别" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.sex }}</template>
      </el-table-column>
      <el-table-column label="年龄" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.age }}</template>
      </el-table-column>
      <el-table-column label="职业" align="center" width="180">
        <template slot-scope="scope">{{ scope.row.vocation }}</template>
      </el-table-column>
      <el-table-column label="入职日期" align="center" width="180">
        <template slot-scope="scope">{{ scope.row.entryDate }}</template>
      </el-table-column>
      <el-table-column label="简介" align="center" width="400">
        <template slot-scope="scope">{{ scope.row.profile }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="tableData.length" @current-change="pageChange" />
    <detail-dialog
      :dialog-visible="dialogVisible"
      :item="item"
      :title="'员工信息详情'"
      @close="_=>dialogVisible=false"
      @closed="_=>isEdit=false"
      @on-edit="_=>isEdit=true"
      @on-remove="handleRemove()"
      @cancel="_=>isEdit=false"
    >
      <edit-staff v-if="isEdit" :item="uneditData" @on-success="fetchData();dialogVisible=false" />
    </detail-dialog>
  </div>
</template>

<script>
import { list, remove } from '@/api/staff'
import { check } from '@/utils/check-data'
import DetailDialog from '@/components/DetailDialog'
import EditStaff from './components/EditStaff'
import Query from '@/components/TabelSupport/Query'
import Pagination from '@/components/TabelSupport/Pagination'
import table from '@/mixins/table'

export default {
  components: {
    DetailDialog,
    EditStaff,
    Query,
    Pagination
  },
  mixins: [table],
  data() {
    return {
      currentItem: {},
      isEdit: false,
      item: [],
      uneditData: {},
      dialogVisible: false,
      tableData: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
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
      this.item = [
        { label: '照片', type: 'image', value: [row.picture] },
        { label: '姓名', value: row.name },
        { label: '员工编号', value: row.staffID },
        { label: '性别', value: row.sex },
        { label: '年龄', value: row.age },
        { label: '职业', value: row.vocation },
        { label: '入职日期', value: row.entryDate },
        { label: '简介', value: row.profile }
      ]
      this.dialogVisible = true
      this.uneditData = row
      this.currentItem = row
    },
    handleRemove() {
      const staffID = this.currentItem.staffID
      const picture = this.currentItem.picture
      remove(staffID, picture)
        .then(response => {
          this.$message({
            message: '移除成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.fetchData()
        })
        .catch(err => {
          this.$message({
            message: err || '移除失败',
            type: 'error'
          })
        })
    }
  }
}
</script>

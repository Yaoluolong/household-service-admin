<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%" border>
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
      <el-table-column label="简介" align="center" width="450">
        <template slot-scope="scope">{{ scope.row.profile }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <detail-dialog
      :dialog-visible="dialogVisible"
      :item="item"
      :title="'员工信息详情'"
      @close="_=>dialogVisible=false"
      @closed="_=>isEdit=false"
      @on-edit="_=>isEdit=true"
    >
      <edit-staff v-if="isEdit" :item="uneditData" />
    </detail-dialog>
  </div>
</template>

<script>
import { list } from '@/api/staff'
import { check } from '@/utils/check-data'
import DetailDialog from '@/components/DetailDialog'
import EditStaff from './components/EditStaff'

export default {
  components: {
    DetailDialog,
    EditStaff
  },
  data() {
    return {
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
        { model: 'upload-image', label: '照片', type: 'image', value: row.picture },
        { model: 'input', label: '姓名', value: row.name },
        { label: '员工编号', value: row.staffID },
        { model: 'input', label: '性别', value: row.sex },
        { model: 'input-number', label: '年龄', value: row.age },
        { model: 'input', label: '职业', value: row.vocation },
        { model: 'date-picker', label: '入职日期', value: row.entryDate },
        { model: 'input-textarea', label: '简介', value: row.profile }]
      this.dialogVisible = true
      this.uneditData = row
    }
  }
}
</script>

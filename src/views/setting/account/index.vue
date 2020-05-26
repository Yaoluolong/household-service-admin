<template>
  <div class="app-container">
    <el-button type="success" style="margin-bottom:20px" @click="handleCreate">新增账号</el-button>
    <query word="username" :data="tableData" @query="(data)=>tableData=data" @reset="fetchData" />
    <el-table :data="tableData.slice(begin,end)" style="width: 100%" border>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="权限" align="center">
        <template slot-scope="scope">
          <span v-if="current===scope.row.username">
            <el-select
              :ref="scope.row.username"
              v-model="newRole"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span v-else>
            {{ switchToCN(scope.row.role) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['admin','administrator'])" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <span v-if="current===scope.row.username">
            <el-button size="mini" type="success" @click="submitEdit(scope.row)">确定</el-button>
            <el-button size="mini" type="info" @click="current=''">取消</el-button>
          </span>
          <span v-else>
            <el-button v-if="scope.row.username!=='admin'" size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="warning" @click="handleReset(scope.row)">密码重置</el-button>
            <el-button v-if="scope.row.username!=='admin'" size="mini" type="danger" @click="handleRemove(scope.row)">移除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="tableData.length" @current-change="pageChange" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { check } from '@/utils/check-data'
import { list, remove, create, update } from '@/api/user'
import Query from '@/components/TabelSupport/Query'
import Pagination from '@/components/TabelSupport/Pagination'
import table from '@/mixins/table'

export default {
  name: '',
  components: {
    Query,
    Pagination
  },
  mixins: [table],
  data() {
    return {
      options: [
        {
          label: '总经理',
          value: 'manager'
        },
        {
          label: '策划',
          value: 'planner'
        },
        {
          label: '销售',
          value: 'salesman'
        },
        {
          label: '人事',
          value: 'hr'
        },
        {
          label: '系统管理员',
          value: 'administrator'
        }
      ],
      current: '',
      newRole: '',
      tableData: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    checkPermission,
    switchToCN(value) {
      let label
      switch (value) {
        case 'admin':
          label = '初始账号'
          break
        case 'manager':
          label = '总经理'
          break
        case 'planner':
          label = '策划'
          break
        case 'salesman':
          label = '销售'
          break
        case 'hr':
          label = '人事'
          break
        case 'administrator':
          label = '系统管理员'
          break
        default:
          break
      }
      return label
    },
    fetchData() {
      list().then(res => {
        this.tableData = check(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    submitEdit(row) {
      if (row.username !== 'admin') {
        if (this.newRole !== '') {
          update(row.username, this.newRole).then(res => {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.current = ''
            this.fetchData()
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message({
            message: '设置权限不能为空',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '无法修改初始账号权限',
          type: 'error'
        })
      }
    },
    handleEdit(row) {
      this.current = row.username
    },
    handleCreate() {
      create().then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.fetchData()
      }).catch(err => {
        console.log(err)
      })
    },
    handleReset(row) {
      update(row.username).then(res => {
        this.$message({
          message: '重置成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleRemove(row) {
      if (row.username === 'admin') {
        this.$message({
          message: '不能移除管理员账号',
          type: 'warning'
        })
      } else {
        this.$confirm('确定移除账号 ' + row.username + ' ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(row.username).then(res => {
            this.$message({
              type: 'success',
              message: '移除成功!'
            })
            this.fetchData()
          }).catch(err => {
            console.log(err)
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

<template>
  <div class="app-container">
    <el-button type="success" style="margin-bottom:20px" @click="handleCreate">新增账号</el-button>
    <el-table :data="tableData" style="width: 100%" border>
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
                :label="item"
                :value="item"
              />
            </el-select>
          </span>
          <span v-else>
            {{ scope.row.role }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
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
  </div>
</template>

<script>
import { check } from '@/utils/check-data'
import { list, remove, create, update } from '@/api/user'
export default {
  name: '',
  components: {},
  data() {
    return {
      options: ['admin', 'guest', 'manager', 'editor'],
      current: '',
      newRole: '',
      tableData: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
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
          message: '无法修改管理账号权限',
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

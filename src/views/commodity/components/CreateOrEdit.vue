<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
    <el-form-item label="产品图片" prop="isAdded">
      <upload-picture
        ref="upload"
        :url="'/upload/show'"
        :list="oriShow"
        @add="handleAdd"
        @remove="(fileList,file)=>removeShow(file,fileList)"
        @success="judgeStatus"
      />
    </el-form-item>
    <el-form-item label="产品名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item v-if="ruleForm.commodityID!==''" label="产品编号">
      {{ ruleForm.commodityID }}
    </el-form-item>
    <el-form-item label="产品价格" prop="price" required>
      <el-input-number v-model="ruleForm.price" :min="0" />
    </el-form-item>
    <el-form-item label="所属分类" prop="class">
      <el-select v-model="ruleForm.class" filterable placeholder="请选择">
        <el-option
          v-for="(item,index) in classes"
          :key="index"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="可选员工" prop="staff">
      <el-select
        v-model="ruleForm.staff"
        multiple
        collapse-tags
        filterable
        placeholder="请选择"
      >
        <el-option
          v-for="staff in staffs"
          :key="staff.value"
          :label="staff.label"
          :value="staff.value"
        >
          <span style="float: right; color: #8492a6; font-size: 13px">{{ staff.value }}</span>
          <span style="float: left;font-weight:600">{{ staff.label }}</span>
          <span style="float: right;margin-right:35px">{{ staff.vocation }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产品描述" prop="describe">
      <el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入产品描述" />
    </el-form-item>
    <el-form-item>
      <el-button v-if="isEdit" type="primary" @click="submitEdit('ruleForm')">确认</el-button>
      <el-button v-else type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadPicture from './UploadPicture'
import { queryClass } from '@/api/class'
import { list } from '@/api/staff'
import { create, update } from '@/api/commodity'
import { check } from '@/utils/check-data'

export default {
  name: 'CreateOrEdit',
  components: { UploadPicture },
  props: {
    ori: { type: Object, required: false, default: () => { return { show: [] } } },
    edit: { type: Boolean, required: false, default: () => false }
  },
  data() {
    return {
      isEdit: this.edit,
      oriShow: [],
      classes: [],
      staffs: [],
      ruleForm: {
        commodityID: '',
        show: [],
        isRemoved: [],
        isAdded: [...this.ori.show],
        name: '',
        price: 0,
        class: '',
        staff: [],
        describe: ''
      },
      rules: {
        isAdded: [
          { required: true, message: '请选择产品展示图', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        price: [
          { type: 'number', required: true, message: '请输入产品价格', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请选择产品的分类', trigger: 'blur' }
        ],
        staff: [
          { required: true, message: '请选择产品的可选员工', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请填写产品描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.ori.show.length !== 0) {
      this.ruleForm.name = this.ori.name
      this.ruleForm.commodityID = this.ori.commodityID
      this.ruleForm.describe = this.ori.describe
      this.ruleForm.price = this.ori.price
      this.ruleForm.class = this.ori.className
      this.ruleForm.staff = this.ori.staffID
      this.ruleForm.show = this.ori.show
      this.oriShow = this.ori.show.map(val => { return { url: val, name: val } })
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    judgeStatus(arr) {
      if (this.isEdit) {
        this.handleEdit(arr)
      } else {
        this.handleSubmit(arr)
      }
    },
    handleAdd(obj) {
      this.ruleForm.isAdded.push(obj.name)
    },
    removeShow(file, fileList) {
      this.ruleForm.isAdded = fileList
      if (file.status === 'success') {
        this.ruleForm.isRemoved.push(file.name.split('/').pop())
        if (this.ruleForm.show.indexOf(file.name) !== -1) {
          this.ruleForm.show.splice(this.ruleForm.show.indexOf(file.name), 1)
        }
      }
    },
    handleEdit(files) {
      files.forEach(val => {
        if (val.split(':')[0] !== 'https') {
          this.ruleForm.show.push(process.env.VUE_APP_BASE_SRC + '/show/' + val)
        }
      })
      update(this.ruleForm).then(result => {
        this.$emit('on-success')
      }).catch(err => {
        console.log(err)
      })
    },
    submitEdit(formName) {
      let isNotChange = false
      if (this.ori) {
        if (
          this.ruleForm.name === this.ori.name &&
          this.ruleForm.describe === this.ori.describe &&
          this.ruleForm.price === this.ori.price &&
          this.ruleForm.class === this.ori.className &&
          this.ruleForm.staff === this.ori.staffID &&
          this.ruleForm.isAdded === this.ori.show
        ) {
          isNotChange = true
        }
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (isNotChange) {
            this.$message({
              message: '你没有做出任何改动！',
              type: 'warning'
            })
          } else {
            update(this.ruleForm).then(result => {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.isRemoved = []
            }).catch(err => {
              console.log(err)
            })

            const fileList = this.$refs.upload.$refs.upload.uploadFiles
            if (fileList.every(obj => {
              return obj.status === 'success'
            })) {
              this.$emit('on-success')
            } else {
              this.$refs.upload.$refs.upload.submit()
            }
          }
        } else {
          return false
        }
      })
    },
    handleSubmit(files) {
      this.ruleForm.show = files.map(val => process.env.VUE_APP_BASE_SRC + '/show/' + val)
      create(this.ruleForm).then(response => {
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.$nextTick(() => {
          this.$refs['ruleForm'].resetFields()
        })
      }).catch(err => {
        console.log(err)
      })
    },
    fetchData() {
      queryClass().then(response => {
        this.classes = check(response.data).map(obj => {
          const value = obj.className
          return { value }
        })
      }).catch(err => {
        console.log(err)
      })
      list().then(response => {
        this.staffs = check(response.data).map(obj => {
          const label = obj.name
          const value = obj.staffID
          const vocation = obj.vocation
          return { label, value, vocation }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.$refs.upload.submit()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      if (!this.isEdit) {
        this.$refs.upload.$refs.upload.clearFiles()
        this.$refs.upload.$refs.upload.dialogImageUrl = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  width: 200px;
}
.el-select{
  width: 200px;
}

.el-input-number{
  width:120px;
}

.el-textarea{
  width:70%;
  min-width: 200px;
}

</style>

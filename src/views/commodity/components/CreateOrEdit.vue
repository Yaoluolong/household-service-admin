<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
    <el-form-item label="商品图片" prop="isAdded">
      <upload-picture
        ref="upload"
        :url="'/upload/show'"
        @add="obj=>ruleForm.isAdded.push(obj.name)"
        @remove="arr=>ruleForm.isAdded=arr"
        @success="arr=>handleSubmit(arr)"
      />
    </el-form-item>
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input-number v-model="ruleForm.price" />
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
    <el-form-item label="商品描述" prop="describe">
      <el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入商品描述" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadPicture from './UploadPicture'
import { queryClass } from '@/api/class'
import { list } from '@/api/staff'
import { create } from '@/api/commodity'

export default {
  name: 'CreateOrEdit',
  components: { UploadPicture },
  data() {
    return {
      classes: [],
      staffs: [],
      ruleForm: {
        show: [],
        isAdded: [],
        name: '',
        price: 0,
        class: '',
        staff: [],
        describe: ''
      },
      rules: {
        isAdded: [
          { required: true, message: '请选择商品展示图', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        price: [
          { type: 'number', required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请选择商品的分类', trigger: 'blur' }
        ],
        staff: [
          { required: true, message: '请选择商品的可选员工', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleSubmit(files) {
      this.ruleForm.show = files.map(val => process.env.VUE_APP_BASE_SRC + '/show/' + val)
      console.log(this.ruleForm.show)
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
        this.classes = response.data.map(obj => {
          const value = obj.class
          return { value }
        })
      }).catch(err => {
        console.log(err)
      })
      list().then(response => {
        this.staffs = response.data.map(obj => {
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
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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

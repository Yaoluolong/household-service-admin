<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
    <el-form-item label="商品图片" prop="picture">
      <upload-picture />
    </el-form-item>
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input v-model="ruleForm.price" />
    </el-form-item>
    <el-form-item label="所属分类" prop="class">
      <select-item />
    </el-form-item>
    <el-form-item label="可选员工" prop="staff">
      <select-item />
    </el-form-item>
    <el-form-item label="商品描述" prop="describe">
      <el-input v-model="ruleForm.describe" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadPicture from './UploadPicture'
import SelectItem from './SelectItem'

export default {
  name: 'CreateOrEdit',
  components: { UploadPicture, SelectItem },
  data() {
    return {
      ruleForm: {
        picture: '',
        name: '',
        price: '',
        class: '',
        staff: [],
        describe: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        describe: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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

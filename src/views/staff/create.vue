<template>
  <div class="app-container">
    <h2>员工新增</h2>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="照片" prop="picture">
        <upload-avatar ref="upload" @exist="val=>ruleForm.picture=val" @success="val=>test(val)" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" style="5px">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="ruleForm.age" :min="18" :max="60" label="年龄" />
      </el-form-item>
      <el-form-item label="职业" prop="vocation">
        <el-input v-model="ruleForm.vocation" />
      </el-form-item>
      <el-form-item label="入职日期" required>
        <el-date-picker
          v-model="ruleForm.entryDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="简介" prop="profile">
        <el-input v-model="ruleForm.profile" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">新增</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/staff'
import UploadAvatar from './components/UploadAvatar'

export default {
  name: 'StaffCreate',
  components: { UploadAvatar },
  data() {
    var checkPicture = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传照片'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      filename: '',
      ruleForm: {
        picture: false,
        name: '陈雁鸣',
        sex: '女',
        age: 20,
        vocation: '看护',
        entryDate: '2019-01-01',
        profile: '大美女'
      },
      rules: {
        picture: [{ validator: checkPicture, required: true, trigger: 'change' }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        entryDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        vocation: [
          { required: true, message: '请输入职业', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    test(val) {
      const filename = val
      console.log(filename)
      if (filename !== '') {
        return new Promise((resolve, reject) => {
          create(this.ruleForm, filename).then(response => {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
          }).catch(err => {
            reject(err)
          })
        })
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.$refs.upload.submit()
        } else {
          this.$message({
            message: '请输入正确的信息',
            type: 'error'
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.handleRemove()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  width: 200px;
}
.el-select{
  width: 120px;
}

.el-input-number{
  width:120px;
}

.el-textarea{
  width:70%;
  min-width: 200px;
}

</style>

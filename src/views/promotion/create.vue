<template>
  <div class="app-container">
    <h2>活动申请</h2>
    <el-divider />
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动海报" prop="poster">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="活动名称" prop="promotionName">
        <el-input v-model="ruleForm.promotionName" placeholder="请输入活动名称" />
      </el-form-item>
      <el-form-item label="活动商品" prop="commodityID">
        <el-select
          v-model="ruleForm.commodityID"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="obj in commodities"
            :key="obj.commodityID"
            :label="obj.name"
            :value="obj.commodityID"
          >
            <span style="float: left">{{ obj.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ obj.commodityID }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动价格" prop="promotionPrice">
        <el-input-number v-model="ruleForm.promotionPrice" :min="0" />
      </el-form-item>
      <el-form-item label="活动描述" prop="describe">
        <el-input v-model="ruleForm.describe" type="textarea" maxlength="50" placeholder="请输入简介" show-word-limit />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">新增</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create, replace } from '@/api/promotion'
import { list } from '@/api/commodity'
import { check } from '@/utils/check-data'
import { getToken } from '@/utils/auth'

export default {
  promotionName: 'StaffCreate',
  data() {
    return {
      action: process.env.VUE_APP_BASE_API + '/upload/poster',
      imageUrl: '',
      date: [],
      commodities: [],
      ruleForm: {
        poster: '',
        promotionName: '',
        commodityID: '',
        promotionPrice: 0,
        describe: ''
      },
      rules: {
        poster: [
          { required: true, message: '请选择活动海报', trigger: 'blur' }
        ],
        promotionName: [
          { required: true, message: '请输入活动名字', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        commodityID: [
          { required: true, message: '请选择活动商品', trigger: 'blur' }
        ],
        promotionPrice: [
          { required: true, message: '请输入活动价格', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入活动描述', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  created() {
    window.addEventListener('beforeunload', this.beforeunloadEvent)
    this.fetchData()
  },
  beforeDestroy() {
    this.beforeunloadEvent
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.beforeunloadEvent)
  },
  methods: {
    beforeunloadEvent() {
      if (this.ruleForm.poster !== '') {
        replace(this.ruleForm.poster).then(res => {
        }).catch(err => {
          console.log(err)
        })
      }
    },
    fetchData() {
      list().then(res => {
        this.commodities = check(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    handleAvatarSuccess(res, file) {
      if (this.ruleForm.poster !== '') {
        replace(this.ruleForm.poster).then(res => {
        }).catch(err => {
          console.log(err)
        })
      }
      this.imageUrl = URL.createObjectURL(file.raw)
      this.ruleForm.poster = res.data
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          create(this.ruleForm).then(res => {
            this.$message({
              message: '申请成功',
              type: 'success'
            })
            this.$refs['ruleForm'].resetFields()
            this.imageUrl = ''
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      if (this.ruleForm.poster !== '') {
        replace(this.ruleForm.poster).then(res => {
          this.imageUrl = ''
        }).catch(err => {
          console.log(err)
        })
      }
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.el-input{
  width: 200px;
}
.el-select{
  width: 120px;
}

.el-textarea{
  width:70%;
  min-width: 200px;
}

</style>

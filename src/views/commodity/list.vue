<template>
  <div class="app-container">
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvavtarFail"
      :before-upload="beforeAvatarUpload"
      :limit="1"
      :multiple="false"
      :headers="headers"
    >
      <div class="el-upload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      imageUrl: '',
      action: `${process.env.VUE_APP_BASE_API}/upload/avatar`
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    handleAvavtarFail(err) {
      const errMsg = (err.message && JSON.parse(err.message)) || '上传失败'
      this.$message({
        message: (errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || '上传失败',
        type: 'error'
      })
      this.$emit('onError', err)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff !important;
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
</style>

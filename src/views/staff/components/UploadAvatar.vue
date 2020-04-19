<template>
  <el-upload
    ref="upload"
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handelAvatar"
    :on-success="handleAvatarSuccess"
    :headers="headers"
  >
    <div class="el-upload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </div>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'UploadAvatar',
  props: {
    url: { type: String, required: false, default: '' }
  },
  data() {
    return {
      imageUrl: this.url,
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
  watch: {
  },
  methods: {
    handelAvatar(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt2M = file.raw.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$emit('exist', true, this.imageUrl)
      }
    },
    handleRemove() {
      this.$refs.upload.clearFiles()
      this.imageUrl = ''
      this.$emit('exist', false)
    },
    handleAvatarSuccess(res, file) {
      this.$emit('success', res.data)
    },
    handleReset() {
      this.$refs.upload.clearFiles()
      this.imageUrl = this.url
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

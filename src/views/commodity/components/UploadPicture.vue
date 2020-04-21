<template>
  <div>
    <el-upload
      ref="upload"
      :action="action"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="false"
      :headers="headers"
      :on-change="handleChange"
      :limit="4"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
    >
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5mb</div>
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'UploadPicture',
  props: {
    value: { type: Array, required: false, default: () => [] },
    url: { type: String, required: false, default: '' }
  },
  data() {
    return {
      fileList: this.value,
      action: process.env.VUE_APP_BASE_API + this.url,
      dialogImageUrl: '',
      dialogVisible: false,
      uploaded: []
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
    handleExceed(files, fileList) {
      this.$message.error('最多只能上传4张图片!')
    },
    handleChange(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt5M = file.raw.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      if (isJPG && isLt5M && fileList.length <= 4) {
        this.$message.success('上传成功')
        this.$emit('add', file)
      } else {
        fileList.pop()
      }
    },
    handleRemove(file, fileList) {
      console.log(fileList)
      const filename = fileList.map(obj => obj.name)
      this.$emit('remove', filename)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      this.uploaded.push(response.data)
      if (this.uploaded.length === fileList.length) {
        this.$emit('success', this.uploaded)
      }
    }
  }
}
</script>

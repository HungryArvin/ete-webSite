<template>
  <div class="app-container">
    <el-tag type="info">学生信息excel文件，上传指定格式的excel文件即可录入学生信息</el-tag>
    <el-tag>
      <i class="el-icon-download" />
      <a :href="'https://arvin-bucket.oss-cn-beijing.aliyuncs.com/excel/studentExcel.xlsx'">点击下载内容模版</a>
    </el-tag>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
    <el-upload
      ref="upload"
      :hidden="importBtnDisabled"
      :auto-upload="true"
      :on-success="fileUploadSuccess"
      :on-error="fileUploadError"
      :disabled="importBtnDisabled"
      :limit="1"
      :action="BASE_API+'/student-info/upload'"
      name="studentExcel"
      accept="application/.xlsx"
    >
      <el-button slot="trigger" size="small" type="primary">点击确认上传的excel文件</el-button>
    </el-upload>

  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      submitFlag: true,
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
      importBtnDisabled: true // 按钮是否禁用,
    }
  },
  methods: {
    beforeUpload(file) {
      // 100Mb大小限制
      const isLt1M = file.size / 1024 / 1024 < 100

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '上传文件过大!',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      // :action="VUE_APP_BASE_API+'/backstage/student-info/upload'"
      this.tableData = results
      this.tableHeader = header
      this.importBtnDisabled = false
    },
    fileUploadSuccess(response) {
      if (response.success === true) {
        this.fileUploadBtnText = '导入成功'
        this.$message({
          type: 'success',
          message: '恭喜你，学生信息添加成功'
        })
        this.$router.push({ path: '/student/student-list' })
      } else {
        this.$message({
          type: 'error',
          message: '导入失败 请检查格式或重试'
        })
      }
    },
    fileUploadError(response) {
      this.fileUploadBtnText = '导入失败'
      this.$message({
        type: 'error',
        message: '导入失败'
      })
    }
  }
}
</script>

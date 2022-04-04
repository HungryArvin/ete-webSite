<template>
  <div class="container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="ruleForm.courseName" />
      </el-form-item>
      <el-form-item label="课程学分" prop="courseGradePoint">
        <el-select v-model="ruleForm.courseGradePoint" placeholder="请选择学分">
          <el-option label="1学分" value="1" />
          <el-option label="2学分" value="2" />
          <el-option label="3学分" value="2" />
          <el-option label="4学分" value="2" />
          <el-option label="5学分" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程周期" required>
        <el-date-picker
          v-model="ruleForm.startTime"
          type="date"
          placeholder="选择日期开始日期"
          :picker-options="pickerOptions"
        />
        <el-date-picker
          v-model="ruleForm.endTime"
          type="date"
          placeholder="选择日期结束日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>

      <el-form-item label="课程封面上传">
        <el-upload
          v-loading="loading"
          element-loading-text="拼命上传中请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          class="avatar-uploader"
          :action="BASE_API+'/oss/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="file"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程简介" prop="courseIntroduction">
        <el-input v-model="ruleForm.courseIntroduction" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { saveCourse, getById } from '@/api/course'
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      imageUrl: '',
      loading: false,
      ruleForm: {
        id: '',
        courseName: '',
        courseGradePoint: '',
        startTime: '',
        endTime: '',
        courseIntroduction: '',
        courseCover: ''
      },
      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        courseGradePoint: [
          { required: true, message: '请选择学分', trigger: 'change' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
        ],
        courseIntroduction: [
          { required: true, message: '请填写课程简介', trigger: 'blur' },
          { min: 3, max: 400, message: '长度在 3 到 400 个字符', trigger: 'blur' }
        ]
      },
      pickerOptions: {

        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.courseId) {
        if (this.$route.params.courseId === ':courseId') {
          return false
        }
        getById(this.$route.params.courseId).then(response => {
          if (response.data.courseDetails) {
            this.ruleForm = response.data.courseDetails
            this.imageUrl = response.data.courseDetails.courseCover
          }
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && !this.loading) {
          saveCourse(this.ruleForm).then(response => {
            if (response.code == 200) {
              this.$message.success('保存成功')
            }
          })
          this.$router.push({ path: '/courseInfo/courseList' })
        } else {
          this.$message.error('请检查表单')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.loading = false
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5
      this.loading = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      this.loading = true
      return isJPG && isLt2M
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
    width: 200px;
    height: 250px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>

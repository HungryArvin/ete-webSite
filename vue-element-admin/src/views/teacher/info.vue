<template>
  <div class="teacher-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="教师姓名" prop="teacherName">
        <el-input v-model="ruleForm.teacherName" />
      </el-form-item>
      <el-form-item label="教师性别" prop="teacherSex" required>
        <el-select v-model="ruleForm.teacherSex" placeholder="性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="基本信息" required prop="teacherNum">
        <el-input v-model="ruleForm.teacherNum" placeholder="教师工号" type="number" />
        <el-input v-model="ruleForm.officeLocation" placeholder="办公地点" />
        <el-input v-model="ruleForm.professional" placeholder="职称" />
        <el-input v-model="ruleForm.department" placeholder="所属部门" />
      </el-form-item>
      <el-form-item label="出生日期" required>
        <el-date-picker
          v-model="ruleForm.birthday"
          type="date"
          placeholder="选择出生日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="班级及课程">
        <el-select v-model="classList" multiple placeholder="请选择班级" prop="list">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.level+item.className"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="course" multiple placeholder="请选择课程" prop="courseList">
          <el-option
            v-for="item in courseList"
            :key="item.courseId"
            :label="item.courseName"
            :value="item.courseId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="头像上传">
        <pan-thumb :image="image" />

        <el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
          上传头像
        </el-button>

        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API+'/oss/upload'"
          field="file"
          lang-type="en"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item label="教师简介" prop="teacherIntroduction">
        <el-input v-model="ruleForm.teacherIntroduction" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { getClassList, getCourseList, saveTeacher, getById, updateTeacher } from '@/api/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      imageUrl: '',
      loading: false,
      ruleForm: {
        teacherId: '',
        teacherName: '',
        teacherSex: '',
        teacherNum: '',
        teacherIntroduction: '',
        teacherCover: '',
        officeLocation: '',
        professional: '',
        department: '',
        classList: [],
        courseList: []
      },
      rules: {
        teacherName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        teacherSex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        teacherNum: [
          { required: true, message: '请完善基本信息', trigger: 'blur' }
        ],
        list: [
          { required: true, message: '请选择班级及课程', trigger: 'bulr' }
        ],
        teacherIntroduction: [
          { required: true, message: '请填写简介', trigger: 'blur' },
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
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'http://arvin-bucket.oss-cn-beijing.aliyuncs.com/image/2022/03/30/50b4c9d下载.jpg',
      options: [],
      classList: [],
      course: [],
      courseList: []
    }
  },
  created() {
    this.init()
  },
  methods: {

    init() {
      // 初始化多选列表
      getClassList().then(response => {
        if (response.code === 200) {
          this.options = response.data.list
        }
      })
      getCourseList().then(response => {
        if (response.code === 200) {
          this.courseList = response.data.list
        }
      })
      // 判断是否需要回显
      if (this.$route.params && this.$route.params.id) {
        if (this.$route.params.id === ':id') {
          return false
        }
        getById(this.$route.params.id).then(response => {
          if (response.data) {
            this.ruleForm = response.data.data
            this.image = response.data.data.teacherCover
            this.classList = response.data.data.classList
            this.course = response.data.data.courseList
          }
        })
      }
    },
    submitForm(formName) {
      // 绑定选择器id
      this.ruleForm.classList = this.classList
      this.ruleForm.courseList = this.course
      this.ruleForm.teacherCover = this.image
      console.log(JSON.stringify(this.ruleForm))
      this.$refs[formName].validate((valid) => {
        if (valid && !this.loading) {
          if (this.$route.params && this.$route.params.id !== ':id') {
            updateTeacher(this.ruleForm)
          } else {
            saveTeacher(this.ruleForm).then(response => {
              if (response.code === 200) {
                this.$message.success('保存成功')
              }
            })
          }
          this.$router.push({ path: '/teacher/list' })
        } else {
          this.$message.error('请检查表单')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.url
    },
    close() {
      this.imagecropperShow = false
    }
  }

}

</script>
<style>
.teacher-container {
    margin-top: 30px;
}
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
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

</style>

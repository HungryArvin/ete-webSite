<template>
  <div class="container">
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;" />
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules">
      <el-form-item label="系别名称" prop="department">
        <el-input v-model="formLabelAlign.department" />
      </el-form-item>
      <el-form-item label="班级名称" prop="className">
        <el-input v-model="formLabelAlign.className" />
      </el-form-item>
      <el-form-item label="入学时间" prop="level">
        <el-input v-model="formLabelAlign.level" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { saveClass } from '@/api/classInfo'
export default {
  data() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        department: '',
        className: '',
        level: ''
      },
      rules: {
        department: [
          { required: true, message: '请输入系别', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ],
        level: [
          { type: 'Number', required: true, message: '请输入年份', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      saveClass(this.formLabelAlign).then(reponse => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 200
        })
        this.$router.push({ path: '/classInfo/classList' })
      })
    },
    cancel() {
      this.$router.push({ path: '/classInfo/classList' })
    }
  }

}

</script>
<style>
.container {
    display:list-item;
    flex: 1;
    font-size: 50px;
    align-content: center;
    justify-content: center;
    /* width: 1000px; */
    margin-top: 70px;
    margin-left: 100px;
}

</style>

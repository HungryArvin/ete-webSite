<template>
    <div class="question-create-container">

           
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
             <el-form-item
                prop="name"
                label="问卷名称"
                :rules="[
                { required: true, message: '请输入名称', trigger: 'blur' },
                ]"
  >
    <el-input v-model="dynamicValidateForm.name"  :rows="2" maxlength="100"
  show-word-limit resize="both" size="medium" class="input-item"></el-input>
  </el-form-item>
            <el-form-item
                prop="question"
                label="教评问题1"
                :rules="[
                { required: true, message: '请输入问题内容', trigger: 'blur' },
                ]"
  >
    <el-input v-model="dynamicValidateForm.question"   type="textarea" :rows="2" maxlength="500"
  show-word-limit resize="both" size="medium" class="input-item"></el-input>
  <el-select v-model="dynamicValidateForm.type" placeholder="请选择问题类型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'教评问题' + (index+2)"
    :key="domain.key"
  >
    <el-input v-model="domain.question"   type="textarea" :rows="2" maxlength="500"
  show-word-limit class="input-item"></el-input>
   <el-select v-model="domain.type" placeholder="请选择问题类型">
    <el-option
      v-for="item in options"
      :key="item.value+(index+2)"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
  <el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="addDomain">新键问题</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
    
</template>


<script>
import {saveQuestion} from '@/api/question'
  export default {
    data() {
      return {
        dynamicValidateForm: {
            name: '',
          domains: [{
            question: '',
            type: ''
          }],
          question: '',
          type: '',
        },
        options: [{
          value: '1',
          label: '打分问卷'
        },{
          value: '2',
          label: '填空问卷'
        }]
      };
    },
    created () {
        this.open2()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.dynamicValidateForm));
            saveQuestion(this.dynamicValidateForm).then(Response => {
                this.$message.success("问卷生成成功");
            })
          } else {
            alert("请检查表单")
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          type: '',
          key: Date.now()
        });
      },
      open2() {
        this.$notify({
          title: '提示',
          message: '打分问卷的分值会纳入教评综合分计算当中',
          duration: 0,
          type: 'warning'
        });
      }
    
    }
  }
</script>
<style scoped>
.input-item {
    width: 80%;
    background-color: darkgray;
    border-radius: 20px;
    margin: 10px 10px;
}

</style>
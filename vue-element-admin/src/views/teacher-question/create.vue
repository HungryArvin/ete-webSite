<template>
    <div class="question-create-container">

           
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">

            <el-form-item
                prop="question"
                label="个人问卷 1"
                :rules="[
                { required: true, message: '请输入问题内容', trigger: 'blur' },
                ]"
  >
    <el-input v-model="dynamicValidateForm.question"   type="textarea" :rows="2" maxlength="500"
  show-word-limit resize="both" size="medium" class="input-item"></el-input>

  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'个人问卷 ' + (index+2)"
    :key="domain.key"
  >
    <el-input v-model="domain.question"   type="textarea" :rows="2" maxlength="500"
  show-word-limit class="input-item"></el-input>

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
import {createPresent} from '@/api/question'
import router from '@/router';
  export default {
    data() {
      return {
        dynamicValidateForm: {
            name: '',
          domains: [{
            question: '',
            type: '3'
          }],
          question: '',
          type: '3',
        }
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
            createPresent(this.dynamicValidateForm).then(Response => {
                this.$message.success("问卷生成成功");
                this.$router.push("/teacher-profile/info")
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
          type: '3',
          key: Date.now()
        });
      },
      open2() {
        this.$notify({
          title: '提示',
          message: '当前问卷会下发到所有教评问卷内容当中',
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


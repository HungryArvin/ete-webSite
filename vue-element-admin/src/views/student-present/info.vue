<template>
    <div class="question-container">
        <el-progress :stroke-width="26" :text-inside="true"   :percentage="percentage" :color="customColor"></el-progress>
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span id="title">问题{{index+1}}:  {{item.question}}</span>
  </div>
    <div :hidden="!hidden">
    <div class="block" >
        <span class="demonstration">请打分(一颗星是1分)：</span>
        <el-rate
             id="start"
             allow-half=true
            v-model="item.answer"
            :colors="colors">
        </el-rate>
</div>

    </div>
    <div :hidden="hidden">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="item.answer">
            </el-input>
    </div>
     <el-divider>{{item.type == 1 ? "评分题(分值会影响老师综合评分)" : "问答填空题(需在输入框中回答)"}}</el-divider>
     <el-button-group>
  <el-button type="primary" icon="el-icon-arrow-left" :disabled="prev" @click="pre()">返回上一题</el-button>
  <el-button type="primary" id="next-btn" @click="next()" :disabled="disable">提交并下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  <el-button type="primary" :disabled="!disable" @click="submit()">上传交卷<i class="el-icon-upload el-icon--right"></i></el-button>
</el-button-group>
     
</el-card>
    </div>
</template>
<script>
import {getTeacherPresentQuestion,submitQuestion} from '@/api/question'

 export default {
    data() {
      return {
        prev: true,
        disable: false,
        count: 0,
        index: 0,
        hidden: true,
        percentage: 0,
        customColor: '#409eff',
        customColors: [
          {color: '#409effed', percentage: 0},
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
        questionList: [],
        name: '',
        item: {
            id: '',
            question: '',
            type: '',
            answer: ''
        },
        value: 0,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'] ,
        submitItem:{
            questionList: [],
             manageId: ''
        }
      };
    },
    created() {
        this.init();
    },
    methods: {
     init() {
         this.index = 0;
             getTeacherPresentQuestion().then(response => {
                 this.questionList = response.data.list;
                 this.name = response.data.name;
                 this.item = this.questionList[this.index];
                 this.count = parseInt(100/this.questionList.length);
                 this.judgeType(this.item.type)
             })
         
     },
     next () {
         if(this.item.answer === 0 || this.item.answer === null){
             this.$message.error("请先完成当前问题！")
             return false;
         }
         //替换参数
         this.questionList[this.index] = this.item;
         this.index++;
         if(this.index !== 0) {
             this.prev = false;
         }
          this.item = this.questionList[this.index];
         this.judgeType(this.item.type)
         
     },
     judgeType(type) {
         //进度条变化
         this.percentage = (this.count*(this.index+1));
         if(this.index === this.questionList.length-1) {
             this.percentage = 100;
             this.disable = true;
         } else {
             this.disable = false;
         }
         if(type === 1){
             this.hidden = true;
         } else {
             this.hidden = false;
         }
     },
     pre() {
         if(this.index === 0){
             this.prev = true;
             return false;
         }
         //替换参数
         this.questionList[this.index] = this.item;
         this.index--;
         if(this.index !== 0) {
             this.prev = false;
         }
         this.item = this.questionList[this.index];
         this.judgeType(this.item.type)
          
     },
    submit() {
        //替换最后一个问题
        this.questionList[this.index] = this.item;
        //绑定manageId
        this.submitItem.manageId = this.$route.params.id;
        this.submitItem.questionList = this.questionList;
        //提交表单
        submitQuestion(this.submitItem).then(reponse => {
            this.$message.success("教评问卷上传成功")
            this.$router.push('/student-answer/list')
        })
    }
    }
  }
</script>
<style>
#title{
    font-size: 20px;
    font-style: inherit;
    font-family: Sans-serif;
}
  .text {
    font-size: 20px;
    color: rgb(238, 17, 17);
    font-style:unset;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
      margin-top: 20px;
    width: 50%;
    margin-left: 25%;
    height: 600px;
  }
  .demonstration {
      margin-top: 16px;
      margin-bottom: 16px;
  }
.el-rate__icon {
    font-size: 60px;

}
  .block{
      padding-top: 10px;
      padding-left: 30%;
      width: 100%;
      height: 100px;
  }
  #next-btn{
      display: flex;
      align-content: center;
      justify-content: center;
  }
</style>
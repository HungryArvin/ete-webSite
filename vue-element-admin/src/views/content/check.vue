<template>
    <div class="question-container">
        <el-progress :percentage="percentage" :color="customColor"></el-progress>
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span id="title">学生姓名：{{name}}</span>
  </div>
  <div v-for="(item,$index) in questionList" :key="item.id" class="text item">
     题目{{$index+1}} : {{item.question}}
     <el-divider>学生回答</el-divider>
     <span class="answer">{{item.answer}}</span>
      <el-divider></el-divider>

  </div>
</el-card>
    </div>
</template>
<script>
import {checkStudent} from '@/api/question'

 export default {
    data() {
      return {
        percentage: 100,
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
        name: ''
      };
    },
    created() {
        this.init();
    },
    methods: {
     init() {
         if(this.$route.params && this.$route.params.id !== ":id"){
             checkStudent(this.$route.params.id).then(response => {
                 this.questionList = response.data.list;
                 this.name = response.data.name;
             })
         } else {
             this.name = "请到我的教评列表选择需要查阅的问卷！"
         }
     }
    }
  }
</script>
<style>
#title{
    font-size: 40px;
    font-style: inherit;
}
  .text {
    font-size: 20px;
    color:lightslategrey;
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
    height: 100%;
  }
  .answer {
    color: rgb(238, 17, 17);
  }
</style>
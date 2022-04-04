<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="管理的班级" name="classList">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="我的账户信息" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
         <div class="chart-container">
        <chart height="60%" width="100%"  />
    </div>
      </el-row>
     
    </div>
     
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Account from './components/Account'
import {getUserCard} from '@/api/teacher'
import Chart from '@/components/Charts/Keyboard'



export default {
  name: 'Profile',
  components: { Chart,UserCard, Activity, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
        getUserCard().then(response => {
        this.user = response.data.user;
      })
    }
  }
}
</script>
<style scoped>
.chart-container{
  margin-top: 20px;
  margin-left: 26%;
  width: 70%;
  height: calc(100vh - 84px);
}
</style>
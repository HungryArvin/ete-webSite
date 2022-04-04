<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.teacherName" placeholder="姓名关键字" style="width: 200px;" class="filter-item" />
      <el-input v-model="listQuery.teacherNum" placeholder="工号直搜" style="width: 200px;" class="filter-item" type="number" />
      <el-input v-model="listQuery.officeLocation" placeholder="办公地点关键字" style="width: 200px;" class="filter-item" />
      <el-input v-model="listQuery.department" placeholder="部门关键字" style="width: 200px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.teacherId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacherName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacherSex === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.teacherNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" width="100px" align="center">
        <template slot-scope="{row}" class="link-type">
          <span>{{ row.professional }}</span>
        </template>
      </el-table-column>
      <el-table-column label="办公地点" width="200px" align="center">
        <template slot-scope="{row}" class="link-type">
          <span>{{ row.officeLocation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在部门" width="200px" align="center">
        <template slot-scope="{row}" class="link-type">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教评综合分" width="200px" align="center">
        <template slot-scope="{row}" class="link-type">
          <div class="block">
            <el-rate
              v-model="row.satisfactionPoint"
              disabled
              show-score
              text-color="#ff9900"
              :colors="colors"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="简介" min-width="300px" align="center">
        <template slot-scope="{row}" class="link-type">
          <span>{{ row.teacherIntroduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
           <el-button type="primary" size="mini" @click="checkTeacherQuestion(row)">
            教评结果
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, deleteTeacher } from '@/api/teacher'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        teacherName: '',
        teacherNum: '',
        officeLocation: '',
        department: ''
      },
      classNames: [],
      showReviewer: false,
      pvData: [],
      rules: {
        department: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        className: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        level: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      downloadLoading: false,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }, handleFilter() {
      // 带条件搜索
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleUpdate(row) {
      this.$message.success('修改课程信息')
      this.$router.push({ path: '/teacher/info/' + row.teacherId })
    },
    handleDelete(row, index) {
      deleteTeacher(row.teacherId)
      this.$notify({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    checkTeacherQuestion(row) {
      this.$router.push('/teacher/stduentList/'+row.teacherId);
      this.$message.success("当前正在查阅 "+ row.teacherName +" 老师的教评问卷结果")
    }
  }
}
</script>

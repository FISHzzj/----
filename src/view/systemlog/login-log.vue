<template>
  <div>
    <Card>
      <tables ref="tables" 
        editable 
        searchable 
        search-place="top" 
        v-model="tableData" 
        :columns="columns" 
        :evevtType="evevtType"
        :userName="userName"
        :userMobile="userMobile"
        @on-delete="handleDelete"
    />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/system-log-tables'
// import { getTableData } from '@/api/data'
export default {
  name: 'login_log',
  components: {
    Tables,
  },
  data () {
    return {
      columns: [
        { title: '用户姓名', key: 'userName'},
        { title: '用户手机', key: 'userMobile' },
        { title: '登录登出', key: 'log_in_out' },
        { title: '请求时间', key: 'getTime' },
        { title: '远端地址', key: 'remoteAddress' },
        { title: '请求方法', key: 'Method' },
        { title: '请求URL', key: 'getUrl' },
        { title: '返回码', key: 'returnCode' },
        { title: '终端类型', key: 'terminalType' },
        { title: '登录方式', key: 'loginType' },
        { title: '错误信息', key: 'errorMessage' },
      ],
      evevtType:[
        { title: '所有', key: 'all'},
        { title: 'GET', key: 'get'},
        { title: 'POST', key: 'post' },
      ],
      tableData: [],
      userName:true,
      userMobile:true,
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    // getTableData().then(res => {
    //   this.tableData = res.data
    // })
  }
}
</script>

<style>

</style>

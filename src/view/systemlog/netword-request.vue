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
        :searchCol="searchCol"
        :userName="userName"
        :userMobile="userMobile"
        :getUrl="getUrl"
        @on-delete="handleDelete"
    />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/system-log-tables'
// import { getTableData } from '@/api/data'
export default {
  name: 'netword_request',
  components: {
    Tables,
  },
  data () {
    return {
      columns: [
        { title: '事件类型', key: 'eventType'},
        { title: '用户手机', key: 'userMobile' },
        { title: '请求时间', key: 'getTime' },
        { title: '远端地址', key: 'remoteAddress' },
        { title: '请求URL', key: 'getUrl' },
        { title: '返回时间', key: 'returnTime' }
      ],
      evevtType:[
        { title: '所有', key: 'all'},
        { title: 'GET', key: 'get'},
        { title: 'POST', key: 'post' },
      ],
      tableData: [],
      searchCol:true,
      userName:true,
      userMobile:true,
      getUrl:true,
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

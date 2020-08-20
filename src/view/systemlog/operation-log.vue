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
        :searchValueIf="searchValueIf"
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
  name: 'operation_log',
  components: {
    Tables,
  },
  data () {
    return {
      columns: [
        { title: '事件类型', key: 'eventType'},
        { title: '时间', key: 'time' },
        { title: '简短信息', key: 'shortMessage'},
        { title: '详细信息', key: 'detailedInformation' },
      ],
      evevtType:[
        { title: '所有', key: 'all'},
        { title: 'GET', key: 'get'},
        { title: 'POST', key: 'post' },
      ],
      tableData: [],
      searchValueIf:true,
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

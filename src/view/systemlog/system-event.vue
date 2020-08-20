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
        @on-delete="handleDelete"
    />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/system-log-tables'
// import { getTableData } from '@/api/data'
export default {
  name: 'system_event',
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
        { title: '正常日志', key: 'eventType'},
        { title: '异常日志', key: 'time' },
        { title: '错误日志', key: 'shortMessage'}
      ],
      tableData: [],
      searchCol:true,
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

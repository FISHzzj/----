<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" :title="title" @on-delete="handleDelete"/>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
// import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Email', key: 'email', editable: true },
        { title: 'Create-Time', key: 'createTime' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: [],
      tableJson: [
        {name: 'zhuanghzuangjie', initRowIndex: 0, email: '1169254794@qq.com', createTime: '2020-08-02'},
        {name: 'zhuanghzuangjie', initRowIndex: 1, email: '1169254794@qq.com', createTime: '2020-08-02'},
        {name: 'zhuanghzuangjie', initRowIndex: 2, email: '1169254794@qq.com', createTime: '2020-08-02'},
        {name: 'zhuanghzuangjie', initRowIndex: 3, email: '1169254794@qq.com', createTime: '2020-08-02'}
      ],
      title: "系统参数添加"
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
    //   console.log(res)
      this.tableData = this.tableJson
    // })
  }
}
</script>

<style>

</style>

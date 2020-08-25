<template>
  <div>
    <Card>
      <tables ref="tables" 
        editable 
        searchable 
        stripe
        search-place="top" 
        v-model="tableData" 
        :border="border"
        :addSearchBtn="addSearchBtn"
        :searchCol="searchCol"
        :columns="columns" 
        :title="title" 
        :pageTotal="pageTotal"
        :pageNum="pageNum"
        :addListArr="addListArr"
        :arrsearch="arrsearch"
        :height="height"
        @on-delete="handleDelete" 
        @on-save-edit="handleSaveEdit" 
        @onPageChage="onPageChage"
        @onPageSizeChage="onPageSizeChage"
        @onHandleSearch="onHandleSearch"
        @on-handle-from="onHandleFrom"
      />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
// import { getTableData } from '@/api/data'
export default {
  name: 'user_information',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '账号', key: 'username', editable: true },
        { title: '用户名', key: 'name', editable: true },
        { title: '手机号', key: 'mobile', editable: true },
        { title: '时间', key: 'createTime', editable: true },
        {
          title: '删除',
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
                h('Button', {
                  props: {
                      type: 'error',
                      size: 'small',
                      icon:'logo-tumblr'
                  },
                }, '删除')
              ])
            }
          ],
          editable: true,
        }
      ],
      tableData: [],
      tableJson: [
        {name: 'zhuanghzuangjie', initRowIndex: 0, mobile: '1169254794@qq.com', createTime: '2020-08-02'},
        {name: 'zhuanghzuangjie', initRowIndex: 1, mobile: '1169254794@qq.com', createTime: '2020-08-02'},
        {name: 'zhuanghzuangjie', initRowIndex: 2, mobile: '1169254794@qq.com', createTime: '2020-08-02'},
        {name: 'zhuanghzuangjie', initRowIndex: 3, mobile: '1169254794@qq.com', createTime: '2020-08-02'}
      ],
      title: "用户信息添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      addSearchBtn:true,
      searchCol:true,
      border:true,
      addListArr:[
        {nametitle: '账号', key:'f_username', valuetext: ''},
        {nametitle: '用户名', key:'f_name',valuetext: ''},
        {nametitle: '手机号', key:'f_mobile', valuetext: ''},
        {nametitle: '员工号', key:'f_emid', valuetext: ''},
        {nametitle: '昵称', key:'f_nickname', valuetext: ''},
        {nametitle: '性别', key:'f_sex', valuetext: ''},
        {nametitle: '生日', key:'f_birthday', valuetext: ''},
        {nametitle: '用户属性', key:'f_attribute', valuetext: ''},
        {nametitle: '头像', key:'f_img', valuetext: ''},
      ],
      arrsearch:[
        {title: '账号', val: '', name: 'f_username'},
        {title: '用户名', val: '', name: 'f_name'},
        {title: '手机号', val: '', name: 'f_mobile'},
      ],
      height:450,
    }
  },
  methods: {
    // 新增 表单 确认btn
    async onHandleFrom(arrData) {
      let res = await $ajax('userDataAdd', 'post', arrData)
      if(!res) return 
      this.getdata()
    },
    async handleSaveEdit (params) {
        // console.log(params)
        let data = {}
        data['f_id'] = params.id
        data[`f_${params.column.key}`] = params[params.column.key]
        //更新字段
        let res = await $ajax('userDataUpdate', 'put', data)
        if(!res) return false
        Toast('更新成功')
    },
    async handleDelete (params) {
      console.log(params)
      //删除 row 
      let res = await $ajax('userDataDelete','delete',{
        f_id: params.row.id,
      })
      if(!res) return false
      Toast('删除成功')
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    //获取页码
    onPageChage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.getdata()

    },
    //获取页数
    onPageSizeChage(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.getdata()

    },
    //搜索
    onHandleSearch(...obj) {
      let data = obj[0]
      this.getSearchData(data)

    },
    async getdata() {
        let res = await $ajax("userdataget", 'get', {
          f_page: this.pageNum,
          f_limit: this.pageSize
        })
        if(!res) return false
        console.log(res)
        this.pageTotal = res.f_data_json.f_count
        this.pageNum = res.f_data_json.f_page
        let tableJson = []
        res.f_data_json.f_values.forEach((item, index) => {
            tableJson.push({
                id: item.id,
                username: item.f_username, //账号
                name: item.f_name, // 用户名
                initRowIndex: index,
                mobile: item.f_mobile, // 手机号
                createTime: item.f_join_time

            })
        });
        this.tableData = tableJson
    },
    //搜索
    async getSearchData(data) {

        let res = await $ajax("userdataget", 'get', data)
        if(!res) return false
        this.pageTotal = res.f_data_json.f_count
        this.pageNum = res.f_data_json.f_page
        let tableJson = []
        res.f_data_json.f_values.forEach((item, index) => {
            tableJson.push({
                id: item.id,
                username: item.f_username, //账号
                name: item.f_name, // 用户名
                initRowIndex: index,
                mobile: item.f_mobile, // 手机号
                createTime: item.f_join_time

            })
        });
        this.tableData = tableJson

    },
  },
  mounted () {
    this.getdata()

  }
}
</script>

<style>

</style>

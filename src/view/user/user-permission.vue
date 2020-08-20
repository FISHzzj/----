<template>
  <div class="demo-split">
      <Split v-model="split1">
          <div slot="left" class="demo-split-pane">
            <Card>
              <tables ref="tables" 
                editable 
                searchable 
                search-place="top" 
                v-model="tableData" 
                :columns="columns" 
                :title="title" 
                :pageTotal="pageTotal"
                :pageNum="pageNum"
                :addSearchBtn="addSearchBtn"
                :permsReset="permsReset"
                @on-delete="handleDelete" 
                @onPageChage="onPageChage"
                @onPageSizeChage="onPageSizeChage"
                @onHandleSearch="onHandleSearch"
                @on-row-dblclick="onRowDblclick"
                @onAddRow="onAddRow"
                @onResetBtn="onResetBtn"
              />
            </Card>
          </div>
          <div slot="right" class="demo-split-pane">
            <Tree :data="data4" show-checkbox multiple></Tree>
          </div>
      </Split>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  name: 'user_permission',
  components: {
    Tables
  },
  data () {
    return {
      split1: 0.4,
      columns: [
        { title: '分组名称', key: 'name',},
        {
          title: '操作',
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
              })
            }
          ],
        }
      ],
      tableData: [],
      title: "用户信息添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      addSearchBtn:true,
      permsReset:true,
      data4: [
          {
              title: 'parent 1',
              expand: true,
              selected: true,
              children: [
                  {
                      title: 'parent 1-1',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-1-1',
                              // disabled: true
                          },
                          {
                              title: 'leaf 1-1-2'
                          }
                      ]
                  },
                  {
                      title: 'parent 1-2',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-2-1',
                              checked: true
                          },
                          {
                              title: 'leaf 1-2-1'
                          }
                      ]
                  }
              ]
          }
      ]
    }
  },
  methods: {
    //新增
    async onAddRow(data){
      let arrData = {}
      Object.keys(data).forEach((key) => {
        arrData[`f_${key}`] = data[key]
      })
      let res = await $ajax('permsGroupsAdd', 'post', arrData)
      if(!res) return 
      this.getdata()
    },
    //双击行
    onRowDblclick(row, index) {
      console.log(row,index)
      let data = {}
      data['f_name'] = row.name
       this.getPermsGroupToget(data)
      
    },
    
    async handleDelete (params) {
      console.log(params)
      //删除 row 
      let res = await $ajax('permsGroupDelete','delete',{
        f_id: params.row.id,
      })
      if(!res) return false
      Toast('删除成功')
    },
    //获取页码
    onPageChage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.getdata()
    },
    //获取页数
    onPageSizeChage() {
      console.log(pageNum)
      this.pageNum = pageNum
      this.getdata()
    },
    //搜索
    onHandleSearch({searchKey, searchValue}) {
   
       let shuxin = `f_${searchKey}`
      if(!searchValue) return false
      let data = {}
      data[`${shuxin}`] = `${searchValue}`
      console.log(data)
      this.getSearchData(data)

    },
    async getdata() {
         let res = await $ajax("permsGroupsget", 'get', {
          f_page: this.pageNum,
          f_limit: this.pageSize
        })
        if(!res) return false

        this.pageTotal = res.f_data.f_count
        this.pageNum = res.f_data.f_page

        let tableJson = []
        res.f_data.f_values.forEach((item, index) => {
            tableJson.push({
                id: item.id,
                name: item.f_name, //账号
            })
        });
        this.tableData = tableJson
    },
      //搜索
    async getSearchData(data) {
      let res = await $ajax("permsGroupsget", 'get', data)
      if(!res) return false
      console.log(res)
      this.pageTotal = res.f_data_json.f_count
      this.pageNum = res.f_data_json.f_page
      let tableJson = []
      res.f_data_json.f_values.forEach((item, index) => {
          tableJson.push({
            id: item.id,
            name: item.f_name, //账号
          })
      });
      this.tableData = tableJson
    },
    //重置btn
    async onResetBtn() {
      let res = await $ajax("resetPut", 'put')
      if(!res) return false
      console.log(res)
    },
    async getPermsGroupToget (data) {
      let res = await $ajax("permsGroupToget", 'get', data)
      if(!res) return false
    },
    async getpermsinform () {
      let res = await $ajax("permsget", 'get')
      if(!res) return false
      console.log(res)
    },
    
  },
  mounted () {
    // getTableData().then(res => {
    //   console.log(res)
    //   this.tableData = this.tableJson
    // })
    this.getdata()
    this.getpermsinform()

  }
}
</script>

<style lang="less" scoped>
.demo-split{
    height: calc(100% - 10px);
    border: 1px solid #dcdee2;
}
.demo-split-pane{
    padding: 10px;
}
</style>

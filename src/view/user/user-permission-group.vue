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
                @onPageChage="onPageChage"
                @onPageSizeChage="onPageSizeChage"
                @onHandleSearch="onHandleSearch"
                @on-row-dblclick="onRowDblclick"
              />
            </Card>
          </div>
          <div slot="right" class="demo-split-pane">
              <Transfer
                    :data="data2"
                    :target-keys="targetKeys1"
                    :render-format="render1"
                    @on-change="handleChange1"></Transfer>
          </div>
      </Split>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { formatTreeData, formatTreeDataEx, formatTreePremsToString} from '../../func/perms-pub.js'
import {Uniq} from '../../func/uniq.js'
export default {
  name: 'user_permission_group',
  components: {
    Tables
  },
  data () {
    return {
      split1: 0.4,
      columns: [
        { title: '用户名', key: 'name',},
        { title: '手机号', key: 'mobile',},
      ],
      tableData: [],
      title: "分组名称添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      d_permsGroup_all:[], //权限分组
      data2: this.getMockData(),
      targetKeys1: [],
      f_id: '',
    }
  },
  methods: {
    getMockData () {
        let mockData = [];
        let d_permsGroup_all =JSON.parse(localStorage.getItem('d_permsGroup_all')) 
        console.log('d_permsGroup_all',d_permsGroup_all)
        d_permsGroup_all.forEach((item, index) => {
            mockData.push({
                key: item.f_id,
                label: item.f_name,
            });
        })
        return mockData;
    },
    render1 (item) {
        return item.label;
    },
    async handleChange1 (newTargetKeys, direction, moveKeys) {
        console.log(newTargetKeys);
        console.log(direction);
        console.log(moveKeys);
        this.targetKeys1 = newTargetKeys;
        let str = JSON.stringify(newTargetKeys)
        if(!this.f_id) return Toast('请先双击用户，否则无效')
        if(direction == 'right'){
            let res = await $ajax('togroupPost','post',{
                f_id: this.f_id,
                f_groupid: 7
            })
        }else {
             let res = await $ajax('togroupPost','delete',{
                f_id: this.f_id,
                f_groupid: str
            })
        }
        if(!res) return false
        console.log(res)

    },
    //双击行
    onRowDblclick(row, index) {
      console.log(row,index)
      let data = {}
      data['f_id'] = row.id
      this.f_id = row.id
      this.getdatagroup(data)
      
    },
    
    // async handleDelete (params) {
    //   console.log(params)
    //   //删除 row 
    //   let res = await $ajax('permsGroupDelete','delete',{
    //     f_id: params.row.id,
    //   })
    //   if(!res) return false
    //   Toast('删除成功')
    // },
    //获取页码
    onPageChage(pageNum) {
      console.log(pageNum)
      let data = {}
      data['f_page'] = pageNum
      this.pageNum = pageNum
      this.getdata(data)
    },
    //获取页数
    onPageSizeChage(pageSize) {
      console.log(pageSize)
      let data = {}
      data['f_limit'] = pageSize
      this.pageSize = pageSize
      this.getdata(data)
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
    async getdata(data) {
         let res = await $ajax("togroupGet", 'get', data)
        if(!res) return false
        console.log(res)
        this.pageTotal = res.f_data_json.f_count
        this.pageNum = res.f_data_json.f_page

        let tableJson = []
        res.f_data_json.f_values.forEach((item, index) => {
            tableJson.push({
                id: item.id,
                name: item.f_name, 
                mobile: item.f_mobile
            })
        });
        this.tableData = tableJson

    },
    //获取用户=》权限分组的关系  
    async getdatagroup(data) {
         let res = await $ajax("togroupGet", 'get', data)
        if(!res) return false
        console.log(res)
        let f_perms_groups = res.f_data_json.f_values[0].f_perms_groups
        this.targetKeys1 = f_perms_groups
       
    },
      //搜索
    async getSearchData(data) {
      let res = await $ajax("togroupGet", 'get', data)
      if(!res) return false
      console.log(res)
      this.pageTotal = res.f_data_json.f_count
      this.pageNum = res.f_data_json.f_page
      let tableJson = []
      res.f_data_json.f_values.forEach((item, index) => {
          tableJson.push({
            id: item.id,
            username: item.f_username, 
            mobile: item.f_mobile
          })
      });
      this.tableData = tableJson
    },

    //获取所有权限分组
    async getpermsgroup () {
      let res = await $ajax("permsGroupsget", 'get')
      if(!res) return false
      console.log(res)
      this.d_permsGroup_all = res.f_data_json.f_values
      localStorage.setItem('d_permsGroup_all', JSON.stringify( this.d_permsGroup_all))
      

    },
    
  },
  mounted () {
    // getTableData().then(res => {
    //   console.log(res)
    //   this.tableData = this.tableJson
    // })
    this.getdata()
    this.getpermsgroup()
   

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

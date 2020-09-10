<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane">
        <Card>
          <tables
            ref="tables"
            editable
            searchable
            stripe
            search-place="top"
            v-model="tableData"
            :columns="columns"
            :title="title"
            :pageTotal="pageTotal"
            :pageNum="pageNum"
            :permaddBtn="permaddBtn"
            :permsReset="permsReset"
            :height="height"
            :arrsearch="arrsearch"
            @on-delete="handleDelete"
            @onPageChage="onPageChage"
            @onPageSizeChage="onPageSizeChage"
            @onHandleSearch="onHandleSearch"
            @on-row-dblclick="onRowDblclick"
            @onResetBtn="onResetBtn"
            @on-perm-handle-from="onPermHandleFrom"
          />
        </Card>
      </div>
      <div slot="right" class="demo-split-pane">
        <Button class="search-btn" type="primary" @click="update">修改</Button>
        <div class="treeflex">
          <List header="基础功能权限" border>
            <Tree ref="tree" :data="data4" show-checkbox multiple></Tree>
          </List>
          <List header="移动端功能权限" border>
            <Tree ref="tree1" :data="data5" show-checkbox multiple></Tree>
          </List>
          <List header="WEB端功能权限" border>
            <Tree ref="tree2" :data="data6" show-checkbox multiple></Tree>
          </List>
        </div>
      </div>
    </Split>
  </div>
</template>

<script>
import Tables from "_c/tables";
import {
  formatTreeData,
  formatTreeDataEx,
  formatTreePremsToString,
} from "../../func/perms-pub.js";
import { Uniq } from "../../func/uniq.js";
export default {
  name: "user_permission",
  components: {
    Tables,
  },
  data() {
    return {
      split1: 0.3,
      height: 450,
      columns: [
        {
          title: "分组名称",
          key: "name",
        },
        {
          title: "删除",
          key: "handle",
          options: ["delete"],
          button: [
            (h, params, vm) => {
              return h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "你确定要删除吗?",
                  },
                  on: {
                    "on-ok": () => {
                      vm.$emit("on-delete", params);
                      vm.$emit(
                        "input",
                        params.tableData.filter(
                          (item, index) => index !== params.row.initRowIndex
                        )
                      );
                    },
                  },
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                      },
                    },
                    "删除"
                  ),
                ]
              );
            },
          ],
        },
      ],
      tableData: [],
      title: "分组名称添加",
      arrsearch: [
        {
          title: "分组名称",
          val: "",
          name: "f_name",
        },
      ],
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      permaddBtn: true,
      permsReset: true,
      data4: [
        // {
        //     title: 'parent 1',
        //     expand: true,
        //     selected: true,
        //     children: [
        //         {
        //             title: 'parent 1-1',
        //             expand: true,
        //             children: [
        //                 {
        //                     title: 'leaf 1-1-1',
        //                     // disabled: true
        //                 },
        //                 {
        //                     title: 'leaf 1-1-2'
        //                 }
        //             ]
        //         },
        //         {
        //             title: 'parent 1-2',
        //             expand: true,
        //             children: [
        //                 {
        //                     title: 'leaf 1-2-1',
        //                     checked: true
        //                 },
        //                 {
        //                     title: 'leaf 1-2-1'
        //                 }
        //             ]
        //         }
        //     ]
        // }
      ],
      data5: [],
      data6: [],
      perms: {
        f_id: "",
        f_name: "",
        f_perms: "",
      },
      subdata: "",
      d_perms_all: [], // 源数据--tree
    };
  },
  methods: {
    // 新增
    async onPermHandleFrom(arrData) {
      let res = await $ajax("permsGroupsAdd", "post", arrData);
      if (!res) return;
      this.getdata();
    },
    // 双击行
    onRowDblclick(row, index) {
      console.log(row, index);
      let data = {};
      data["f_name"] = row.name;
      this.perms.f_id = row.id;
      this.perms.f_name = row.name;
      this.data4 = [];
      this.data5 = [];
      this.data6 = [];
      this.getPermsGroupToget(data);
      this.getpermsinform();
    },

    async handleDelete(params) {
      console.log(params);
      // 删除 row
      let res = await $ajax("permsGroupDelete", "delete", {
        f_name: params.row.name,
      });
      if (!res) return false;
      Toast("删除成功");
    },
    // 获取页码
    onPageChage(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.getdata();
    },
    // 获取页数
    onPageSizeChage(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.getdata();
    },
    // 搜索
    onHandleSearch(obj) {
      console.log(obj);
      // let shuxin = `f_${searchKey}`;
      // if (!searchValue) return false;

      this.getSearchData(obj);
    },
    async getdata() {
      let res = await $ajax("permsGroupsget", "get", {
        f_page: this.pageNum,
        f_limit: this.pageSize,
      });
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;

      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          id: item.f_id,
          name: item.f_name,
        });
      });
      this.perms.f_id = res.f_data_json.f_values[0].f_id;
      this.perms.f_name = res.f_data_json.f_values[0].f_name;
      this.tableData = tableJson;
      let data = {
        f_name: res.f_data_json.f_values[0].f_name,
      };

      this.getPermsGroupToget(data);
    },
    // 搜索
    async getSearchData(data) {
      let res = await $ajax("permsGroupsget", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          id: item.id,
          name: item.f_name, // 账号
        });
      });
      this.tableData = tableJson;
    },
    // 重置btn
    async onResetBtn() {
      let res = await $ajax("resetPut", "put");
      if (!res) return false;
      console.log(res);
      this.tableData = res.f_data_json.f_values;

    },
    // 修改
    async update() {
      this.data4 = [];
      this.data5 = [];
      this.data6 = [];
      let subdata = this.$refs.tree.getCheckedNodes(); // 获取勾线的节点 checked
      let subdata1 = this.$refs.tree1.getCheckedNodes(); // 获取勾线的节点 checked
      let subdata2 = this.$refs.tree2.getCheckedNodes(); // 获取勾线的节点 checked
      console.log("subdata", subdata);
      console.log("subdata1", subdata1);
      console.log("subdata2", subdata2);
      let f_perms_data = [];
      subdata.forEach((item, index) => {
        f_perms_data.push(item.id);
      });
      subdata1.forEach((item, index) => {
        f_perms_data.push(item.id);
      });
      subdata2.forEach((item, index) => {
        f_perms_data.push(item.id);
      });
      let data = {
        f_id: this.perms.f_id,
        f_name: this.perms.f_name,
        f_perms: f_perms_data,
      };
      let res = await $ajax("permsGroupTogetPut", "put", data);
      if (!res) return false;
      console.log(res);
      let arr1 = this.d_perms_all;
      let arr2 = res.f_data_json.f_values[0].f_perms;
      let d_perms_all = Uniq(arr1, arr2);
      console.log(d_perms_all);
      let databasic = [],
        dataapp = [],
        dataweb = [],
        transpermsall = [];

      transpermsall = formatTreeDataEx(
        databasic,
        dataapp,
        dataweb,
        d_perms_all
      );

      console.log(transpermsall);
      this.data4.push(transpermsall[0]);
      this.data5.push(transpermsall[1]);
      this.data6.push(transpermsall[2]);
    },
    // 获取当前分组名称-》权限
    async getPermsGroupToget(data) {
      let res = await $ajax("permsGroupToget", "get", data);
      if (!res) return false;
      console.log(res);
      let arr1 = JSON.parse(localStorage.getItem("d_perms_all"));
      let arr2 = res.f_data_json.f_values[0].f_perms;
      console.log("arr1", arr1);
      console.log("arr2", arr2);
      let d_perms_all = Uniq(arr1, arr2);
      console.log(d_perms_all);
      let databasic = [],
        dataapp = [],
        dataweb = [],
        transpermsall = [];

      transpermsall = formatTreeDataEx(
        databasic,
        dataapp,
        dataweb,
        d_perms_all
      );

      console.log(transpermsall);
      this.data4.push(transpermsall[0]);
      this.data5.push(transpermsall[1]);
      this.data6.push(transpermsall[2]);
    },
    // 获取所有权限信息
    async getpermsinform() {
      let res = await $ajax("permsget", "get");
      if (!res) return false;
      console.log(res);
      this.d_perms_all = res.f_data_json.f_values;
      console.log("源数据", this.d_perms_all);
      localStorage.setItem("d_perms_all", JSON.stringify(this.d_perms_all));
    },
  },
  mounted() {
    // getTableData().then(res => {
    //   console.log(res)
    //   this.tableData = this.tableJson
    // })
    this.getdata();
    this.getpermsinform();
  },
};
</script>

<style lang="less" scoped>
.demo-split {
  height: calc(100% - 10px);
  border: 1px solid #dcdee2;
}

.demo-split-pane {
  padding: 10px;
}

.treeflex {
  display: flex;
  justify-content: space-between;

  > div {
    flex: 1 1 auto;
  }
}

.search-btn {
  margin-bottom: 10px;
}
</style>

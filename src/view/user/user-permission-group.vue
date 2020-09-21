<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane">
        <Card>
          <tables
            ref="tables"
            editable
            searchable
            search-place="top"
            v-model="tableData"
            :columns="columns"
            :title="title"
            :border="border"
            :height="height"
            :searchCol="searchCol"
            :pageTotal="pageTotal"
            :pageNum="pageNum"
            :arrsearch="arrsearch"
            :rowClassName="rowClassName"
            @onPageChage="onPageChage"
            @onPageSizeChage="onPageSizeChage"
            @onHandleSearch="onHandleSearch"
            @on-row-dblclick="onRowDblclick"
          />
        </Card>
      </div>
      <div slot="right" class="demo-split-pane">
        <span>权限分组：</span>
        <Transfer
          :data="data2"
          :target-keys="targetKeys1"
          :render-format="render1"
          @on-change="handleChange1"
          :titles="titles"
        ></Transfer>
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
  name: "user_permission_group",
  components: {
    Tables,
  },
  data() {
    return {
      split1: 0.4,
      columns: [
        {
          title: "用户名",
          key: "f_name",
        },
        {
          title: "手机号",
          key: "f_mobile",
        },
      ],
      arrsearch: [
        {
          title: "用户名",
          val: "",
          name: "f_name",
        },
      ],
      tableData: [],
      border: true,
      height: 450,
      searchCol: true,
      title: "分组名称添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      d_permsGroup_all: [], // 权限分组
      data2: [], //源数据
      targetKeys1: [], // 目的数据
      titles: ["源权限分组", "已选权限分组"],
      f_id: "", //用户id
      f_id_arr: [], //用户与分组绑定的f_id 集合
      selectRow: "",
    };
  },
  methods: {
    rowClassName(row, index) {
      // console.log(row)
      if (row.f_id == this.selectRow) {
        //随便挑个唯一变量比较
        return "addcolor"; //自己的css类名  iview文档table那块有几个现成的样式，建议写进公共样式里
      }
      return "";
    },
    render1(item) {
      return item.label;
    },
    async handleChange1(newTargetKeys, direction, moveKeys) {
      // console.log(newTargetKeys);
      // console.log(direction);
      // console.log(moveKeys);
      this.targetKeys1 = newTargetKeys;
      let str = JSON.stringify(newTargetKeys);
      if (!this.f_id) return Toast("请先双击用户，否则无效");
      if (direction == "right") {
        let res = await $ajax("togroupPost", "post", {
          f_user_id: this.f_id,
          f_group_id: newTargetKeys[0],
        });
        if (!res) return false;
        // console.log(res);
        Toast("添加成功！");
      } else {
        this.f_id_arr.forEach(async (item, index) => {
          if (item.f_group_id == moveKeys[0]) {
            let res = await $ajax("togroupPost", "delete", {
              f_id: item.f_id,
            });
            if (!res) return false;
            // console.log(res);
            Toast("删除成功！");
          }
        });
      }
    },
    // 双击行
    onRowDblclick(row, index) {
      console.log(row, index);
      this.selectRow = row.f_id;
      this.data2 = [];
      this.targetKeys1 = [];
      let data = {};
      data["f_user_id"] = row.f_id;
      this.f_id = row.f_id;
      this.getdatagroup(data);
      this.getpermsgroup();
    },
    // 获取页码
    onPageChage(pageNum) {
      // console.log(pageNum);
      let data = {};
      data["f_page"] = pageNum;
      this.pageNum = pageNum;
      this.getdata(data);
    },
    // 获取页数
    onPageSizeChage(pageSize) {
      // console.log(pageSize);
      let data = {};
      data["f_limit"] = pageSize;
      this.pageSize = pageSize;
      this.getdata(data);
    },
    // 搜索
    onHandleSearch(data) {
      // let shuxin = `f_${searchKey}`;
      // if (!searchValue) return false;
      // let data = {};
      // data[`${shuxin}`] = `${searchValue}`;
      console.log(data);
      this.getSearchData(data);
    },
    async getdata(data) {
      let res = await $ajax("userdataget", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;

      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_id: item.f_id,
          f_name: item.f_name,
          f_mobile: item.f_mobile,
        });
      });
      console.log(tableJson);
      this.tableData = tableJson;
    },
    // 获取用户=》权限分组的关系
    async getdatagroup(data) {
      let res = await $ajax("togroupGet", "get", data);
      if (!res) return false;
      console.log(res);

      if (res.f_data_json.f_values.length == 0) return false;
      let f_perms_groups = res.f_data_json.f_values;
      let targetkeyarr = [];
      f_perms_groups.forEach((item, index) => {
        targetkeyarr.push(item.f_group_id);
      });
      //用户与权限分组 f_id 的集合
      let f_id_arr = [];
      f_perms_groups.forEach((item, index) => {
        f_id_arr.push({
          f_id: item.f_id,
          f_group_id: item.f_group_id,
          f_groupname: item.f_groupname,
        });
      });
      this.targetKeys1 = targetkeyarr;
      console.log(targetkeyarr)
      this.f_id_arr = f_id_arr;
      // this.getpermsgroup();
    },
    // 搜索
    async getSearchData(data) {
      let res = await $ajax("togroupGet", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_id: item.id,
          f_name: item.f_name,
          f_mobile: item.f_mobile,
        });
      });
      this.tableData = tableJson;
    },

    // 获取所有权限分组
    async getpermsgroup() {
      let res = await $ajax("permsGroupsget", "get");
      if (!res) return false;
      console.log(res);
      this.d_permsGroup_all = res.f_data_json.f_values;
      let data1 = [];
      this.d_permsGroup_all.forEach((item, index) => {
        data1.push({
          key: item.f_id + "",
          label: item.f_name,
        });
      });
      this.data2 = data1;
      console.log(data1);
    },
  },
  mounted() {
    this.getdata();
    this.height = window.innerHeight - this.$refs.tables.$el.offsetTop - 270;
    console.log(this.height);
  },
};
</script>

<style lang="less" scoped>
.demo-split {
  height: calc(100% + 0px);
  border: 1px solid #dcdee2;
}

.demo-split-pane {
  padding: 20px;
}
/deep/ .ivu-transfer {
  // margin: 20px 10px 20px;
  margin: 20px 0;
  .ivu-transfer-list {
    width: 250px;
    height: 280px;
  }
}
</style>

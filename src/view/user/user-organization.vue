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
            :height="height"
            :border="border"
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
        <span>组织类型：</span>
        <Select v-model="model1" style="width:200px;margin-bottom:10px" @on-change="onhandlechange">
          <Option v-for="item in orgtypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Transfer
          :data="data2"
          :target-keys="targetKeys1"
          :render-format="render1"
          :titles="titles"
          @on-change="handleChange1"
          class="transfer"
        ></Transfer>
        <Button type="error" @click="savebtn">保存</Button>
      </div>
    </Split>
  </div>
</template>
<script>
import Tables from "_c/tables";

export default {
  components: {
    Tables,
  },
  data() {
    return {
      split1: 0.35,
      height:450,
      columns: [
        {
          title: "用户名",
          key: "f_name",
          resizable: true,
          width: 180,
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
      border: true,
      searchCol: true,
      tableData: [],
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      f_id: "",
      data2: [], //源数据
      targetKeys1: [], //目的数据
      titles: ["源组织名称", "已选组织名称"],
      model1: "",
      orgtypeList: [],
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
    //选择组织类型 -》 获取组织信息
    onhandlechange() {
      let data_f_OrgType_id = {};
      data_f_OrgType_id["f_OrgType_id"] = this.model1;
      this.getorganization(data_f_OrgType_id);
    },
    // 获取页码
    onPageChage(pageNum) {
      console.log(pageNum);
      let data = {};
      data["f_page"] = pageNum;
      data["f_limit"] = this.pageSize;
      this.pageNum = pageNum;
      this.getdata(data);
    },
    // 获取页数
    onPageSizeChage(pageSize) {
      console.log(pageSize);
      let data = {};
      data["f_limit"] = pageSize;
      this.pageSize = pageSize;
      this.getdata(data);
    },
    //搜索
    onHandleSearch(...obj) {
      let data = obj[0];
      console.log(data);
      this.getdata(data);
    },
    //双击
    onRowDblclick(row, index) {
      console.log(row, index);
      this.selectRow = row.f_id;
      let data = {};
      data["f_userid"] = row.f_id;
      this.getuserorg(data);
    },
    //获取 用户信息
    async getdata(data) {
      let res = await $ajax("userdataget", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      this.f_id = res.f_data_json.f_values[0].f_id;
      let data_f_id = {};
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_id: item.f_id,
          f_name: item.f_name,
          f_mobile: item.f_mobile,
          initRowIndex: index,
        });
      });
      this.tableData = tableJson;
      data_f_id["f_userid"] = this.f_id;
      console.log(data_f_id);
      this.getuserorg(data_f_id);
    },
    //获取 用户与组织架构的关系
    async getuserorg(data) {
      let res = await $ajax("userOrg", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let valuesarr = res.f_data_json.f_values;
      if (valuesarr.length > 0) {
        this.f_id = res.f_data_json.f_values[0].f_id;
        this.model1 = res.f_data_json.f_values[0].f_OrgType;
        let tableJson = [];
        res.f_data_json.f_values.forEach((item, index) => {
          tableJson.push(item.f_orgid);
        });
        console.log(tableJson);
        this.targetKeys1 = tableJson;
        // this.model1 = f_OrgType;
        console.log(this.model1);
        let data_f_OrgType_id = {};
        data_f_OrgType_id["f_OrgType_name"] = this.model1;
        this.getorganization(data_f_OrgType_id);
      } else {
        this.targetKeys1 = [];
        this.model1 = "";
      }
    },
    // 获取组织类型
    async getorgtype(data) {
      let res = await $ajax("systemtypeget", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      //   this.f_OrgType_id = res.f_data_json.f_values[0].f_id; //组织类型id
      //   let data_f_OrgType_id = {};
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          value: item.f_id,
          label: item.f_name,
        });
      });
      this.orgtypeList = tableJson;
      //   data_f_OrgType_id["f_OrgType_id"] = this.f_OrgType_id;
      //   this.getorganization(data_f_OrgType_id);
    },
    // 获取组织类型=》组织架构的关系
    async getorganization(data) {
      let res = await $ajax("organization", "get", data);
      if (!res) return false;
      console.log(res);
      if (res.f_data_json.f_values.length > 0) {
        let f_org = res.f_data_json.f_values;
        // let sortarr = this.sortArr(f_org);
        // console.log(sortarr);
        console.log(f_org);
        let data1 = [];
        f_org.forEach((item, index) => {
          data1.push({
            key: item.f_id,
            label: item.f_name,
          });
        });
        this.data2 = data1;
      } else {
        this.data2 = [];
      }
    },
    onSelectChange(domNode, index) {
      console.log(domNode, index);
    },
    render1(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);

      if (newTargetKeys.length == 1 && direction == "right") {
        this.targetKeys1 = newTargetKeys;
      } else if (direction == "right") {
        Toast("只能选择一个组织名称！");
      } else if (direction == "left") {
        // this.targetKeys1 = moveKeys;
        let data = { f_id: this.f_id };
        console.log(data);
        this.delete(data);
      }
    },
    //删除用户与组织的关系
    async delete(data) {
      let res = await $ajax("userOrg", "delete", data);
      if (!res) return false;
      console.log(res);
      Toast("删除成功");
      this.getdata();
    },
    async savebtn() {
      if (this.targetKeys1.length > 0) {
        let data = {};
        data["f_userid"] = this.f_id;
        data["f_orgid"] = this.targetKeys1[0];
        let res = await $ajax("userOrg", "post", data);
        if (!res) return false;
        console.log(res);
        Toast("保存成功");
      }
    },
  },
  mounted() {
    this.getdata();
    this.getorgtype();
    this.height = window.innerHeight - this.$refs.tables.$el.offsetTop - 300;
    console.log(this.height);
  },
};
</script>
<style lang="less" scoped>
.demo-split {
  height: calc(100%+0px);
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 20px;
}
/deep/ .ivu-transfer {
  // margin: 20px 10px 20px;
  margin-bottom: 20px;
  .ivu-transfer-list {
    width: 250px;
    height: 280px;
  }
}
</style>





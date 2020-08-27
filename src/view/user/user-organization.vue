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
            :border="border"
            :height="height"
            :searchCol="searchCol"
            :pageTotal="pageTotal"
            :pageNum="pageNum"
            :arrsearch="arrsearch"
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
          @on-change="handleChange1"
        ></Transfer>
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
      border: true,
      height: 450,
      searchCol: true,
      tableData: [],
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      f_id: "",
      data2: this.getMockData(),
      targetKeys1: this.getTargetKeys(),
    };
  },
  methods: {
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
    onRowDblclick() {},
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
          f_id: item.id,
          f_name: item.f_name,
          f_mobile: item.f_mobile,
          initRowIndex: index,
        });
      });
      this.tableData = tableJson;
      data_f_id["f_id"] = this.f_id;
    },
    onSelectChange(domNode, index) {
      console.log(domNode, index);
    },
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "Content " + i,
          description: "The desc of content  " + i,
          disabled: Math.random() * 3 < 1,
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map((item) => item.key);
    },
    render1(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);
      this.targetKeys1 = newTargetKeys;
    },
  },
  mounted() {
    this.getdata();
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
</style>





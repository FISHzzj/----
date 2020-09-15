<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        :evevtType="evevtType"
        :searchCol="searchCol"
        :label="label"
        :border="border"
        :pageTotal="pageTotal"
        :pageNum="pageNum"
        :getdate="getdate"
        @onPageChage="onPageChage"
        @onPageSizeChage="onPageSizeChage"
        @onHandleSearch="onHandleSearch"
      />
    </Card>
  </div>
</template>

<script>
import Tables from "_c/system-log-tables";
// import { getTableData } from '@/api/data'
export default {
  name: "system_event",
  components: {
    Tables,
  },
  data() {
    return {
      border: true,
      columns: [
        { title: "事件类型", key: "f_type", resizable: true, width: 180 },
        { title: "时间", key: "f_time", resizable: true, width: 180 },
        { title: "简短信息", key: "f_msg", resizable: true, width: 240 },
        { title: "详细信息", key: "f_detial" },
      ],
      evevtType: [
        { title: "所有", key: "all" },
        { title: "正常日志", key: "normal" },
        { title: "异常日志", key: "exception" },
        { title: "错误日志", key: "error" },
      ],
      label: "事件类型",
      tableData: [],
      searchCol: true,
      getdate: true,
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    // 搜索
    onHandleSearch(data) {
      console.log(data);
      this.getdata(data);
    },
    // 获取页码
    onPageChage(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      let data = {};
      data["pageNum"] = this.pageNum;
      this.getdata(data);
    },
    // 获取页数
    onPageSizeChage(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      let data = {};
      data["f_limit"] = this.pageSize;
      this.getdata(data);
    },
    //系统查询
    async getdata(data) {
      let res = await $ajax("event", "get", data);
      if (!res) return;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        if (item.f_type == "normal") {
          item.f_type = "正常日志";
        } else if (item.f_type == "exception") {
          item.f_type = "异常日志";
        } else if (item.f_type == "error") {
          item.f_type = "错误日志";
        }
        tableJson.push({
          f_id: item.f_id,
          f_type: item.f_type,
          f_time: item.f_time,
          initRowIndex: index,
          f_msg: item.f_msg,
          f_detial: item.f_detial,
        });
      });
      this.tableData = tableJson;
    },
  },
  mounted() {
    this.getdata();
  },
};
</script>

<style>
</style>

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
        :border="border"
        :pageTotal="pageTotal"
        :pageNum="pageNum"
        :getdate="getdate"
        :userName="userName"
        :userMobile="userMobile"
        :getUrl="getUrl"
        :label="label"
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
  name: "operation_log",
  components: {
    Tables,
  },
  data() {
    return {
      border: true,
      columns: [
        { title: "用户姓名", key: "f_user_cname",resizable: true, width: 100 },
        { title: "用户手机", key: "f_user_mobile",resizable: true, width: 120 },
        { title: "请求时间", key: "f_time",resizable: true, width: 120 },
        { title: "远端地址", key: "f_ipaddr",resizable: true, width: 120 },
        { title: "请求方法", key: "f_method", resizable: true, width: 100 },
        { title: "请求URL", key: "f_url", resizable: true, width: 320 },
        { title: "请求数据", key: "f_req_data", resizable: true, width: 420 },
        { title: "描述", key: "f_desc", resizable: true, width: 220 },
        { title: "原数据", key: "f_olddata", resizable: true, width: 420 },
        { title: "新数据", key: "f_newdata", resizable: true, width: 420 },
        { title: "返回结果", key: "f_errcode", resizable: true, width: 120 },
        { title: "失败信息", key: "f_errmsg", resizable: true, width: 120 },
      ],
      evevtType: [
        { title: "GET", key: "get" },
        { title: "POST", key: "post" },
      ],
      label: "请求方法",
      tableData: [],
      searchCol: true,
      getdate: true,
      userName: true,
      userMobile: true,
      getUrl: true,
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
    async getdata(data) {
      let res = await $ajax("operation", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        console.log(item.f_user_mobile)
        tableJson.push({
          f_user_cname: item.f_user_cname,
          f_user_mobile: item.f_user_mobile,
          f_time: item.f_time,
          f_ipaddr: item.f_ipaddr,
          f_method: item.f_method,
          f_url: item.f_url,
          f_req_data: item.f_req_data,
          f_desc: item.f_desc,
          f_olddata: item.f_olddata,
          f_newdata: item.f_newdata,
          f_errcode: item.f_errcode,
          f_errmsg: item.f_errmsg,
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

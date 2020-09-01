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
      />
    </Card>
  </div>
</template>

<script>
import Tables from "_c/system-log-tables";
// import { getTableData } from '@/api/data'
export default {
  name: "netword_request",
  components: {
    Tables,
  },
  data() {
    return {
      columns: [
        { title: "事件类型", key: "f_eventType" },
        { title: "用户手机", key: "f_mobile" },
        { title: "请求时间", key: "f_time" },
        { title: "远端地址", key: "f_ipaddr" },
        { title: "请求URL", key: "f_url" },
        { title: "返回时间", key: "f_res_time" },
      ],
      evevtType: [
        { title: "所有", key: "all" },
        { title: "GET", key: "get" },
        { title: "POST", key: "post" },
      ],
      tableData: [],
      arrsearch: [
        {
          title: "用户姓名",
          val: "",
          name: "f_username",
        },
        {
          title: "用户手机",
          val: "",
          name: "f_mobile",
        },
        {
          title: "请求URL",
          val: "",
          name: "f_url",
        },
        {
          title: "请求URL",
          val: "",
          name: "f_url",
        },
        {
          title:"请求URL",
          val:"",
          name:"f_url"
        }
      ],
    };
  },
  methods: {
    async getdata(data) {
      let res = await $ajax("loginlog", "get", {
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
          f_eventType: item.f_eventType,
          f_mobile: item.f_mobile,
          f_time: item.f_time,
          f_ipaddr: item.f_ipaddr,
          f_url: item.f_url,
          f_res_time: item.f_res_time,
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

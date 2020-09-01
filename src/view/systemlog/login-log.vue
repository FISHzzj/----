<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        border
        height="450"
        search-place="top"
        v-model="tableData"
        :columns="columns"
        :pageTotal="pageTotal"
        :pageNum="pageNum"
        :arrsearch="arrsearch"
      />
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
// import { getTableData } from '@/api/data'
export default {
  name: "login_log",
  components: {
    Tables,
  },
  data() {
    return {
      columns: [
        { title: "用户姓名", key: "f_username" },
        { title: "用户手机", key: "f_mobile" },
        { title: "登录登出", key: "f_type" },
        { title: "请求时间", key: "f_time" },
        { title: "远端地址", key: "f_ipaddr" },
        { title: "请求方法", key: "f_method " },
        { title: "请求URL", key: "f_url" },
        { title: "返回码", key: "f_errcode" },
        { title: "终端类型", key: "f_ttype" },
        { title: "登录方式", key: "f_ltype" },
        { title: "错误信息", key: "f_errmsg" },
      ],
      arrsearch:[ {
          title: "用户姓名",
          val: "",
          name: "f_username",
        },
        {
          title: "用户手机",
          val: "",
          name: "f_mobile",
        }],
      tableData: [],
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    async getloginlog(data) {
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
          f_username: item.f_username,
          f_mobile: item.f_mobile,
          f_type: item.f_type,
          f_time: item.f_time,
          f_ipaddr: item.f_ipaddr,
          f_method: item.f_method,
          f_url: item.f_url,
          f_errcode: item.f_errcode,
          f_ttype: item.f_ttype,
          f_ltype: item.f_ltype,
          f_errmsg: item.f_errmsg,
        });
      });
      this.tableData = tableJson;
    },
    // 获取页码
    onPageChage(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.getloginlog();
    },
    // 获取页数
    onPageSizeChage(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.getloginlog();
    },
    // 搜索
    onHandleSearch(...obj) {
      let data = obj[0];
      this.getSearchData(data);
    },
  },
  mounted() {
    this.getloginlog();
  },
};
</script>

<style>
</style>

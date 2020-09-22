<template>
  <div>
    <Card>
      <tables
        ref="tables"
        stripe
        search-place="top"
        v-model="tableData"
        :border="border"
        :columns="columns"
        :title="title"
        :pageTotal="pageTotal"
        :pageNum="pageNum"
        :height="height"
        @onPageChage="onPageChage"
        @onPageSizeChage="onPageSizeChage"
      />
    </Card>
  </div>
</template>
<script>
import Tables from "_c/tables";
export default {
  name: "traffic_record",
  components: {
    Tables,
  },
  data() {
    return {
      columns: [
        {
          title: "用户名",
          key: "f_username",
          resizable: true,
          width: 120,
        },
        {
          title: "用户编号",
          key: "f_uid",
          resizable: true,
          width: 120,
        },
        {
          title: "代理服务器照片路径",
          key: "f_PhotoPulling_proxy_filepath",
          resizable: true,
          width: 120,
        },
        {
          title: "照片提取状态",
          key: "f_PhotoPulling_pull_status",
          resizable: true,
          width: 120,
        },
        {
          title: "照片提取路径",
          key: "f_PhotoPulling_photo_path",
          resizable: true,
          width: 120,
        },
        {
          title: "关联认证设备名称",
          key: "f_AccessAuthDev_name",
          resizable: true,
          width: 120,
        },
        {
          title: "出入类型",
          key: "f_inout_type",
          resizable: true,
          width: 120,
        },
        {
          title: "认证方式",
          key: "f_auth_method",
          resizable: true,
          width: 120,
        },
        {
          title: "通行时间",
          key: "f_pass_time",
          resizable: true,
          width: 120,
        },
        {
          title: "有效期",
          key: "f_expire",
          resizable: true,
          width: 120,
        },
        {
          title: "温度",
          key: "f_temperature",
          resizable: true,
          width: 120,
        },
        {
          title: "操作",
          key: "handle",
          options: ["delete", "edit"],
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
                        type: "warning",
                        size: "small",
                        icon: "logo-tumblr",
                      },
                      style: {
                        marginRight: "10px",
                      },
                    },
                    "删除"
                  ),
                ]
              );
            },
            (h, params, vm) => {
              return h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "ios-build",
                  },
                  on: {
                    click: () => {
                      this.editshow(params);
                    },
                  },
                },
                "编辑"
              );
            },
          ],
        },
      ],
      tableData: [],
      title: "用户信息添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      border: true,
      height: 450,
    };
  },
  mounted() {
      this.getdata()
      this.height = window.innerHeight - this.$refs.tables.$el.offsetTop - 240;
  },
  methods: {
    // 获取页码
    onPageChage(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      let data = {};
      data["f_page"] = this.pageNum;
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
      let res = await $ajax("passrecord", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
            f_username: item.f_username,
            f_uid: item.f_uid,
            f_PhotoPulling_proxy_filepath: item.f_PhotoPulling_proxy_filepath,
            f_PhotoPulling_pull_status: item.f_PhotoPulling_pull_status,
            f_PhotoPulling_photo_path: item.f_PhotoPulling_photo_path,
            f_AccessAuthDev_name: item.f_AccessAuthDev_name,
            f_inout_type: item.f_inout_type,
            f_auth_method: item.f_auth_method,
            f_pass_time: item.f_pass_time,
            f_expire: item.f_expire,
            f_temperature: item.f_temperature,
        });
      });
      this.tableData = tableJson;
    },
  },
};
</script>
<style lang="less" scoped>
</style>
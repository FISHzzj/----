<template>
  <div>
    <Card>
      <tables
        ref="tables"
        searchable
        stripe
        search-place="top"
        v-model="tableData"
        :border="border"
        :addSearchBtn="addSearchBtn"
        :searchCol="searchCol"
        :columns="columns"
        :title="title"
        :pageTotal="pageTotal"
        :pageNum="pageNum"
        :addListArr="addListArr"
        :arrsearch="arrsearch"
        :height="height"
        @on-delete="handleDelete"
        @on-save-edit="handleSaveEdit"
        @onPageChage="onPageChage"
        @onPageSizeChage="onPageSizeChage"
        @onHandleSearch="onHandleSearch"
        @on-handle-from="onHandleFrom"
      />
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
export default {
  name: "user_information",
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
          title: "照片路径",
          key: "f_photo_path",
          resizable: true,
          width: 120,
        },
        {
          title: "认证设备名称",
          key: "f_AccessAuthDev_name",
          resizable: true,
          width: 120,
        },
        {
          title: "认证结果",
          key: "f_auth_result",
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
          title: "删除",
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
      tableJson: [],
      title: "用户信息添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      addSearchBtn: true,
      searchCol: true,
      border: true,
      addListArr: [
        {
          nametitle: "账号",
          key: "f_username",
          valuetext: "",
        },
        {
          nametitle: "用户名",
          key: "f_name",
          valuetext: "",
        },
        {
          nametitle: "手机号",
          key: "f_mobile",
          valuetext: "",
        },
        {
          nametitle: "用户类型",
          key: "f_type",
          valuetext: "",
        },
        {
          nametitle: "员工号",
          key: "f_emid",
          valuetext: "",
        },
        {
          nametitle: "昵称",
          key: "f_nickname",
          valuetext: "",
        },
        {
          nametitle: "性别",
          key: "f_sex",
          valuetext: "",
        },
        {
          nametitle: "生日",
          key: "f_birthday",
          valuetext: "",
        },
        {
          nametitle: "用户属性",
          key: "f_attribute",
          valuetext: "",
        },
        {
          nametitle: "头像",
          key: "f_img",
          valuetext: "",
        },
      ],
      arrsearch: [
        {
          title: "账号",
          val: "",
          name: "f_username",
        },
        {
          title: "用户名",
          val: "",
          name: "f_name",
        },
        {
          title: "手机号",
          val: "",
          name: "f_mobile",
        },
      ],
      height: 450,
      editfromshow: false,
      getEditData: {},
    };
  },
  methods: {
    // 新增 表单 确认btn
    async onHandleFrom(arrData) {
      let res = await $ajax("userDataAdd", "post", arrData);
      if (!res) return;
      this.getdata();
    },
    async handleSaveEdit(params) {
      // console.log(params)
      let data = {};
      data["f_id"] = params.id;
      data[`f_${params.column.key}`] = params[params.column.key];
      // 更新字段
      let res = await $ajax("userDataUpdate", "put", data);
      if (!res) return false;
      Toast("更新成功");
    },
    async handleDelete(params) {
      console.log(params);
      // 删除 row
      let res = await $ajax("userDataDelete", "delete", {
        f_id: params.row.id,
      });
      if (!res) return false;
      Toast("删除成功");
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
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
    onHandleSearch(...obj) {
      let data = obj[0];
      this.getSearchData(data);
    },
    async getdata() {
      let res = await $ajax("faceinaad", "get", {
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
          f_id: item.f_id,
          f_UserInfo_id: item.f_UserInfo_id,
          f_UserInfo_name: item.f_UserInfo_name,
          f_UserInfoEx_pic: item.f_UserInfoEx_pic,
          f_uid: item.f_uid,
          f_AccessAuthDev_id: item.f_AccessAuthDev_id,
          f_AccessAuthDev_name: item.f_AccessAuthDev_name,
          f_proc_result: item.f_proc_result,
          f_fail_info: item.f_fail_info,
          f_expire: item.f_expire,
        });
      });
      this.tableData = tableJson;
    },
    // 搜索
    async getSearchData(data) {
      let res = await $ajax("userdataget", "get", data);
      if (!res) return false;
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          id: item.id,
          username: item.f_username, // 账号
          name: item.f_name, // 用户名
          initRowIndex: index,
          mobile: item.f_mobile, // 手机号
          f_type: item.f_type, //用户类型
          createTime: item.f_join_time,
        });
      });
      this.tableData = tableJson;
    },
    // 编辑获取单条数据
    async getEditHandle(data) {
      let res = await $ajax("userdataget", "get", data);
      if (!res) return false;
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let formdata = [];
      res.f_data_json.f_values.forEach((item, index) => {
        formdata.push({
          f_id: item.f_id,
          f_username: item.f_username, // 账号
          f_name: item.f_name, // 用户名
          f_mobile: item.f_mobile, // 手机号
          f_type: item.f_type, //用户类型
          f_emid: item.f_emid,
          f_nickname: item.f_nickname,
          f_sex: item.f_sex,
          f_birthday: item.f_birthday,
          f_attribute: item.f_attribute,
          f_img: item.f_img,
        });
      });
      // console.log(formdata)
      this.getEditData = formdata[0];

      this.editfromshow = true;
    },
    // 编辑显示
    editshow(params) {
      // console.log(params)
      let data = {
        f_username: params.row.username,
      };
      this.getEditHandle(data);
      // console.log(res)
    },
    // 编辑保存
    async onHandleSave(data) {
      console.log(data);
      let res = await $ajax("userDataUpdate", "put", data);
      if (!res) return false;
      Toast("更新成功");
      this.editfromshow = false;
      this.getdata();
    },
    // 编辑 取消
    onHandleClose() {
      this.editfromshow = false;
    },
  },
  mounted() {
    this.getdata();
    this.height = window.innerHeight - this.$refs.tables.$el.offsetTop - 240;
    console.log(this.height);
  },
};
</script>

<style>
</style>

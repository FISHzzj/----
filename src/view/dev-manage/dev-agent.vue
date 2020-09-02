<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        stripe
        search-place="top"
        v-model="tableData"
        :border="border"
        :devaddBtn="devaddBtn"
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
        @on-agent-handle-from="onAgentHandleFrom"
      />
      <Editfrom
        v-if="editfromshow"
        @on-handle-save="onHandleSave"
        @on-handle-close="onHandleClose"
        :getEditData="getEditData"
      ></Editfrom>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import Editfrom from "_c/tables/editForm.vue";
export default {
  name: "dev_agent",
  components: {
    Tables,
    Editfrom,
  },
  data() {
    return {
      columns: [
        {
          title: "设备名称",
          key: "f_name",
        },
        {
          title: "设备类型",
          key: "f_type",
        },
        {
          title: "IP地址",
          key: "f_ip_addr",
        },
        {
          title: "端口",
          key: "f_port",
        },
        {
          title: "安装地址",
          key: "f_installnation_addr",
        },
        {
          title: "编码",
          key: "f_code",
        },
        {
          title: "联系人",
          key: "f_contact",
        },
        {
          title: "添加日期",
          key: "f_add_date",
        },
        {
          title: "关联组织",
          key: "f_linked_org",
        },
        {
          title: "拓展信息",
          key: "f_extense_info",
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
          editable: true,
        },
      ],
      tableData: [],
      title: "设备管理添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      devaddBtn: true,
      searchCol: true,
      border: true,
      addListArr: [
        {
          nametitle: "设备名称",
          key: "f_name",
          valuetext: "",
        },
        {
          nametitle: "设备类型",
          key: "f_type",
          valuetext: "",
        },
        {
          nametitle: "IP地址",
          key: "f_ip_addr",
          valuetext: "",
        },
        {
          nametitle: "端口",
          key: "f_port",
          valuetext: "",
        },
        {
          nametitle: "安装地址",
          key: "f_installnation_addr",
          valuetext: "",
        },
        {
          nametitle: "编码",
          key: "f_code",
          valuetext: "",
        },
        {
          nametitle: "联系人",
          key: "f_contact",
          valuetext: "",
        },
        {
          nametitle: "日期",
          key: "f_add_date",
          valuetext: "",
        },
        {
          nametitle: "扩展信息",
          key: "f_extense_info",
          valuetext: "",
        },
      ],
      arrsearch: [
        {
          title: "设备名称",
          val: "",
          name: "f_name",
        },
        {
          title: "设备类型",
          val: "",
          name: "f_type",
        },
        {
          title: "IP地址",
          val: "",
          name: "f_ip_addr",
        },
        {
          title: "安装地址",
          val: "",
          name: "f_installnation_addr",
        },
        {
          title: "编码",
          val: "",
          name: "f_code",
        },
        {
          title: "联系人",
          val: "",
          name: "f_contact",
        },
      ],
      height: 450,
      editfromshow: false,
      getEditData: {},
    };
  },
  methods: {
    // 新增 表单 确认btn
    async onAgentHandleFrom(arrData) {
        console.log(arrData)
      let res = await $ajax("devmanage", "post", arrData);
      if (!res) return;
      console.log(res)
    //   this.getdata();
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
      let res = await $ajax("devmanage", "get", {
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
            f_name: item.f_name,
            f_type: item.f_type,
            f_ip_addr: item.f_ip_addr,
            f_port: item.f_port,
            f_installnation_addr: item.f_installnation_addr,
            f_code: item.f_code,
            f_contact: item.f_contact,
            f_add_date: item.f_add_date,
            f_extense_info: item.f_extense_info
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
          f_id: item.id,
          f_username: item.f_username, // 账号
          f_name: item.f_name, // 用户名
          f_mobile: item.f_mobile, // 手机号
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
  },
};
</script>

<style>
</style>

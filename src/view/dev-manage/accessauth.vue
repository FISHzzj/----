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
        :devSelect="devSelect"
        @on-delete="handleDelete"
        @onPageChage="onPageChage"
        @onPageSizeChage="onPageSizeChage"
        @onHandleSearch="onHandleSearch"
        @on-agent-handle-from="onAgentHandleFrom"
      />
      <Editfrom
        v-if="editfromshow"
        :f_type="f_type"
        :f_aad_direction="f_aad_direction"
        @on-handle-save="onHandleSave"
        @on-handle-close="onHandleClose"
        :getEditData="getEditData"
      ></Editfrom>
      <Modal v-model="modal1" :title="titlemodal" @on-ok="ok" @on-cancel="cancel">
        <Card title="区域" style="height:450px; overflow-y:scroll;">
          <RadioGroup v-model="area" vertical size="large">
            <Radio
              :label="item.f_id"
              border
              v-for="(item, index) in areaArr"
              :key="item.f_id"
              :value="item.f_id"
            >{{item.f_name}}</Radio>
          </RadioGroup>
        </Card>
      </Modal>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import Editfrom from "_c/tables/editdevAgentForm.vue";
export default {
  name: "accessauth",
  components: {
    Tables,
    Editfrom,
  },
  data() {
    return {
      f_type:true,
      f_aad_direction:true,
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
          title: "设备出入",
          key: "f_aad_direction",
        },
        {
          title: "系统地址",
          key: "f_ip_addr",
        },
        {
          title: "系统端口",
          key: "f_port",
        },
        {
          title: "安装地址",
          key: "f_installnation_addr",
        },
        {
          title: "设备编码",
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
          title: "拓展信息",
          key: "f_extense_info",
        },
        {
          title: "设备与区域关系",
          key: "authregion",
          align: "center",
          width: 135,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small",
                  icon: "ios-build",
                },
                on: {
                  click: () => {
                    this.authregion(params);
                  },
                },
              },
              "绑定关系"
            );
          },
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
                        marginBottom: "5px",
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
      devSelect:true,
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
          nametitle: "设备出入",
          key: "f_aad_direction",
          valuetext: "",
        },
        {
          nametitle: "设备类型",
          key: "f_type",
          valuetext: "",
        },
        {
          nametitle: "系统地址",
          key: "f_ip_addr",
          valuetext: "",
        },
        {
          nametitle: "系统端口",
          key: "f_port",
          valuetext: "",
        },
        {
          nametitle: "安装地址",
          key: "f_installnation_addr",
          valuetext: "",
        },
        {
          nametitle: "设备编码",
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
          arrtype: [
            {
              id: 1,
              title: "人脸",
            },
            {
              id: 2,
              title: "IC卡",
            },
            {
              id: 3,
              title: "二维码",
            },
            {
              id: 4,
              title: "身份证",
            },
          ],
        },
        {
          title: "设备出入",
          val: "",
          name: "f_aad_direction",
          arrtype: [
            {
              id: 1,
              title: "出口",
            },
            {
              id: 2,
              title: "入口",
            },
          ],
        },
        {
          title: "系统地址",
          val: "",
          name: "f_ip_addr",
        },
        {
          title: "系统端口",
          val: "",
          name: "f_port",
        },
        {
          title: "安装地址",
          val: "",
          name: "f_installnation_addr",
        },
        {
          title: "设备编码",
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
      titlemodal: "设备与区域的关系",
      modal1: false,
      area: "",
      areaArr: [],
      f_id: "", //认证设备与组织的关系id
    };
  },
  methods: {
    //获取组织类型下“区域”的 组织架构
    async getorgtype() {
      let res = await $ajax("organization", "get", {
        f_OrgType_id: "8",
      });
      if (!res) return false;
      console.log(res);
      let f_values = res.f_data_json.f_values;
      let areaArr = [];
      f_values.forEach((item, index) => {
        areaArr.push({
          f_id: item.f_id,
          f_name: item.f_name,
        });
      });

      this.areaArr = areaArr;
    },
    // 获取  认证设备与区域型组织关系管理
    async authregion(params) {
      console.log(params);
      this.f_AccessAuthDev_id = params.row.f_id; //认证设备id
      this.modal1 = true;
      let dataaccessauthdev = {};
      dataaccessauthdev["f_AccessAuthDev_id"] = params.row.f_id;
      let res = await $ajax("aadtoorg", "get", dataaccessauthdev);
      if (!res) return false;
      console.log(res);
      let f_values = res.f_data_json.f_values;
      if (f_values.length == 0) return false;
      this.f_id = res.f_data_json.f_values[0].id; //认证设备与组织区域的关系id
      let f_Organization_id = res.f_data_json.f_values[0].f_Organization_id; //组织类型 区域id
      this.area = f_Organization_id.toString();
    },
    async ok() {
      if (!this.area) return Toast("请选择区域");
      if (this.f_id) {
        let data = {};
        data["f_id"] = this.f_id;
        data["f_Organization_id"] = this.area;
        let res = await $ajax("aadtoorg", "put", data);
        if (!res) return false;
        console.log(res);
        Toast("修改成功！");
        this.f_id = "";
        this.area = "";
      } else {
        let data = {};
        data["f_AccessAuthDev_id"] = this.f_AccessAuthDev_id; //认证设备id
        data["f_Organization_id"] = this.area;
        let res = await $ajax("aadtoorg", "post", data);
        if (!res) return false;
        console.log(res);
        Toast("保存成功！");
      }
      this.f_id = "";
      this.area = "";
    },
    cancel() {
      this.f_id = "";
      this.area = "";
    },
    // 新增 表单 确认btn
    async onAgentHandleFrom(arrData) {
      console.log(arrData);
      let res = await $ajax("accessauth", "post", arrData);
      if (!res) return;
      console.log(res);
      this.getdata();
    },
    async handleDelete(params) {
      console.log(params);
      // 删除 row
      let res = await $ajax("accessauth", "delete", {
        f_id: params.row.f_id,
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
      console.log(data);
      this.getSearchData(data);
    },
    async getdata() {
      let res = await $ajax("accessauth", "get", {
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
          f_name: item.f_name,
          f_type: item.f_type,
          f_aad_direction: item.f_aad_direction,
          f_ip_addr: item.f_ip_addr,
          f_port: item.f_port,
          f_installnation_addr: item.f_installnation_addr,
          f_code: item.f_code,
          f_contact: item.f_contact,
          f_add_date: item.f_add_date,
          f_extense_info: item.f_extense_info,
        });
      });
      this.tableData = tableJson;
    },
    // 搜索
    async getSearchData(data) {
      let res = await $ajax("accessauth", "get", data);
      if (!res) return false;
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_name: item.f_name,
          f_type: item.f_type,
          f_aad_direction: item.f_aad_direction,
          f_ip_addr: item.f_ip_addr,
          f_port: item.f_port,
          f_installnation_addr: item.f_installnation_addr,
          f_code: item.f_code,
          f_contact: item.f_contact,
          f_add_date: item.f_add_date,
          f_extense_info: item.f_extense_info,
        });
      });
      this.tableData = tableJson;
    },
    // 编辑获取单条数据
    async getEditHandle(data) {
      let res = await $ajax("accessauth", "get", data);
      if (!res) return false;
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let formdata = [];
      res.f_data_json.f_values.forEach((item, index) => {
        formdata.push({
          f_id: item.f_id,
          f_name: item.f_name,
          f_type: item.f_type,
          f_aad_direction: item.f_aad_direction,
          f_ip_addr: item.f_ip_addr,
          f_port: item.f_port,
          f_installnation_addr: item.f_installnation_addr,
          f_code: item.f_code,
          f_contact: item.f_contact,
          f_add_date: item.f_add_date,
          f_extense_info: item.f_extense_info,
        });
      });
      console.log(formdata);
      this.getEditData = formdata[0];

      this.editfromshow = true;
    },
    // 编辑显示
    editshow(params) {
      console.log(params);
      let data = {
        f_name: params.row.f_name,
      };
      this.getEditHandle(data);
      // console.log(res)
    },
    // 编辑保存
    async onHandleSave(data) {
      console.log(data);
      let res = await $ajax("accessauth", "put", data);
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
    this.getorgtype();
    this.height = window.innerHeight - this.$refs.tables.$el.offsetTop - 320;
    console.log(this.height);
    // this.$store.commit({
    //   type: "changeFType",
    //   f_type: false,
    //   f_aad_direction: false,
    // });
  },
};
</script>

<style>
</style>

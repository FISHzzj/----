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
      <Modal v-model="modal1" title="代理服务器与组织类型(区域)的关系" @on-ok="ok" @on-cancel="cancel">
        <Tree :data="data4" @on-select-change="onSelectChange"></Tree>
      </Modal>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import Editfrom from "_c/tables/editdevAgentForm.vue";
import { toTreeData } from "../../func/dev.js";
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
          title: "拓展信息",
          key: "f_extense_info",
        },
        {
          title: "代理设备与区域型组织关系",
          key: "relationship",
          align: "center",
          width: 150,
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
                    this.relationship(params);
                  },
                },
              },
              "绑定关系"
            );
          },
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
          title: "IP地址",
          val: "",
          name: "f_ip_addr",
        },
        {
          title: "端口",
          val: "",
          name: "f_port",
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
      modal1: false,
      data4: [
        {
          title: "parent 1",
          expand: true,
          selected: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                  disabled: true,
                },
                {
                  title: "leaf 1-1-2",
                },
              ],
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                  checked: true,
                },
                {
                  title: "leaf 1-2-1",
                },
              ],
            },
          ],
        },
      ],
      f_ProxyServerInfo_id: "", //代理设备id
      f_Organization_id: "", //组织id
      proxytoorgid: "", //已经选中的组织id
      aadtoorgId: "", //认证设备与区域型组织关系id
    };
  },
  methods: {
    // async serverauth() {
    //   let res = await $ajax("proxyservermanage", "post", arrData);
    //   if (!res) return;
    //   console.log(res);
    // },
    // 新增 表单 确认btn
    async onAgentHandleFrom(arrData) {
      console.log(arrData);
      let res = await $ajax("proxyservermanage", "post", arrData);
      if (!res) return;
      console.log(res);
      this.getdata();
    },
    async handleDelete(params) {
      console.log(params);
      // 删除 row
      let res = await $ajax("proxyservermanage", "delete", {
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
      let res = await $ajax("proxyservermanage", "get", {
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
      let res = await $ajax("proxyservermanage", "get", data);
      if (!res) return false;
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_name: item.f_name,
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
      let res = await $ajax("proxyservermanage", "get", data);
      if (!res) return false;
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let formdata = [];
      res.f_data_json.f_values.forEach((item, index) => {
        formdata.push({
          f_id: item.f_id,
          f_name: item.f_name,
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
      let res = await $ajax("proxyservermanage", "put", data);
      if (!res) return false;
      Toast("更新成功");
      this.editfromshow = false;
      this.getdata();
    },
    // 编辑 取消
    onHandleClose() {
      this.editfromshow = false;
    },
    //关系btn
    async relationship(params) {
      console.log(params);
      this.f_ProxyServerInfo_id = params.row.f_id; //代理设备id
      this.modal1 = true;
      // 获取已经绑定代理设备的组织id
      let dataproxytoorg = {};
      dataproxytoorg["f_ProxyServerInfo_id"] = params.row.f_id;
      let resproxytoorg = await $ajax("proxytoorg", "get", dataproxytoorg);
      if (!resproxytoorg) return false;
      console.log(resproxytoorg);
      let proxytoorgvalues = resproxytoorg.f_data_json.f_values;
      // let proxytoorgarr = [];
      proxytoorgvalues.forEach((item, index) => {
        this.proxytoorgid = item.f_Organization_id;
        this.aadtoorgId = item.id; //	认证设备与区域型组织关系id
      });
      console.log(this.proxytoorgid);
      console.log(this.aadtoorgId);
      //获取组织类型下 的 区域的组织架构名称
      let data = {
        f_OrgType_id: "8",
      };
      this.getorganization(data);
    },
    // 获取组织类型=》组织架构的关系
    async getorganization(data) {
      let res = await $ajax("organization", "get", data);
      if (!res) return false;
      console.log(res);
      if (res.f_data_json.f_values.length > 0) {
        let f_values = res.f_data_json.f_values;
        f_values.forEach((item, index) => {
          if (item.f_id == this.proxytoorgid) {
            f_values[index]["selected"] = true;
          }
        });

        let f_org = res.f_data_json.f_values;
        let attr = {
          id: "f_id",
          parendId: "f_Organization_id",
          name: "f_name",
          rootId: null,
        };

        let tree = toTreeData(f_org, attr);
        console.log("tree", tree);
        this.data4 = tree;
      }
    },
    onSelectChange(params, index) {
      console.log(params, index);
      this.f_Organization_id = index.id;
    },
    async ok() {
      // this.$Message.info("Clicked ok");
      let data = {};
      data["f_Organization_id"] = this.f_Organization_id;
      data["f_ProxyServerInfo_id"] = this.f_ProxyServerInfo_id;
      if (!this.f_Organization_id) return Toast("请选择区域！");
      if (this.aadtoorgId) {
        data["f_id"] = this.aadtoorgId;
        let res = await $ajax("proxytoorg", "put", data);
        if (!res) return false;
        console.log(res);
        Toast("修改成功！");
        this.aadtoorgId = " ";
      } else {
        let res = await $ajax("proxytoorg", "post", data);
        if (!res) return false;
        console.log(res);
        Toast("绑定成功！");
      }
    },
    cancel() {
      this.proxytoorgid = "";
      this.aadtoorgId = "";
      // console.log(this.proxytoorgid);
      // console.log(this.aadtoorgId)
      this.$Message.info("Clicked cancel");
    },
  },
  mounted() {
    this.getdata();
    this.height = window.innerHeight - this.$refs.tables.$el.offsetTop - 290;
    console.log(this.height);
    // this.$store.commit({
    //   type: "changeFType",
    //   f_type: true,
    //   f_aad_direction: true,
    // });
  },
};
</script>

<style lang="less" scoped>
/deep/ .ivu-modal-body {
  height: 500px;
  overflow-y: scroll;
}
</style>



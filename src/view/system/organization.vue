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
            :title="title"
            :pageTotal="pageTotal"
            :pageNum="pageNum"
            :arrsearch="arrsearch"
            :height="height"
            :border="border"
            :searchCol="searchCol"
            @onPageChage="onPageChage"
            @onPageSizeChage="onPageSizeChage"
            @onHandleSearch="onHandleSearch"
            @on-row-dblclick="onRowDblclick"
          />
        </Card>
      </div>
      <div slot="right" class="demo-split-pane">
        <Button type="primary" @click="addorg" v-if="addorgshow">添加组织名称</Button>
        <Modal v-model="modal1" :title="modelTitle" @on-ok="ok" @on-cancel="cancel">
          <div>
            <Input v-model="value11">
              <span slot="prepend">组织名称</span>
            </Input>
          </div>
        </Modal>
        <Card shadow style="height: 100%;width: 100%;overflow:hidden">
          <div class="department-outer">
            <div class="zoom-box">
              <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
            </div>
            <div class="view-box">
              <org-view
                v-if="data"
                :data="data"
                :zoom-handled="zoomHandled"
                @on-menu-click="handleMenuClick"
              ></org-view>
            </div>
          </div>
        </Card>
      </div>
    </Split>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { toTreeData } from "../../func/org.js";
import OrgView from "./components/org-view.vue";
import ZoomController from "./components/zoom-controller.vue";
import "./index.less";
const menuDic = {
  edit: "编辑组织",
  detail: "查看组织",
  new: "新增子组织",
  delete: "删除组织",
};
export default {
  name: "organization",
  components: {
    Tables,
    OrgView,
    ZoomController,
  },
  data() {
    return {
      split1: 0.35,
      columns: [
        {
          title: "编号",
          key: "f_id",
        },
        {
          title: "组织类型",
          key: "f_name",
        },
      ],
      arrsearch: [
        {
          title: "组织类型",
          val: "",
          name: "f_name",
        },
      ],
      tableData: [],
      border: true,
      height: 450,
      searchCol: true,
      title: "分组名称添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      data: {
        // children: [
        //   {
        //     children: [
        //       {
        //         id: 5,
        //         label: "研发-前端",
        //       },
        //       {
        //         id: 6,
        //         label: "研发-后端",
        //       },
        //       {
        //         id: 9,
        //         label: "UI设计",
        //       },
        //       {
        //         id: 10,
        //         label: "产品经理",
        //       },
        //     ],
        //     id: 2,
        //     label: "产品研发部",
        //   },
        //   {
        //     children: [
        //       {
        //         id: 7,
        //         label: "销售一部",
        //       },
        //       {
        //         id: 8,
        //         label: "销售二部",
        //       },
        //     ],
        //     id: 3,
        //     label: "销售部",
        //   },
        // ],
        // id: 0,
        // label: "XXX科技有限公司",
      },
      zoom: 100,
      modal1: false,
      value11: "",
      addorgshow: false,
      f_OrgType_id: "", //组织类型id
      f_Organization_id: "", // 父级id
      edit1: "",
      f_id: "", //用于编辑的f_id
      timer: null, //d定时器
      modelTitle: "添加组织名称",
    };
  },
  computed: {
    zoomHandled() {
      return this.zoom / 100;
    },
    // newdataList: function () {
    //   return this.sortKey(this.f_Organization_id, "f_Organization_id");
    // },
  },
  methods: {
    // 新增 组织名称
    async ok() {
      if (this.edit1 == "edit") {
        let data1 = {};
        data1["f_id"] = this.f_id;
        data1["f_name"] = this.value11;
        this.edit(data1);
        this.edit1 = "";
        this.value11 = "";
      } else {
        if (!this.f_OrgType_id) return false;
        if (!this.value11) return false;
        let data = {};
        data["f_name"] = this.value11;
        data["f_OrgType_id"] = this.f_OrgType_id; //组织类型id
        if (this.f_Organization_id) {
          data["f_Organization_id"] = this.f_Organization_id; //父级组织
        }
        let res = await $ajax("organization", "post", data);
        if (!res) return false;
        console.log(res);
        Toast("新增成功");
        this.value11 = "";
        let data1 = {};
        data1["f_OrgType_id"] = this.f_OrgType_id; //组织类型id
        this.getorganization(data1);
      }
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    // 添加组织架构顶级
    addorg(data) {
      
      this.edit1 = data;
      if (data == "edit") {
        this.modelTitle = "编辑组织名称";
      } else {
        this.modelTitle = "添加组织名称";
      }

      this.modal1 = true;
    },
    setDepartmentData(data) {
      data.isRoot = true;
      return data;
    },
    handleMenuClick({ data, key }) {
      console.log(data, key);
      if (key == "new") {
        this.modal1 = true;
        this.f_Organization_id = data.id; //父级组织id
      } else if (key == "edit") {
        this.f_id = data.id;
        this.addorg("edit");
      } else if (key == "delete") {
        let data1 = {};
        data1["f_id"] = data.id;
        this.delete(data1);
      }
    },
    getDepartmentData() {
      getOrgData().then((res) => {
        const { data } = res;
        this.data = data;
      });
    },
    // 双击行
    onRowDblclick(row, index) {
      console.log(row, index);
      let data = {};
      data["f_OrgType_id"] = row.f_id;
      this.f_OrgType_id = row.f_id;
      this.getorganization(data);
    },
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
    // 搜索
    onHandleSearch(data) {
      console.log(data);
      this.getSearchData(data);
    },
    async getdata(data) {
      let res = await $ajax("systemtypeget", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      this.f_OrgType_id = res.f_data_json.f_values[0].f_id; //组织类型id
      let data_f_OrgType_id = {};
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_id: item.f_id,
          f_name: item.f_name,
          initRowIndex: index,
        });
      });
      this.tableData = tableJson;
      data_f_OrgType_id["f_OrgType_id"] = this.f_OrgType_id;
      this.getorganization(data_f_OrgType_id);
    },
    // 获取组织类型=》组织架构的关系
    async getorganization(data) {
      let res = await $ajax("organization", "get", data);
      if (!res) return false;
      console.log(res);
      if (res.f_data_json.f_values.length > 0) {
        this.addorgshow = false; //隐藏btn
        let f_org = res.f_data_json.f_values;
        let attr = {
          id: "f_id",
          parendId: "f_Organization_id",
          name: "f_name",
          rootId: null,
        };

        let tree = toTreeData(f_org, attr);
        console.log("tree", tree);
        this.data = tree[0];
      } else {
        this.addorgshow = true;
        this.data = null;
      }
    },
    // 搜索
    async getSearchData(data) {
      let res = await $ajax("systemtypeget", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_id: item.f_id,
          f_name: item.f_name,
          initRowIndex: index,
        });
      });
      this.tableData = tableJson;
    },
    //删除
    async delete(data) {
      let res = await $ajax("organization", "delete", data);
      if (!res) return false;
      console.log(res);
      Toast("删除成功!");
      let data1 = {};
      data1["f_OrgType_id"] = this.f_OrgType_id; //组织类型id
      this.getorganization(data1);
    },
    //编辑data
    async edit(data) {
      let res = await $ajax("organization", "put", data);
      if (!res) return false;
      console.log(res);
      Toast("编辑成功");
      let data1 = {};
      data1["f_OrgType_id"] = this.f_OrgType_id; //组织类型id
      this.getorganization(data1);
    },
    //排序
    compare(property, desc) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if (desc == true) {
          // 升序排列
          return value1 - value2;
        } else {
          // 降序排列
          return value2 - value1;
        }
      };
    },
  },
  mounted() {
    this.getdata();
    // this.delete()
    this.height = window.innerHeight - this.$refs.tables.$el.offsetTop - 260;
    console.log(this.height);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="less" scoped>
.demo-split {
  height:calc(100% + 0px);
  border: 1px solid #dcdee2;
}

.demo-split-pane {
  padding: 10px;
  height: 100%;
}
</style>

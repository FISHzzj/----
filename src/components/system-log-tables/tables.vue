<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
      <div class="getTime" v-show="userName">
        <span>用户姓名：</span>
        <Input placeholder="输入用户姓名" class="search-input" v-model="formvalue.f_user_cname" />
      </div>
      <div class="getTime" v-show="userMobile">
        <span>用户手机：</span>
        <Input placeholder="输入用户手机" class="search-input" v-model="formvalue.f_user_mobile" />
      </div>
      <div class="getTime" v-show="getUrl">
        <span>请求URL：</span>
        <Input placeholder="输入关键字搜索" class="search-input" v-model="formvalue.f_url" />
      </div>
      <div class="getTime" v-show="getdate">
        <span>请求时间：</span>
        <DatePicker type="datetimerange" placeholder="请选择请求时间" v-model="formvalue.f_time"></DatePicker>
      </div>
      <div class="getTime" v-if="searchCol">
        <span>{{label}}：</span>
        <Select v-model="formvalue.f_type" class="search-col">
          <Option
            v-for="item in evevtType"
            :value="item.key"
            :key="`search-col-${item.key}`"
          >{{ item.title }}</Option>
        </Select>
      </div>
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>

    <div class="pageshow">
      <Page
        size="small"
        show-elevator
        show-sizer
        :total="pageTotal"
        :current="page.index"
        :page-size="page.size"
        @on-change="onChange"
        @on-page-size-change="onPageSizeChange"
      />
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
import TablesEdit from "./edit.vue";
import handleBtns from "./handle-btns";
import "./index.less";
export default {
  name: "Tables",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    size: String,
    width: {
      type: [Number, String],
    },
    // height: {
    //   type: [Number, String],
    // },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    highlightRow: {
      type: Boolean,
      default: false,
    },
    rowClassName: {
      type: Function,
      default() {
        return "";
      },
    },
    context: {
      type: Object,
    },
    noDataText: {
      type: String,
    },
    noFilteredDataText: {
      type: String,
    },
    disabledHover: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: "top",
    },
    /**
     * @description Modal对话框 标题 title
     */
    title: {
      type: String,
      default: "自定义标题",
    },
    /**
     * @description 总页数
     */
    pageTotal: {
      type: Number,
      default: 50,
    },
    /**
     * @description 页码
     */
    pageNum: {
      type: Number,
      default: 1,
    },
    /**
     * @description 是否显示新增按钮
     */
    addSearchBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否显示下拉列表框
     */
    searchCol: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 事件类型
     */
    evevtType: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * @description 是否显示搜索框
     */
    searchValueIf: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否显示用户姓名框
     */
    userName: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否显示用户手机框
     */
    userMobile: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否显示请求URL框
     */
    getUrl: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    /**
     * @description 是否显示模块类型
     */
    modular: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否显示时间类型
     */
    getdate: {
      type: Boolean,
      default: false,
    },
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data() {
    return {
      height:450,
      insideColumns: [],
      insideTableData: [],
      edittingCellId: "",
      edittingText: "",
      searchValue: "",
      modal1: false,
      page: {
        index: 1,
        size: 10,
        total: 50,
      },
      formvalue: {
        f_user_cname: "",
        f_user_mobile: "",
        f_url: "",
        f_time: "",
        f_type: "",
      },
    };
  },
  methods: {
    suportEdit(item, index) {
      // console.log(item)
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable,
          },
          on: {
            input: (val) => {
              this.edittingText = val;
            },
            "on-start-edit": (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`;
              this.$emit("on-start-edit", params);
            },
            "on-cancel-edit": (params) => {
              this.edittingCellId = "";
              this.$emit("on-cancel-edit", params);
            },
            "on-save-edit": (params) => {
              this.value[params.row.initRowIndex][
                params.column.key
              ] = this.edittingText;
              this.$emit("input", this.value);
              this.$emit(
                "on-save-edit",
                Object.assign(params, {
                  [params.column.key]: this.edittingText,
                  id: params.row.id,
                })
              );
              this.edittingCellId = "";
            },
          },
        });
      };
      return item;
    },
    surportHandle(item) {
      let options = item.options || [];
      let insideBtns = [];
      options.forEach((item) => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item]);
      });
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns;
      item.render = (h, params) => {
        params.tableData = this.value;
        return h(
          "div",
          btns.map((item) => item(h, params, this))
        );
      };
      return item;
    },
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item;
        if (res.editable) res = this.suportEdit(res, index);
        if (res.key === "handle") res = this.surportHandle(res);
        return res;
      });
    },
    setDefaultSearchKey() {
      // this.searchKey =
      //   this.columns[0].key !== "handle"
      //     ? this.columns[0].key
      //     : this.columns.length > 1
      //     ? this.columns[1].key
      //     : "";
      // console.log(this.searchKey)
    },
    // handleClear(e) {
    //   if (e.target.value === "") this.insideTableData = this.value;
    // },
    handleSearch() {
      let obj = {};
      let formvalue = this.formvalue;
      Object.keys(formvalue).forEach((key) => {
        if (formvalue[key]) {
          obj[key] = formvalue[key];
        }
      });
      console.log(obj);
      this.$emit("onHandleSearch", obj);
    },
    handleTableData() {
      this.insideTableData = this.value.map((item, index) => {
        let res = item;
        res.initRowIndex = index;
        return res;
      });
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params);
    },
    clearCurrentRow() {
      this.$refs.talbesMain.clearCurrentRow();
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("on-current-change", currentRow, oldCurrentRow);
    },
    onSelect(selection, row) {
      this.$emit("on-select", selection, row);
    },
    onSelectCancel(selection, row) {
      this.$emit("on-select-cancel", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    onFilterChange(row) {
      this.$emit("on-filter-change", row);
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status);
    },
    //新增row
    ok() {
      // this.$Message.info('Clicked ok');
      let arrlist = this.arrColumns;
      console.log(arrlist);
      let data = {};
      arrlist.forEach((item, index) => {
        if (item.valuetext == " ") {
          this.$Message.info(`${item.nametitle}不能为空`);
          return false;
        } else {
          let title = item.nametitle.toLowerCase();
          data[title] = item.valuetext;
        }
      });

      console.log(Object.keys(data).length == arrlist.length);
      if (Object.keys(data).length == arrlist.length) {
        // let res = await $ajax('addNew', data)
        // if(!res) false
        Toast("提交成功");
      }
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    //获取页码
    onChange(pageNum) {
      // console.log(pageNum)
      this.page.index = pageNum;
      this.$emit("onPageChage", pageNum);
    },
    //获取页数
    onPageSizeChange(pageSize) {
      // this.page.size = pageSize
      this.$emit("onPageSizeChage", pageSize);
    },
  },
  computed: {
    arrColumns() {
      let arrColumns = [];
      this.insideColumns.map((item, index) => {
        if (this.insideColumns.length - 2 > index)
          arrColumns.push({
            nametitle: item.title,
            valuetext: " ",
          });
      });
      return arrColumns;
    },
  },
  watch: {
    columns(columns) {
      console.log(columns);
      this.handleColumns(columns);
      // this.setDefaultSearchKey();
    },
    value(val) {
      this.handleTableData();
      // if (this.searchable) this.handleSearch();
    },
  },
  mounted() {
    this.handleColumns(this.columns);
    // this.setDefaultSearchKey();
    this.handleTableData();
    this.height = window.innerHeight - this.$refs.tablesMain.$el.offsetTop - 160;
    console.log(window.innerHeight)
    console.log(this.$refs.tablesMain.$el.offsetTop)
  },
};
</script>

<style lang="less" scoped>
.getTime {
  // padding: 10px 10px;
  // margin-bottom: 10px;
  margin: 10px 10px 0 10px;
  display: inline-block;
  span {
    margin-right: 10px;
  }
}
</style>



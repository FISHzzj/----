<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
      <!-- <Select v-model="searchKey" class="search-col" v-if="searchCol">
        <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>-->
      <div v-for="(item, index) in arrsearch" :key="index">
        <div v-if="item.name=='f_type' || item.name=='f_aad_direction'">
          <span style="width:70px;display:inline-block;">{{item.title}}：</span>
          <Select v-model="item.val"  class="search-col">
            <Option v-for="itemkey in item.arrtype" :value="itemkey.title" :key="itemkey.id">{{ itemkey.title }}</Option>
          </Select>
        </div>
        <div v-else>
          <span style="width:70px;display:inline-block;">{{item.title}}：</span>
          <Input placeholder="输入关键字搜索" class="search-input" v-model="item.val" />
        </div>
      </div>
      <Button @click="handleSearch" class="search-btn" type="success" icon="ios-search">搜索</Button>
      <Button
        class="search-btn"
        type="primary"
        icon="ios-add"
        @click="addBtn"
        v-if="addSearchBtn"
      >新增</Button>
      <Button class="search-btn" type="primary" icon="ios-add" @click="permBtn" v-if="permaddBtn">新增</Button>
      <Button class="search-btn" type="primary" icon="ios-add" @click="typeBtn" v-if="typeaddBtn">新增</Button>
      <Button class="search-btn" type="primary" icon="ios-add" @click="devBtn" v-if="devaddBtn">新增</Button>
      <Button
        class="search-btn"
        type="info"
        icon="md-refresh"
        @click="Resetbtn"
        v-if="permsReset"
      >重置</Button>
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
    <Form v-if="fromshow" @on-handle-save="onHandleSave" @on-handle-close="onHandleClose"></Form>
    <permForm
      v-if="permfromshow"
      @on-handle-save="onPermHandleSave"
      @on-handle-close="onPermHandleClose"
    ></permForm>
    <systemTypeForm
      v-if="systemTypefromshow"
      @on-handle-save="onTypeHandleSave"
      @on-handle-close="onTypeHandleClose"
    ></systemTypeForm>
    <devAgentForm
      v-if="devAgentfromshow"
      @on-handle-save="onAgentHandleSave"
      @on-handle-close="onAgentHandleClose"
    ></devAgentForm>
  </div>
</template>

<script>
import TablesEdit from "./edit.vue";
import handleBtns from "./handle-btns";
import "./index.less";
import Form from "./form.vue";
import permForm from "./permForm.vue";
import systemTypeForm from "./systemTypeForm.vue";
import devAgentForm from "./devAgentForm.vue";
export default {
  name: "Tables",
  components: {
    Form,
    permForm,
    systemTypeForm,
    devAgentForm,
  },
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
    height: {
      type: [Number, String],
    },
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
    permaddBtn: {
      type: Boolean,
      default: false,
    },
    typeaddBtn: {
      type: Boolean,
      default: false,
    },
    devaddBtn: {
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
     * @description 是否显示重置按钮
     */
    permsReset: {
      type: Boolean,
      default: false,
    },
    addListArr: {
      type: Array,
      default() {
        return [];
      },
    },
    arrsearch: {
      type: Array,
      default() {
        return [];
      },
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
      insideColumns: [],
      insideTableData: [],
      edittingCellId: "",
      edittingText: "",
      searchValue: "",
      searchKey: "",
      page: {
        index: 1,
        size: 10,
        total: 50,
      },
      fromshow: false,
      permfromshow: false,
      systemTypefromshow: false,
      devAgentfromshow: false,
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
      this.searchKey =
        this.columns[0].key !== "handle"
          ? this.columns[0].key
          : this.columns.length > 1
          ? this.columns[1].key
          : "";
      // console.log(this.searchKey)
    },
    handleClear(e) {
      if (e.target.value === "") this.insideTableData = this.value;
    },
    handleSearch() {
      console.log(this.arrsearch);
      let obj = {};
      this.arrsearch.forEach((item, index) => {
        if (item.name == "f_mobile" && item.val !== "") {
          if (!/^1[3456789]\d{9}$/.test(item.val)) {
            return Toast("手机号格式不正确");
          }
        }
        obj[`${item.name}`] = item.val;
      });

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
    // 获取页码
    onChange(pageNum) {
      // console.log(pageNum)
      this.page.index = pageNum;
      this.$emit("onPageChage", pageNum);
    },
    // 获取页数
    onPageSizeChange(pageSize) {
      // this.page.size = pageSize
      this.$emit("onPageSizeChage", pageSize);
    },
    // 新增btn
    addBtn() {
      this.fromshow = true;
    },
    permBtn() {
      this.permfromshow = true;
    },
    typeBtn() {
      this.systemTypefromshow = true;
    },
    devBtn() {
      this.devAgentfromshow = true;
    },
    // 重置按钮
    Resetbtn() {
      this.$emit("onResetBtn", "重置系统默认权限分组");
    },
    // 新增  关闭表单 用户信息
    onHandleClose() {
      this.fromshow = false;
    },
    // 新增 保存 表单 用户信息
    onHandleSave(formValidate) {
      console.log(formValidate);
      if (!formValidate) return false;
      this.$emit("on-handle-from", formValidate);
      this.fromshow = false;
    },
    // 新增  关闭表单  权限分组
    onPermHandleClose() {
      this.permfromshow = false;
    },
    // 新增 保存 表单 权限分组
    onPermHandleSave(formValidate) {
      console.log(formValidate);
      if (!formValidate) return false;
      this.$emit("on-perm-handle-from", formValidate);
      this.permfromshow = false;
    },
    onTypeHandleSave(formValidate) {
      console.log(formValidate);
      if (!formValidate) return false;
      this.$emit("on-type-handle-from", formValidate);
      this.systemTypefromshow = false;
    },
    onTypeHandleClose() {
      this.systemTypefromshow = false;
    },
    onAgentHandleSave(formValidate) {
      if (!formValidate) return false;
      this.$emit("on-agent-handle-from", formValidate);
      this.devAgentfromshow = false;
    },
    onAgentHandleClose() {
      this.devAgentfromshow = false;
    },
  },
  computed: {
    // arrColumns: {
    //   get() {
    //      // this.columns[0].key !== 'handle'
    //     let arrColumns =[]
    //     this.insideColumns.map((item, index) => {
    //       if(item.key !== 'handle' && item.key !== 'createTime')
    //       arrColumns.push({
    //         nametitle: item.title,
    //         valuetext: " ",
    //         key:item.key
    //       })
    //     })
    //     return arrColumns
    //   },
    // set(newValue) {
    //   newValue['valuetext'] = ''
    //   console.log(newValue)
    //   let arrColumns = newValue
    //   return arrColumns
    // }
    // }
  },
  watch: {
    columns(columns) {
      console.log(columns);
      this.handleColumns(columns);
      this.setDefaultSearchKey();
    },
    value(val) {
      this.handleTableData();
      // if (this.searchable) this.handleSearch()
    },
  },
  mounted() {
    this.handleColumns(this.columns);
    this.setDefaultSearchKey();
    this.handleTableData();
  },
};
</script>

<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.search-con {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  div {
    margin-right: 10px;
    margin-bottom: 5px;
  }
}
</style>

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
      <Editfrom
        v-if="editfromshow"
        @on-handle-save="onHandleSave"
        @on-handle-close="onHandleClose"
        :getEditData="getEditData"
      ></Editfrom>
      <Modal v-model="modal1" title="用户扩展信息" @on-ok="ok" @on-cancel="cancel">
        <div class="icInput">
          <span>IC卡号：</span>
          <Input v-model="value1" placeholder="请输入IC卡号" style="100%" />
        </div>
        <div class="upfront">
          <span>上传人脸：</span>
          <van-uploader :after-read="upFront" :before-read="upFrontBefore">
            <p
              :class="['upLoadIDCard', frontImg ? '' : 'plus']"
              :style="'background-image: url('+frontImg+')'"
            >
              <span v-if="!frontImg">{{'上传人脸' }}</span>
            </p>
          </van-uploader>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import Editfrom from "_c/tables/editForm.vue";
// import { getTableData } from '@/api/data'
export default {
  name: "user_information",
  components: {
    Tables,
    Editfrom,
  },
  data() {
    return {
      columns: [
        {
          title: "账号",
          key: "username",
          // editable: true,
          resizable: true,
          width: 180,
        },
        {
          title: "用户名",
          key: "name",
          // editable: true,
          resizable: true,
          width: 180,
        },
        {
          title: "手机号",
          key: "mobile",
          // editable: true,
          resizable: true,
          width: 180,
        },
        {
          title: "用户类型",
          key: "f_type",
          // editable: true,
          resizable: true,
          width: 180,
        },
        {
          title: "时间",
          key: "createTime",
          // editable: true,
          resizable: true,
          width: 280,
        },
        {
          title: "扩展信息",
          key: "exinfo",
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
                    this.exinfo(params);
                  },
                },
              },
              "扩展信息"
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
      modal1: false,
      value1: "",
      frontImg: "",
      f_UserInfo_id: "",
      f_id: "",
    };
  },
  methods: {
    // 获取扩展信息
    async getuserinfoex() {
      let res = await $ajax("userinfoex", "get", {
        f_UserInfo_id: this.f_UserInfo_id,
      });

      if (!res) return false;
      console.log(res);
      if(res.f_data_json.f_values.length == 0) return false
      this.f_id = res.f_data_json.f_values[0].f_id;
      this.value1 = res.f_data_json.f_values[0].f_ic_num;
      this.frontImg = res.f_data_json.f_values[0].f_pic;
    },
    async upFront(file) {
      console.log(file);
      this.frontImg = file.content; // 設置預覽头像
      console.log(file.content);
      let res = await $ajax("uploader", "post", {
        img: file.file,
      });

      if (!res) return false;
      console.log(res);
      let f_file_path = res.f_data_json.f_values[0].f_file_path;
      this.frontImg = `http://192.168.34.113:7083/ktacs${f_file_path}`;
    },
    upFrontBefore(file) {
      if (file.size > 5242880) {
        Toast("上传图片大小, 不得大于5M");
        return false;
      }
      return true;
    },
    cancel() {},
    // 提交扩展信息
    async ok() {
      if (!this.value1) return Toast("请输入IC卡号");
      if (!this.frontImg) return Toast("请上传人脸");
      if (this.f_id) {
        let res = await $ajax("userinfoex", "put", {
          f_id: this.f_id,
          f_UserInfo_id: this.f_UserInfo_id,
          f_ic_num: this.value1,
          f_pic: this.frontImg,
        });
        console.log(res);
        if (!res) return false;
        Toast('修改成功')
        this.modal1 = false;
        this.value1 = ""
        this.frontImg = ""
        this.f_UserInfo_id = ""
      }else {
        let res = await $ajax("userinfoex", "post", {
          f_UserInfo_id: this.f_UserInfo_id,
          f_ic_num: this.value1,
          f_pic: this.frontImg,
        });
        console.log(res);
        if (!res) return false;
        Toast('保存成功')
        this.modal1 = false;
        this.value1 = ""
        this.frontImg = ""
        this.f_UserInfo_id = ""
      }
    },
    // 扩展信息
    exinfo(params) {
      console.log(params);
      this.modal1 = true;
      this.f_UserInfo_id = params.row.id;
      this.getuserinfoex();
    },
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
      let res = await $ajax("userdataget", "get", {
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
          id: item.f_id,
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

<style lang="less" scoped>
.icInput {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  span {
    white-space: nowrap;
    width: 80px;
  }
}
.upfront {
  margin-top: 10px;
  display: flex;
  flex-wrap: nowrap;
}
.upLoadIDCard {
  height: 7rem;
  width: 10rem;
  border: 1px solid #ccc;
  margin: 0;
  box-sizing: border-box;
  background-size: 100% 100%;

  > span {
    display: inline-block;
    width: calc(100% - 2px);
    text-align: center;
    position: absolute;
    height: 2rem;
    line-height: 2rem;
    bottom: 1px;
    background-color: #eee;
  }
}

.plus::after {
  content: "+";
  position: absolute;
  font-size: 150px;
  height: 150px;
  width: 150px;
  font-weight: 100;
  text-align: center;
  line-height: 3rem;
  color: #ccc;
  left: 0;
  top: 20px;
}
</style>

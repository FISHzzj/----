<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane">
        <tables
          ref="tables"
          editable
          searchable
          search-place="top"
          v-model="tableData"
          :columns="columns"
          :border="border"
          :height="height"
          :pageTotal="pageTotal"
          :pageNum="pageNum"
          :arrsearch="arrsearch"
          @onPageChage="onPageChage"
          @onPageSizeChage="onPageSizeChage"
          @on-row-dblclick="onRowDblclick"
          @onHandleSearch="onHandleSearch"
        />
      </div>
      <div slot="right" class="demo-split-pane">
        <Card title="出口" style="margin-bottom:10px">
          <!-- <CheckboxGroup v-model="social" size="large" @on-change="onChangeHandle">
            <Checkbox :label="item.f_id" v-for="(item, index) in authJson" :key="index">
              <Icon type="logo-twitter"></Icon>
              <span>{{item.f_name}}</span>
            </Checkbox>
          </CheckboxGroup>-->
          <div class="exit">
            <div>
              <span>人脸：</span>
              <Select v-model="formItem.selectface" >
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in tableJsonface"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
            <div>
              <span>IC卡：</span>
              <Select v-model="formItem.selectIC" >
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in tableJsonICCard"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
            <div>
              <span>二维码：</span>
              <Select v-model="formItem.selectQP" >
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in tableJsonQPCard"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
            <div>
              <span>身份证：</span>
              <Select v-model="formItem.selectID" >
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in tableJsonIDCard"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
          </div>
        </Card>
        <Card title="入口" style="margin-bottom:10px">
          <div class="entrance">
            <div>
              <span>人脸：</span>
              <Select v-model="entrance.entranceface">
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in entranceface"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
            <div>
              <span>IC卡：</span>
              <Select v-model="entrance.entranceIC">
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in entranceICCard"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
            <div>
              <span>二维码：</span>
              <Select v-model="entrance.entranceQPCard">
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in entranceQPCard"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
            <div>
              <span>身份证：</span>
              <Select v-model="entrance.entranceIDCard">
                <Option
                  :value="item.f_id"
                  v-for="(item, index) in entranceIDCard"
                  :key="item.f_id"
                >{{item.f_name}}</Option>
              </Select>
            </div>
          </div>
        </Card>
        <Button class="search-btn" type="info" icon="md-refresh" @click="savebtn">保存</Button>
      </div>
    </Split>
  </div>
</template>
<script>
import Tables from "_c/tables";
export default {
  components: {
    Tables,
  },
  data() {
    return {
      split1: 0.35,
      columns: [
        {
          title: "控制设备名称",
          key: "f_name",
        },
        {
          title: "IP地址",
          key: "f_ip_addr",
        },
      ],
      tableData: [],
      title: "设备管理添加",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      border: true,
      height: 450,
      arrsearch: [
        {
          title: "控制设备名称",
          val: "",
          name: "f_name",
        },
      ],
      // direction: [], //方向
      f_AccessCtrlDev_id: "", //控制设备
      tableJsonface: [], //人脸 入口
      tableJsonICCard: [], // IC卡 入口
      tableJsonQPCard: [], //二维码 入口
      tableJsonIDCard: [], //身份证 入口
      entranceface: [], //人脸 出口
      entranceICCard: [], // IC卡 出口
      entranceQPCard: [], //二维码 出口
      entranceIDCard: [], //身份证 出口
      formItem: {
        //入口
        selectface: "",
        selectIC: "",
        selectQP: "",
        selectID: "",
      },
      entrance: {
        //出口
        entranceface: "",
        entranceIC: "",
        entranceQP: "",
        entranceID: "",
      },
    };
  },
  methods: {
    // 获取页码
    onPageChage(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.getdatatrl();
    },
    // 获取页数
    onPageSizeChage(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.getdatatrl();
    },
    //获取控制设备的data
    async getdatatrltrl() {
      let res = await $ajax("accessctrl", "get", {
        f_page: this.pageNum,
        f_limit: this.pageSize,
      });
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let f_id = res.f_data_json.f_values[0].f_id;
      let tableJson = [];
      res.f_data_json.f_values.forEach((item, index) => {
        tableJson.push({
          f_id: item.f_id,
          f_name: item.f_name,
          f_ip_addr: item.f_ip_addr,
        });
      });
      this.tableData = tableJson;
      let data = {};
      this.f_AccessCtrlDev_id = f_id; //控制设备
      data["f_AccessCtrlDev_id"] = f_id;
      this.aadtoacd(data);
    },
    //双击
    onRowDblclick(row, index) {
      console.log(row, index);
      let data = {};
      this.f_AccessCtrlDev_id = row.f_id; //控制设备
      data["f_AccessCtrlDev_id"] = row.f_id;
      this.aadtoacd(data);
    },
    //访问认证设备与访问控制设备关系
    async aadtoacd(data) {
      let res = await $ajax("aadtoacd", "get", data);
      if (!res) return false;
      console.log(res);
      let obj = res.f_data_json.f_values[0];
      // this.social.push(obj.f_AccessAuthDev_id); //认证
      // this.direction.push(obj.f_aad_direction); //方向
    },
    onHandleSearch(data) {
      // console.log(obj)
      //   let data = obj[0];
      console.log(data);
      this.getSearchData(data);
    },
    // 搜索
    async getSearchData(data) {
      let res = await $ajax("accessctrl", "get", data);
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
    //获取认证设备数据
    async getdataAuth(data) {
      let res = await $ajax("accessauth", "get", data);
      if (!res) return false;
      console.log(res);
      this.pageTotal = res.f_data_json.f_count;
      this.pageNum = res.f_data_json.f_page;
      let tableJsonface = [];
      let tableJsonICCard = [];
      let tableJsonQPCard = [];
      let tableJsonIDCard = [];
      let entranceface = [];
      let entranceICCard = [];
      let entranceQPCard = [];
      let entranceIDCard = [];
      res.f_data_json.f_values.forEach((item, index) => {
        if (item.f_aad_direction == "入口") {
          if (item.f_type == "人脸") {
            tableJsonface.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          } else if (item.f_type == "IC卡") {
            tableJsonICCard.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          } else if (item.f_type == "二维码") {
            tableJsonQPCard.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          } else if (item.f_type == "身份证") {
            tableJsonIDCard.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          }
        }else if(item.f_aad_direction == "出口"){
          if (item.f_type == "人脸") {
            entranceface.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          } else if (item.f_type == "IC卡") {
            entranceICCard.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          } else if (item.f_type == "二维码") {
            entranceQPCard.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          } else if (item.f_type == "身份证") {
            entranceIDCard.push({
              f_id: item.f_id,
              f_name: item.f_name,
              f_type: item.f_type,
            });
          }
        }
      });
      this.tableJsonface = tableJsonface;
      this.tableJsonICCard = tableJsonICCard;
      this.tableJsonQPCard = tableJsonQPCard;
      this.tableJsonIDCard = tableJsonIDCard;
      this.entranceface = entranceface;
      this.entranceICCard = entranceICCard;
      this.entranceQPCard = entranceQPCard;
      this.entranceIDCard = entranceIDCard;
    },
    onChangeHandle() {
      // console.log(this.social);
    },
    async savebtn() {
      let data = {};
      let {selectface, selectIC, selectQP, selectID} = this.formItem
      let {entranceface, entranceIC, entranceQP, entranceID} = this.entrance
      if(selectface||selectIC||selectQP||selectID||entranceIC||entranceQP||entranceID) {
        data["f_AccessCtrlDev_id"] = this.f_AccessCtrlDev_id;
        let res = await $ajax("aadtoacd", "post", data);
        if (!res) return false;
        console.log(res);
        Toast('保存成功！')
      }else {
        Toast('请选择其中一个')
      }
      
    },
  },
  mounted() {
    this.getdatatrltrl();
    this.getdataAuth();
  },
};
</script>
<style lang="less" scoped>
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
  .demo-split-pane {
    padding: 10px;
    .exit {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      div {
        margin-bottom: 10px;
        span {
          white-space: nowrap;
        }
      }
    }
    .entrance {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      div {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
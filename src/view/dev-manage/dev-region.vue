<template>
  <div>
    <Card title="代理服务器与认证设备的关系" id="main">
      <div>
        <p>选择代理服务器</p>
        <Select v-model="model7" style="width:500px" @on-change="onHandleChange">
          <OptionGroup :label="key" v-for="(val, key, index) in f_values" :key="index">
            <Option
              v-for="item in val"
              :value="item.f_ProxyServerInfo_id"
              :key="item.id"
            >{{ item.f_ProxyServerInfo_name }}</Option>
          </OptionGroup>
        </Select>
      </div>
      <div>
        <p>选择认证设备</p>
        <Select v-model="model1" style="width:500px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <Button type="primary" @click="saveBtn">保存</Button>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model1: "", //认证设备id
      model7: "", //代理服务器id
      f_values: null,
      cityList: [],
      f_id: "", //认证设备与代理服务器的关系id
    };
  },
  methods: {
    // 获取代理服务器与认证设备的关系
    async getorg() {
      let data = {};
      let f_ProxyServerInfo_id = this.model7;
      data["f_ProxyServerInfo_id"] = f_ProxyServerInfo_id;
      let res = await $ajax("aadtoproxy", "get", data);
      if (!res) return false;
      console.log(res);
      let f_arr = res.f_data_json.f_values;
      if (f_arr.length == 0) return false;
      this.model1 = res.f_data_json.f_values[0].f_AccessAuthDev_id;
      this.f_id = res.f_data_json.f_values[0].id;
    },
    //获取所有区域型组织下所有的代理设备
    async getdata() {
      let res = await $ajax("areaproxies", "get", {});
      if (!res) return false;
      console.log(res);
      let f_values = res.f_data_json.f_values;
      let f_values_length = Object.keys(f_values);
      if (f_values_length == 0)
        return Toast("请先绑定代理服务器与区域的关系！");
      this.f_values = f_values;
      // let dataArr = []
      // Object.keys(f_values).forEach(key => {
      //      dataArr.push(f_values[key])

      // })
      // console.log(dataArr)
    },

    async aadbinedinfo() {
      let data = {};
      let f_ProxyServerInfo_id = this.model7;
      data["f_ProxyServerInfo_id"] = f_ProxyServerInfo_id;
      data["all_or_binded"] = "1";
      let res = await $ajax("aadbinedinfo", "get", data);
      if (!res) return false;
      console.log(res);
      let dataArr = res.f_data_json.f_values;
      let arrlist = [];
      dataArr.forEach((item, index) => {
        arrlist.push({
          value: item.f_AccessAuthDev_id,
          label: item.f_AccessAuthDev_name,
        });
      });
      this.cityList = arrlist;
    },
    onHandleChange(val) {
      console.log(val);
      this.aadbinedinfo();
      this.getorg();
    },
    async saveBtn() {
      let f_AccessAuthDev_id = this.model1;
      let f_ProxyServerInfo_id = this.model7;
      let data = {};
      if (this.f_id) {
          data["f_id"] = this.f_id
        data["f_AccessAuthDev_id"] = f_AccessAuthDev_id;
        data["f_ProxyServerInfo_id"] = f_ProxyServerInfo_id;
        let res = await $ajax("aadtoproxy", "put", data);
        if (!res) return false;
        console.log(res);
        Toast("修改成功！");
        this.model1 = ''
        this.f_id = ""

      } else {
        data["f_AccessAuthDev_id"] = f_AccessAuthDev_id;
        data["f_ProxyServerInfo_id"] = f_ProxyServerInfo_id;
        let res = await $ajax("aadtoproxy", "post", data);
        if (!res) return false;
        console.log(res);
        Toast("保存成功！");
        this.model1 = ''
        this.f_id = ""
      }
    },
  },
  mounted() {
    this.getdata();
   
  },
};
</script>
<style lang="less" scoped>
#main {
  div {
    margin-bottom: 10px;
    p {
      margin-bottom: 10px;
    }
  }
}
</style>
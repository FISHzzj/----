<template>
  <div class="formModel">
    <cellGroup>
      <Cell title="新增">
        <Icon type="md-close" size="24" slot="extra" @click="onHandleClose" />
      </Cell>
    </cellGroup>
    <Form
      ref="formValidate"
      inline
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
      :hide-required-mark="hideRequiredMark"
      class="formItem"
    >
      <FormItem label="设备名称" prop="f_name">
        <Input v-model="formValidate.f_name" placeholder="请输入设备名称"></Input>
      </FormItem>
      <FormItem label="设备类型" prop="f_type">
        <Input v-model="formValidate.f_type" placeholder="请输入设备类型"></Input>
      </FormItem>
      <FormItem label="IP地址" prop="f_ip_addr">
        <Input v-model="formValidate.f_ip_addr" placeholder="请输入IP地址"></Input>
      </FormItem>
      <FormItem label="端口" prop="f_port">
        <Input v-model="formValidate.f_port" placeholder="请输入端口"></Input>
      </FormItem>
      <FormItem label="安装地址" prop="f_installnation_addr">
        <Input v-model="formValidate.f_installnation_addr" placeholder="请输入安装地址"></Input>
      </FormItem>
      <FormItem label="联系人" prop="f_contact">
        <Input v-model="formValidate.f_contact" placeholder="请输入联系人"></Input>
      </FormItem>
      <FormItem label="扩展信息" prop="f_extense_info">
        <Input v-model="formValidate.f_extense_info" placeholder="请输入扩展信息"></Input>
      </FormItem>
      <FormItem class="savebtn">
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        f_name: "",
        f_type: "",
        f_ip_addr: "",
        f_port: "",
        f_installnation_addr: "",
        f_contact: "",
      },
      ruleValidate: {
        f_name: [
          {
            required: true,
            message: "设备名称不能为空",
            trigger: "blur",
          },
        ],
        f_type: [
          {
            required: true,
            message: "设备类型不能为空",
            trigger: "blur",
          },
        ],
        f_ip_addr: [
          {
            required: true,
            message: "IP地址不能为空",
            trigger: "blur",
          },
        ],
        f_port: [
          {
            required: true,
            message: "端口不能为空",
            trigger: "blur",
          },
        ],
        f_installnation_addr: [
          {
            required: true,
            message: "安装地址不能为空",
            trigger: "blur",
          },
        ],
        f_contact: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur",
          },
        ],
        f_extense_info: [
          {
            required: true,
            message: "扩展信息不能为空",
            trigger: "blur",
          },
        ],
      },
      hideRequiredMark: true,
    };
  },
  methods: {

    handleSubmit(username) {
      // 整个表单进行校验
      this.$refs[username].validate((valid) => {
        if (valid) {
          console.log(this.formValidate);
          // this.$Message.success('Success!');
          this.$emit("on-handle-save", this.formValidate);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(username) {
      this.$refs[username].resetFields();
    },
    onHandleClose() {
      this.$emit("on-handle-close", "关闭");
    },
  },
};
</script>

<style lang="less" scoped>
.formModel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 1px solid #dcdee2;
  border-radius: 10px;
  padding: 20px;
  width: 45%;
  height: 60%;
  z-index: 999999;
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

.mdClose {
  text-align: right;
  margin-bottom: 10px;
}

.formItem {
}
</style>

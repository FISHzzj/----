<template>
<div class="formModel" v-if="formValidate.f_username">
    <CellGroup>
        <Cell title="编辑">
            <Icon type="md-close" size="24" slot="extra" @click="onHandleClose" />
        </Cell>
    </CellGroup>
    <Form ref="formValidate" inline :model="formValidate" :rules="ruleValidate" :label-width="100" :hide-required-mark="hideRequiredMark" class="formItem">
        <FormItem label="账号" prop="f_username">
            <Input v-model="formValidate.f_username" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="用户名" prop="f_name">
            <Input v-model="formValidate.f_name" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="手机号" prop="f_mobile">
            <Input v-model="formValidate.f_mobile" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="员工号" prop="f_emid">
            <Input v-model="formValidate.f_emid" placeholder="请输入员工号"></Input>
        </FormItem>
        <FormItem label="昵称" prop="f_nickname">
            <Input v-model="formValidate.f_nickname" placeholder="请输入昵称"></Input>
        </FormItem>
        <FormItem label="性别" prop="f_sex">
            <Select v-model="formValidate.f_sex" placeholder="请选择性别" style="width:186px">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
                <Option value="3">其他</Option>
            </Select>
        </FormItem>
        <FormItem label="Date">
            <Row>
                <Col span="11">
                <FormItem prop="f_birthday">
                    <DatePicker type="date" placeholder="请选择出生日期" v-model="formValidate.f_birthday" style="width:186px"></DatePicker>
                </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="用户属性" prop="f_attribute">
            <Select v-model="formValidate.f_attribute" placeholder="请选择用户属性" style="width:186px">
                <Option value="1">平台账号</Option>
                <Option value="2">老师账号</Option>
                <Option value="3">学生账号</Option>
            </Select>
        </FormItem>
        <FormItem label="头像" prop="f_img">
            <van-uploader :after-read="upFront" :before-read="upFrontBefore">
                <p :class="['upLoadIDCard', formValidate.f_img ? '' : 'plus']" :style="'background-image: url('+formValidate.f_img+')'">
                    <span v-if="!formValidate.f_img">{{'上传头像' }}</span>
                </p>
            </van-uploader>
        </FormItem>
        <FormItem class="savebtn">
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
        </FormItem>

    </Form>
</div>
</template>

<script>
export default {
  props: ['getEditData'],
  data () {
    return {
      formValidate: {
        f_id:'',
        f_username: '',
        f_name: '',
        f_mobile: '',
        f_emid: '',
        f_nickname: '',
        f_sex: '',
        f_birthday: '',
        f_attribute: '',
        f_img: ''
      },
      ruleValidate: {
        f_username: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        f_name: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        f_mobile: [{
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号码格式不正确',
          trigger: 'blur'
        }
        ],
        f_emid: [{
          required: true,
          message: '员工号不能为空',
          trigger: 'blur'
        }],
        f_nickname: [{
          required: true,
          message: '昵称不能为空',
          trigger: 'blur'
        }],
        f_sex: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
        f_birthday: [{
          required: true,
          type: 'date',
          message: '请选择出生日期',
          trigger: 'change'
        }],
        f_attribute: [{
          required: true,
          message: '请选择用户属性',
          trigger: 'change'
        }],
        f_img: [{
          required: true,
          message: '请上传图片'
        }]

      },
      hideRequiredMark: true,
      frontImg: '',

    }
  },
  mounted () {
    this.$set(this.getEditData)
  },
  methods: {
    async upFront (file) {
      this.frontImg = file.content // 設置預覽头像
      let res = await $ajax('uploader', 'post', {
          'img': file.file
      })

      if (!res) return
      console.log(res)
  
      let f_file_path = res.f_data_json.f_values[0].f_file_path
      this.formValidate.f_img = `http://192.168.34.113:7083/ktacs${f_file_path}`
    },
    upFrontBefore (file) {
      if (file.size > 5242880) {
        Toast('上传图片大小, 不得大于5M')
        return false
      }
      return true
    },
    handleSubmit (username) {
      // 整个表单进行校验
      this.$refs[username].validate((valid) => {
        if (valid) {
          console.log(this.formValidate)
          // this.$Message.success('Success!');
          this.$emit('on-handle-save', this.formValidate)
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (username) {
      this.$refs[username].resetFields()
    },
    onHandleClose () {
      this.$emit('on-handle-close', '关闭')
    }
  },
  watch: { // 使用监听的方式，监听数据的变化
    getEditData (val) {
      console.log(val)
      this.formValidate = val
    }
  }
}
</script>

<style lang="less" scoped>
.formModel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border: 1px solid #DCDEE2;
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

    >span {
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
    content: '+';
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

.formItem {}
</style>

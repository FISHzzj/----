

<template>
  <div class="login">
    <div class="login-bg1">
    </div>
    <div class="login-gy1">
        御银智慧园平台
        <div class="login-gy2">
          打造国内最智能的、最专业的智慧园区服务平台
        </div>
      </div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { setToken, getToken } from '@/libs/util'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  created () {
    localStorage.removeItem('f_crypt_key')
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    async handleSubmit ({ userName, password }) {
      let res = await $ajax('login','post',{
          f_username: userName,
          f_userpwd: password,
      })
      // 如果返回爲 false ,則中斷函數
      if (!res) return false  
      console.log(res)
      // 保存 openid 以及 ip 到本地
      localStorage.setItem('f_crypt_key',  res.f_data_json.f_values[0].f_crypt_key)
      localStorage.setItem('f_secretkey',  res.f_data_json.f_values[0].f_secretkey)
      localStorage.setItem('f_username',  res.f_data_json.f_values[0].f_username)
      localStorage.setItem('f_mobile',  res.f_data_json.f_values[0].f_mobile)
      this.$router.push({
        name: "home"
      })
    }
  }
}
</script>


<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-bg1{
        width: 100%;
        height: 237px;
        background: #347ebc;
        opacity: 0.6;
        position: absolute;
        left: 0;
        top: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;   
    }
    .login-gy1{
        width: 510px;
        height: 237px;
        color: #FFFFFF;
        font-size: 72px;
        position: absolute;
        left: 15%;
        top: 11%;
        bottom: 0px;
        margin: auto;
        .login-gy2{
            color: #fff;
            margin-left: 6px;
            font-size: 18px;
            text-align: center;
            margin-top: 10px;
        }
    }
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}

</style>

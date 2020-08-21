<style lang="less" >
  @import './login.less';
</style>

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

<style>

</style>

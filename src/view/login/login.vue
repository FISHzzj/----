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
import hasperms from '../../func/hasperms.js'
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
      'getUserInfo',
      'getUserPerms'
    ]),
    async handleSubmit ({ userName, password }) {
      let res = await $ajax('login','post',{
          f_username: userName,
          f_userpwd: password,
      })
      // 如果返回爲 false ,則中斷函數
      if (!res) return false  
      console.log(res)
      this.getUserPerms().then(res => {
        console.log(res)
      })

      this.gethasperms()

      // 保存 openid 以及 ip 到本地
      localStorage.setItem('f_crypt_key',  res.f_data_json.f_values[0].f_crypt_key)
      localStorage.setItem('f_secretkey',  res.f_data_json.f_values[0].f_secretkey)
      localStorage.setItem('f_username',  res.f_data_json.f_values[0].f_username)
      localStorage.setItem('f_mobile',  res.f_data_json.f_values[0].f_mobile)
      this.$router.push({
        name: "home"
      })
    },
    // 查看用户是否具有指定权限
    async gethasperms() {
        let data = {}
        data['perms'] = hasperms
       let res = await $ajax('hasperms','get', data)
       if(!res) return false
       console.log(res)
       let f_values = res.f_data_json.f_values.own_perms
       setToken('access', f_values)
    }
  }
}
</script>

<style>

</style>

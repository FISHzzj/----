/**
 * 后端 请求, api 的 封装
 */

// let common = 'http://www.mifu668.com' //公共字段
let common = '' //公共字段

export default {
    login: `${common}/ktacs/sys/users/login/`, //登录
    userdataget: `${common}/ktacs/sys/users/data/`, //用户信息维护 get Read
    userDataUpdate: `${common}/ktacs/sys/users/data/`,  //用户信息维护 put update
    userDataAdd:`${common}/ktacs/sys/users/data/`,  //用户信息维护 新增post
    userDataDelete: `${common}/ktacs/sys/users/data/`, //用户信息维护 删除 delete
    permsGroupsget: `${common}/ktacs/sys/perms/groups/`,  //获取所有的权限分组  get
    permsGroupsAdd: `${common}/ktacs/sys/perms/groups/`,  //获取所有的权限分组  post create
    permsGroupDelete: `${common}/ktacs/sys/perms/groups/`, //获取所有的权限分组  delete
    permsGroupToget: `${common}/ktacs/sys/perms/groups/perms/`,  //权限和分组(分组视角) get Read
    permsGroupTogetPut: `${common}/ktacs/sys/perms/groups/perms/`, //权限和分组(分组视角) put update
    permsget: `${common}/ktacs/sys/perms/perms/`, //获取所有权限信息 get Read
    resetPut: `${common}/ktacs/sys/perms/reset/`, //重置系统默认权限分组 put update
    togroupGet: `${common}/ktacs/sys/users/togroup/`, //用户与权限分组名 的关系 get Read
    togroupPost: `${common}/ktacs/sys/users/togroup/`, //用户与权限分组名 的关系 post create
    togroupDelete: `${common}/ktacs/sys/users/togroup/`, //用户与权限分组名 的关系 delete 
    orgGet: `${common}/ktacs/sys/org`, //组织架构 对组织进行管理 get Read

}
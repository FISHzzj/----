/**
 * 后端 请求, api 的 封装
 */

// let common = 'http://www.mifu668.com' //公共字段
let common = '' // 公共字段

export default {
  uploader: `${common}/ktacs/data/upload/`, // 图片上传
  login: `${common}/ktacs/sys/users/login/`, // 登录
  userdataget: `${common}/ktacs/sys/users/data/`, // 用户信息维护 get Read
  userDataUpdate: `${common}/ktacs/sys/users/data/`, // 用户信息维护 put update
  userDataAdd: `${common}/ktacs/sys/users/data/`, // 用户信息维护 新增post
  userDataDelete: `${common}/ktacs/sys/users/data/`, // 用户信息维护 删除 delete
  permsGroupsget: `${common}/ktacs/sys/perms/groups/`, // 获取所有的权限分组  get
  permsGroupsAdd: `${common}/ktacs/sys/perms/groups/`, // 获取所有的权限分组  post create
  permsGroupDelete: `${common}/ktacs/sys/perms/groups/`, // 获取所有的权限分组  delete
  permsGroupToget: `${common}/ktacs/sys/perms/groups/perms/`, // 权限和分组(分组视角) get Read
  permsGroupTogetPut: `${common}/ktacs/sys/perms/groups/perms/`, // 权限和分组(分组视角) put update
  permsget: `${common}/ktacs/sys/perms/perms/`, // 获取所有权限信息 get Read
  resetPut: `${common}/ktacs/sys/perms/reset/`, // 重置系统默认权限分组 put update
  togroupGet: `${common}/ktacs/sys/users/togroup/`, // 用户与权限分组名 的关系 get Read
  togroupPost: `${common}/ktacs/sys/users/togroup/`, // 用户与权限分组名 的关系 post create
  togroupDelete: `${common}/ktacs/sys/users/togroup/`, // 用户与权限分组名 的关系 delete
  systemtypeget: `${common}/ktacs/sys/org/orgtype/`, // 系统 组织类型 get Read  //put  //delete //post
  organization: `${common}/ktacs/sys/org/`, // 系统  组织架构 get Read // post // 
  userOrg: `${common}/ktacs/sys/users/toorg/`, // 用户与组织架构的关系 get Read //post 
  proxyservermanage: `${common}/ktacs/dev/proxyserver/`, //代理服务器 设备管理 get Read
  accessauth: `${common}/ktacs/dev/accessauth/`, //人脸、IC卡 设备管理 get Read
  accessctrl: `${common}/ktacs/dev/accessctrl/`, //门禁、闸机 设备管理 get Read
  aadtoacd: `${common}/ktacs/dev/aadtoacd/`, //访问认证设备与访问控制设备关系管理
  proxytoorg: `${common}/ktacs/dev/proxytoorg/`, //代理设备与组织关系管理
  aadtoorg: `${common}/ktacs/dev/aadtoorg/`, //8.2.6.	认证设备与区域型组织关系管理
  event: `${common}/ktacs/sys/logs/query/event/`, //系统事件查询
  loginlog: `${common}/ktacs/sys/logs/query/login/`, //系统登陆查询 get Read 
  request: `${common}/ktacs/sys/logs/query/request/`, //网络请求 get Read
  operation: `${common}/ktacs/sys/logs/query/operation/`, //系统操作查询 get Read
  areaproxies: `${common}/ktacs/dev/areaproxies/`, //查看所有区域型组织下所有的代理设备
  aadbinedinfo: `${common}/ktacs/dev/aadbinedinfo/`, //查看未与代理服务器绑定的认证设备
  aadtoproxy: `${common}/ktacs/dev/aadtoproxy/`, //认证设备与代理服务器关系管理
} 

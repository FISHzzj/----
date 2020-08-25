"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 后端 请求, api 的 封装
 */
// let common = 'http://www.mifu668.com' //公共字段
var common = ''; //公共字段

var _default = {
  uploader: "".concat(common, "/ktacs/data/upload/"),
  //图片上传
  login: "".concat(common, "/ktacs/sys/users/login/"),
  //登录
  userdataget: "".concat(common, "/ktacs/sys/users/data/"),
  //用户信息维护 get Read
  userDataUpdate: "".concat(common, "/ktacs/sys/users/data/"),
  //用户信息维护 put update
  userDataAdd: "".concat(common, "/ktacs/sys/users/data/"),
  //用户信息维护 新增post
  userDataDelete: "".concat(common, "/ktacs/sys/users/data/"),
  //用户信息维护 删除 delete
  permsGroupsget: "".concat(common, "/ktacs/sys/perms/groups/"),
  //获取所有的权限分组  get
  permsGroupsAdd: "".concat(common, "/ktacs/sys/perms/groups/"),
  //获取所有的权限分组  post create
  permsGroupDelete: "".concat(common, "/ktacs/sys/perms/groups/"),
  //获取所有的权限分组  delete
  permsGroupToget: "".concat(common, "/ktacs/sys/perms/groups/perms/"),
  //权限和分组(分组视角) get Read
  permsGroupTogetPut: "".concat(common, "/ktacs/sys/perms/groups/perms/"),
  //权限和分组(分组视角) put update
  permsget: "".concat(common, "/ktacs/sys/perms/perms/"),
  //获取所有权限信息 get Read
  resetPut: "".concat(common, "/ktacs/sys/perms/reset/"),
  //重置系统默认权限分组 put update
  togroupGet: "".concat(common, "/ktacs/sys/users/togroup/"),
  //用户与权限分组名 的关系 get Read
  togroupPost: "".concat(common, "/ktacs/sys/users/togroup/"),
  //用户与权限分组名 的关系 post create
  togroupDelete: "".concat(common, "/ktacs/sys/users/togroup/"),
  //用户与权限分组名 的关系 delete 
  orgGet: "".concat(common, "/ktacs/sys/org") //组织架构 对组织进行管理 get Read

};
exports["default"] = _default;
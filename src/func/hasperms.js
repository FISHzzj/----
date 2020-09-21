  /**
   * 用戶指定權限
   */
let hasperms = [
    'p_sys.sys_users.user_get', // 用户信息_查询
    'p_sys.sys_users.user_post', // 用户信息_增加
    'p_sys.sys_users.user_put', //用户信息_修改
    'p_sys.sys_users.user_delete', //用户信息_删除
    'p_sys.sys_perms.perms_get',    //权限信息_查询
    'p_sys.sys_perms.group_reset', //分组信息_重置
    'p_sys.sys_perms.group_get', //分组信息_查询
    'p_sys.sys_perms.group_post', //分组信息_增加
    'p_sys.sys_perms.group_put',    //分组信息_修改
    'p_sys.sys_perms.group_delete', // 分组信息_删除
    'p_sys.sys_perms.group_perms_get', //分组权限_查询
    'p_sys.sys_perms.group_perms_put', //分组权限_修改
    'p_sys.sys_perms.user_groups_get', //用户分组_查询
    'p_sys.sys_perms.user_groups_put', //用户分组_修改
    'p_sys.sys_perms.checkuserperms', //验证用户权限
    'p_sys.sys_orgs.org_get', //组织信息_查询
    'p_sys.sys_orgs.org_post', //组织信息_增加"
    'p_sys.sys_orgs.org_put', // 组织信息_修改
    'p_sys.sys_orgs.org_delete', //组织信息_删除
    'p_sys.sys_users.toorg.toorg_get', // 用户与组织关系_查询
    'p_sys.sys_users.toorg.toorg_post', // 用户与组织关系_增加
    'p_sys.sys_users.toorg.toorg_put', // 用户与组织关系_修改
    'p_sys.sys_users.toorg.toorg_delete', //用户与组织关系_删除
    'p_sys.sys_users.togroup_get', //用户与分组关系_查询
    'p_sys.sys_users.togroup_post', //用户与分组关系_增加
    'p_sys.sys_users.togroup_put', //用户与分组关系_修改
    'p_sys.sys_users.togroup_delete', //用户与分组关系_删除
]

export default hasperms


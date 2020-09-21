import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */


export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true,
      mustLogin: false
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      mustLogin: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true,
        icon: 'md-home',
        mustLogin: true
      },
      component: () => import('@/view/single-page/home')
    }]
  },
  // {
  //   path: '/',
  //   name: '_home',
  //   redirect: '/home',
  //   component: Main,
  //   meta: {
  //     hideInMenu: true,
  //     notCache: true
  //   },
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       meta: {
  //         hideInMenu: true,
  //         title: '首页',
  //         notCache: true,
  //         icon: 'md-home'
  //       },
  //       component: () => import('@/view/single-page/home')
  //     }
  //   ]
  // },
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'ios-book',
      mustLogin: true,
      access: ['p_web.system'],
    },
    component: Main,
    children: [{
        path: 'system_param',
        name: 'system_param',
        meta: {
          icon: '_qq',
          title: '系统参数',
          mustLogin: true
        },
        component: () => import('@/view/system/system-param.vue')

      },
      {
        path: 'system_type',
        name: 'system_type',
        meta: {
          icon: '_qq',
          title: '组织类型',
          mustLogin: true
        },
        component: () => import('@/view/system/system-type.vue')

      },
      {
        path: 'organization',
        name: 'organization',
        meta: {
          icon: '_qq',
          title: '组织架构',
          mustLogin: true
        },
        component: () => import('@/view/system/organization.vue')

      }
    ]
  },
  {
    path: '/',
    name: 'user',
    meta: {
      icon: '_qq',
      title: '用户管理',
      mustLogin: true,
      access: ['p_web.user'],
    },
    component: Main,
    children: [{
        path: 'user_information',
        name: 'user_information',
        meta: {
          icon: '_qq',
          title: '用户信息维护',
          mustLogin: true
        },
        component: () => import('@/view/user/user-information.vue')
      },
      {
        path: 'user_permission',
        name: 'user_permission',
        meta: {
          icon: '_qq',
          title: '权限分组',
          mustLogin: true
        },
        component: () => import('@/view/user/user-permission.vue')
      },
      {
        path: 'user_organization',
        name: 'user_organization',
        meta: {
          icon: '_qq',
          title: '用户与组织的关系',
          mustLogin: true
        },
        component: () => import('@/view/user/user-organization.vue')
      },
      {
        path: 'user_permission_group',
        name: 'user_permission_group',
        meta: {
          icon: '_qq',
          title: '用户与权限分组的关系',
          mustLogin: true
        },
        component: () => import('@/view/user/user-permission-group.vue')
      },
      {
        path: 'user_import_pic',
        name: 'user_import_pic',
        meta: {
          icon: '_qq',
          title: '批量处理',
          mustLogin: true
        },
        component: parentView,
        children: [{
          path: 'pic_import',
          name: 'pic_import',
          meta: {
            icon: '_qq',
            title: '图片批量导入',
            mustLogin: true
          },
          component: () => import('@/view/user/pic-import.vue')
        }, {
          path: 'pic_delete',
          name: 'pic_delete',
          meta: {
            icon: '_qq',
            title: '图片批量删除',
            mustLogin: true
          },
          component: () => import('@/view/user/pic-delete.vue')
        }]
      }
    ]
  },
  {
    path: '/systemlog',
    name: 'systemlog',
    meta: {
      icon: '_qq',
      title: '系统日志',
      mustLogin: true
    },
    component: Main,
    children: [{
        path: 'system_event',
        name: 'system_event',
        meta: {
          icon: '_qq',
          title: '系统事件',
          mustLogin: true
        },
        component: () => import('@/view/systemlog/system-event.vue')
      },
      {
        path: 'netword_request',
        name: 'netword_request',
        meta: {
          icon: '_qq',
          title: '网络请求',
          mustLogin: true
        },
        component: () => import('@/view/systemlog/netword-request.vue')
      },
      {
        path: 'login_log',
        name: 'login_log',
        meta: {
          icon: '_qq',
          title: '登录日志',
          mustLogin: true
        },
        component: () => import('@/view/systemlog/login-log.vue')
      },
      {
        path: 'operation_log',
        name: 'operation_log',
        meta: {
          icon: '_qq',
          title: '操作日志',
          mustLogin: true
        },
        component: () => import('@/view/systemlog/operation-log.vue')
      }
    ]
  },
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     mustLogin: true
  //   },
  //   children: [{
  //     path: 'join_page',
  //     name: 'join_page',
  //     meta: {
  //       icon: '_qq',
  //       title: 'QQ群',
  //       mustLogin: true
  //     },
  //     component: () => import('@/view/join-page.vue')
  //   }]
  // },
  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true,
  //     mustLogin: true
  //   },
  //   children: [{
  //     path: 'message_page',
  //     name: 'message_page',
  //     meta: {
  //       icon: 'md-notifications',
  //       title: '消息中心',
  //       mustLogin: true
  //     },
  //     component: () => import('@/view/single-page/message/index.vue')
  //   }]
  // },
  // {
  //   path: '/components',
  //   name: 'components',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tree_select_page',
  //       name: 'tree_select_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '树状下拉选择器'
  //       },
  //       component: () => import('@/view/components/tree-select/index.vue')
  //     },
  //     {
  //       path: 'count_to_page',
  //       name: 'count_to_page',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '数字渐变'
  //       },
  //       component: () => import('@/view/components/count-to/count-to.vue')
  //     },
  //     {
  //       path: 'drag_list_page',
  //       name: 'drag_list_page',
  //       meta: {
  //         icon: 'ios-infinite',
  //         title: '拖拽列表'
  //       },
  //       component: () => import('@/view/components/drag-list/drag-list.vue')
  //     },
  //     {
  //       path: 'drag_drawer_page',
  //       name: 'drag_drawer_page',
  //       meta: {
  //         icon: 'md-list',
  //         title: '可拖拽抽屉'
  //       },
  //       component: () => import('@/view/components/drag-drawer')
  //     },
  //     {
  //       path: 'org_tree_page',
  //       name: 'org_tree_page',
  //       meta: {
  //         icon: 'ios-people',
  //         title: '组织结构树'
  //       },
  //       component: () => import('@/view/components/org-tree')
  //     },
  //     {
  //       path: 'tree_table_page',
  //       name: 'tree_table_page',
  //       meta: {
  //         icon: 'md-git-branch',
  //         title: '树状表格'
  //       },
  //       component: () => import('@/view/components/tree-table/index.vue')
  //     },
  //     {
  //       path: 'cropper_page',
  //       name: 'cropper_page',
  //       meta: {
  //         icon: 'md-crop',
  //         title: '图片裁剪'
  //       },
  //       component: () => import('@/view/components/cropper/cropper.vue')
  //     },
  //     {
  //       path: 'tables_page',
  //       name: 'tables_page',
  //       meta: {
  //         icon: 'md-grid',
  //         title: '多功能表格'
  //       },
  //       component: () => import('@/view/components/tables/tables.vue')
  //     },
  //     {
  //       path: 'split_pane_page',
  //       name: 'split_pane_page',
  //       meta: {
  //         icon: 'md-pause',
  //         title: '分割窗口'
  //       },
  //       component: () => import('@/view/components/split-pane/split-pane.vue')
  //     },
  //     {
  //       path: 'markdown_page',
  //       name: 'markdown_page',
  //       meta: {
  //         icon: 'logo-markdown',
  //         title: 'Markdown编辑器'
  //       },
  //       component: () => import('@/view/components/markdown/markdown.vue')
  //     },
  //     {
  //       path: 'editor_page',
  //       name: 'editor_page',
  //       meta: {
  //         icon: 'ios-create',
  //         title: '富文本编辑器'
  //       },
  //       component: () => import('@/view/components/editor/editor.vue')
  //     },
  //     {
  //       path: 'icons_page',
  //       name: 'icons_page',
  //       meta: {
  //         icon: '_bear',
  //         title: '自定义图标'
  //       },
  //       component: () => import('@/view/components/icons/icons.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传',
  //     mustLogin: true
  //   },
  //   component: Main,
  //   children: [{
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv',
  //         mustLogin: true
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据',
  //         mustLogin: true
  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: 'i18n - {{ i18n_page }}'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单',
  //     mustLogin: true
  //   },
  //   component: Main,
  //   children: [{
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1',
  //         mustLogin: true
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2',
  //         mustLogin: true
  //       },
  //       component: parentView,
  //       children: [{
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级',
  //             mustLogin: true
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
  //         },
  //         {
  //           path: 'level_2_2_2',
  //           name: 'level_2_2_2',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级',
  //             mustLogin: true
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3',
  //         mustLogin: true
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  {
    path: '/dev_manage',
    name: 'dev_manage',
    meta: {
      icon: 'md-menu',
      title: '设备管理',
      mustLogin: true,
      access: ['p_web.dev'],

    },
    component: Main,
    children: [{
        path: '/dev_agent',
        name: 'dev_agent',
        meta: {
          icon: 'md-funnel',
          title: '设备代理',
          mustLogin: true
        },
        component: () => import('@/view/dev-manage/dev-agent.vue')
      },
      {
        path: '/accessauth',
        name: 'accessauth',
        meta: {
          icon: 'md-funnel',
          title: '认证设备',
          mustLogin: true
        },
        component: () => import('@/view/dev-manage/accessauth.vue')
      },
      {
        path: '/accessctrl',
        name: 'accessctrl',
        meta: {
          icon: 'md-funnel',
          title: '控制设备',
          mustLogin: true
        },
        component: () => import('@/view/dev-manage/accessctrl.vue')
      },
      {
        path: '/trl_auth',
        name: 'trl_auth',
        meta: {
          icon: 'md-funnel',
          title: '控制设备与认证设备的关系',
          mustLogin: true
        },
        component: () => import('@/view/dev-manage/trl-auth.vue')
      },
      {
        path: '/dev_region',
        name: 'dev_region',
        meta: {
          icon: 'md-funnel',
          title: '代理服务器与认证设备的关系',
          mustLogin: true
        },
        component: () => import('@/view/dev-manage/dev-region.vue')
      },

    ]
  },
  {
    path: '/opera_manage',
    name: 'opera_manage',
    meta: {
      icon: 'md-menu',
      title: '运维管理',
      mustLogin: true,
      access: ['p_web.oper'],

    },
    component: Main,
    children: [{
      path: '/param_config',
      name: 'param_config',
      meta: {
        icon: 'md-funnel',
        title: '参数配置',
        mustLogin: true
      },
      component: () => import('@/view/opera-manage/param-config.vue')
    }, {
      path: '/equip_status_monit',
      name: 'equip_status_monit',
      meta: {
        icon: 'md-funnel',
        title: '设备状态监控',
        mustLogin: true
      },
      component: () => import('@/view/opera-manage/equip-status-monit.vue')
    }, {
      path: '/equip_param_config',
      name: 'equip_param_config',
      meta: {
        icon: 'md-funnel',
        title: '设备参数配置',
        mustLogin: true
      },
      component: () => import('@/view/opera-manage/equip-param-config.vue')
    }, {
      path: '/equip_policy_template',
      name: 'equip_policy_template',
      meta: {
        icon: 'md-funnel',
        title: '设备策略模板',
        mustLogin: true
      },
      component: () => import('@/view/opera-manage/equip-policy-template.vue')
    }, {
      path: '/face_data_manage',
      name: 'face_data_manage',
      meta: {
        icon: 'md-funnel',
        title: '人脸数据管理',
        mustLogin: true
      },
      component: () => import('@/view/opera-manage/face-data-manage.vue')
    }, {
      path: '/traffic_record',
      name: 'traffic_record',
      meta: {
        icon: 'md-funnel',
        title: '通行记录',
        mustLogin: true
      },
      component: () => import('@/view/opera-manage/traffic-record.vue')
    }, {
      path: '/large_screen_display',
      name: 'large_screen_display',
      meta: {
        icon: 'md-funnel',
        title: '大屏显示',
        mustLogin: true
      },
      component: () => import('@/view/opera-manage/large-screen-display.vue')
    }]
  },
  {
    path: '/control_manage',
    name: 'control_manage',
    meta: {
      icon: 'md-funnel',
      title: '布控管理',
      mustLogin: true,
      access: ['p_web.control'],
    },
    component: Main,
    children: [{
      path: '/black_white_manage',
      name: 'black_white_manage',
      meta: {
        icon: 'md-funnel',
        title: '黑白名单管理',
        mustLogin: true
      },
      component: () => import('@/view/control-manage/black-white-manage.vue')
    }, {
      path: '/policy_manage',
      name: 'policy_manage',
      meta: {
        icon: 'md-funnel',
        title: '策略管理',
        mustLogin: true
      },
      component: () => import('@/view/control-manage/policy-manage.vue')
    }]
  },
  {
    path: '/attend_manage',
    name: 'attend_manage',
    meta: {
      icon: 'md-funnel',
      title: '考勤管理',
      mustLogin: true,
      access: ['p_web.attendance']

    },
    component: Main,
    children: [{
      path: '/param_config',
      name: 'param_config',
      meta: {
        icon: 'md-funnel',
        title: '参数配置',
        mustLogin: true
      },
      component: () => import('@/view/attend-manage/param-config.vue')
    }, {
      path: '/record_query',
      name: 'record_query',
      meta: {
        icon: 'md-funnel',
        title: '记录查询',
        mustLogin: true
      },
      component: () => import('@/view/attend-manage/record-query.vue')
    }, {
      path: '/exception_handling',
      name: 'exception_handling',
      meta: {
        icon: 'md-funnel',
        title: '异常处理',
        mustLogin: true
      },
      component: () => import('@/view/attend-manage/exception-handling.vue')
    }]

  },
  {
    path: 'visitor_manage',
    name: 'visitor_manage',
    meta: {
      icon: 'md-funnel',
      title: '访客管理',
      mustLogin: true,
      access: ['p_web.guest']
    },
    component: Main,
    children: [{
      path: '/informa_mainten',
      name: 'informa_mainten',
      meta: {
        icon: 'md-funnel',
        title: '信息维护',
        mustLogin: true
      },
      component: () => import('@/view/visitor-manage/informa-mainten.vue')
    }, {
      path: '/site_register',
      name: 'site_register',
      meta: {
        icon: 'md-funnel',
        title: '现场登记',
        mustLogin: true
      },
      component: () => import('@/view/visitor-manage/site-register.vue')
    }, {
      path: '/appoint_register',
      name: 'appoint_register',
      meta: {
        icon: 'md-funnel',
        title: '预约登记',
        mustLogin: true
      },
      component: () => import('@/view/visitor-manage/appoint-register.vue')
    }, {
      path: '/inquiry_record',
      name: 'inquiry_record',
      meta: {
        icon: 'md-funnel',
        title: '查询记录',
        mustLogin: true
      },
      component: () => import('@/view/visitor-manage/inquiry-record.vue')
    }]
  },
  {
    path: '/template_management',
    name: 'template_management',
    meta: {
      icon: 'md-funnel',
      title: '模板管理',
      mustLogin: true,
      access: ['p_web.template']
    },
    component: Main,
    children: [{
      path: '/time_slot',
      name: 'time_slot',
      meta: {
        icon: 'md-funnel',
        title: '时间段',
        mustLogin: true
      },
      component: () => import('@/view/template-management/time-slot.vue')
    },{
      path: '/holiday_vacations',
      name: 'holiday_vacations',
      meta: {
        icon: 'md-funnel',
        title: '节假日',
        mustLogin: true
      },
      component: () => import('@/view/template-management/holiday-vacations.vue')
    },{
      path: '/verification_template',
      name: 'verification_template',
      meta: {
        icon: 'md-funnel',
        title: '核验模板',
        mustLogin: true
      },
      component: () => import('@/view/template-management/verification-template.vue')
    },{
      path: '/visitor_commun_template',
      name: 'visitor_commun_template',
      meta: {
        icon: 'md-funnel',
        title: '访客通行模板',
        mustLogin: true
      },
      component: () => import('@/view/template-management/visitor-commun-template.vue')
    },{
      path: '/open_closed',
      name: 'open_closed',
      meta: {
        icon: 'md-funnel',
        title: '常开常关',
        mustLogin: true
      },
      component: () => import('@/view/template-management/open-closed.vue')
    }]
  },
  {
    path: 'data_manage',
    name: 'data_manage',
    meta: {
      icon: 'md-funnel',
      title: '数据管理',
      mustLogin: true,
      access: ['p_web.data']
    },
    component: Main,
    children: [{
      path: 'basic_data',
      name: 'basic_data',
      meta: {
        icon: 'md-funnel',
        title: '基础数据',
        mustLogin: true
      },
      component: () => import('@/view/data-manage/basic-data.vue')
    },{
      path: 'log_data',
      name: 'log_data',
      meta: {
        icon: 'md-funnel',
        title: '日志数据',
        mustLogin: true
      },
      component: () => import('@/view/data-manage/log-data.vue')
    },{
      path: 'statistic_report',
      name: 'statistic_report',
      meta: {
        icon: 'md-funnel',
        title: '统计报表',
        mustLogin: true
      },
      component: () => import('@/view/data-manage/statistic-report.vue')
    }]
  },
  // {
  //   path: '/argu',
  //   name: 'argu',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'params/:id',
  //       name: 'params',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ params }}-${route.params.id}`,
  //         notCache: true,
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/argu-page/params.vue')
  //     },
  //     {
  //       path: 'query',
  //       name: 'query',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ query }}-${route.query.id}`,
  //         notCache: true
  //       },
  //       component: () => import('@/view/argu-page/query.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true,
      mustLogin: true
    },
    component: () => import('@/view/error-page/401.vue')
  }
  // {
  //   path: '/500',
  //   name: 'error_500',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: () => import('@/view/error-page/500.vue')
  // },
  // {
  //   path: '*',
  //   name: 'error_404',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: () => import('@/view/error-page/404.vue')
  // }
]

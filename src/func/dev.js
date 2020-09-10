/**
 * 功能：格式化权限树数据
 * 
 */
function formatTreeData(databasic, dataapp, dataweb, d_perms_all){
    var rootPerm = "";
    var formatTreeData = [];
    let attr = {
        id: 'name',
        parendId: 'parent',
        name: 'desc',
        rootId: "root"
      };
    var perms_all = formatTree(d_perms_all);
    formatTreeData = perms_all.slice()
    // console.log(perms_all)
    var formt_perms_all = toTreeData(perms_all, attr);
    console.log(formt_perms_all)

    // 格式化基础功能权限树
    rootPerm = "p_comm_root";
    if(formt_perms_all[0].id == rootPerm){
        databasic.push(formt_perms_all[0]);
    }

    // 格式化移动端功能权限树
    rootPerm = "p_app_root";
    if(formt_perms_all[1].id == rootPerm){
        dataapp.push(formt_perms_all[1]);
    }

    // 格式化WEB端功能权限树
    rootPerm = "p_web_root";
    if(formt_perms_all[2].id == rootPerm){
        dataweb.push(formt_perms_all[2]);
    }
    return formatTreeData;
}

/**
 * 功能：格式化权限树数据（权限V2.0）
 * 
 */
function formatTreeDataEx(databasic, dataapp, dataweb, d_perms_all){
    var rootPerm = "";
    var formatTreeData = [];
    let attr = {
        id: 'f_name',
        parendId: 'parent',
        name: 'f_desc',
        rootId: "root"
      };
    var perms_all = formatTree(d_perms_all);
    formatTreeData = perms_all.slice()
    console.log(perms_all)
    var formt_perms_all = toTreeData(perms_all, attr);
    console.log('formt_perms_all', formt_perms_all)

    // 格式化基础功能权限树
    rootPerm = "p_sys";
    if(formt_perms_all[0].id == rootPerm){
        databasic.push(formt_perms_all[0]);
    }
    // 格式化移动端功能权限树
    rootPerm = "p_app";
    if(formt_perms_all[1].id == rootPerm){
        dataapp.push(formt_perms_all[1]);
    }

    // 格式化WEB端功能权限树
    rootPerm = "p_web";
    if(formt_perms_all[2].id == rootPerm){
        dataweb.push(formt_perms_all[2]);
    }

    return formt_perms_all
}

function formatTree(d_perms_all){
    var perms_all = [];
    $.each(d_perms_all, function (idx1, item1) {
        item1.level = getPlaceholderCount(item1.f_name);
        if(item1.f_name.lastIndexOf(".") == -1){
            item1.parent = "root";
        } else {
            item1.parent = item1.f_name.substring(0,item1.f_name.lastIndexOf("."))
        }
        perms_all.push(item1);
        console.log(item1)
    });
    // console.log('formatTree',perms_all)
    return perms_all;
}

function getPlaceholderCount(strSource) {
    // console.log(strSource)
    //统计字符串中包含.的个数
    var thisCount = 0;
    strSource.replace(/\./g, function (m, i) {
      //m为找到的.元素、i为索引
      thisCount++;
    });
    return thisCount;
  }


  /**
 * 功能：将扁平的数组数据转换为树型数据
 * @param data 扁平数组数据（传入）
 * @param attr 树型数据（返回）
 */
function toTreeData(data, attr) {
    let tree = [];
    let resData = data;
    for (let i = 0; i < resData.length; i++) {
        if (resData[i].parent === attr.rootId) {
        let obj = {
            id: resData[i][attr.id],
            title: resData[i][attr.name],
            expand: true,
            children: []
        };
        if(resData[i]['checked']) {
            obj['checked'] = true
        }else{
            obj['checked'] = false
        }
        tree.push(obj);
        resData.splice(i, 1);
        i--;
        }
    }
    // console.log(tree)
    var run = function(treeArrs) {
        if (resData.length > 0) {
        for (let i = 0; i < treeArrs.length; i++) {
            for (let j = 0; j < resData.length; j++) {
            if (treeArrs[i].id === resData[j][attr.parendId]) {
                let obj = {
                id: resData[j][attr.id],
                title: resData[j][attr.name],
                expand: true,
                checked: resData[j]['checked']== 'undefined' ? false : true,
                children: []
                };
                if(resData[j]['checked']) {
                    obj['checked'] = true
                }else{
                    obj['checked'] = false
                }
                treeArrs[i].children.push(obj);
                resData.splice(j, 1);
                j--;
            }
            }
            run(treeArrs[i].children);
        }
        }
    };
    run(tree);
    // console.log(tree)
    return tree;
}

/**
 * 功能：将选中的权限树结构格式化为权限字符串
 * @param {*} checkedtreebasic 选择的基础功能权限树结构
 * @param {*} checkedtreeapp   选择的移动端功能权限树结构
 * @param {*} checkedtreeweb   选择的WEB端功能权限树结构
 */
function formatTreePremsToString(checkedtreebasic, checkedtreeapp, checkedtreeweb){
    var arrPerms = [];
    var data1 = treeTransArray(checkedtreebasic, "children")
    $.each(data1, function (idx1, item1) {
        arrPerms.push(item1.id)
    });

    var data2 = treeTransArray(checkedtreeapp, "children")
    $.each(data2, function (idx2, item2) {
        arrPerms.push(item2.id)
    });

    var data3 = treeTransArray(checkedtreeweb, "children")
    $.each(data3, function (idx3, item3) {
        arrPerms.push(item3.id)
    });
    return arrPerms;
}


/**
 * 功能：将树结构转换为扁平的数组结构
 * @param {*} tree 树结构对象
 * @param {*} key 子项的名称：这里是children
 */
function treeTransArray(tree, key) {
    return tree.reduce(function(con, item) {
        var callee = arguments.callee;
        con.push(item);
        if (item[key] && item[key].length >0)
            item[key].reduce(callee, con);
        return con;
    }, []).map(function(item){
    item[key] = [];
    return item;
    })
}


export {
    formatTreeData,
    formatTreeDataEx,
    formatTreePremsToString
}


  /**
   * 功能：将扁平的数组数据转换为树型数据
   * @param data 扁平数组数据（传入）
   * @param attr 树型数据（返回）
   */
  function toTreeData(data, attr) {
    let tree = [];
    let resData = [{
        "f_id": "8",
        "f_name": "产品部",
        "f_OrgType_id": "13",
        "f_OrgType_name": "11",
        "f_Organization_id": "6",
        "f_Organization_name": "技术部"
      },
      {
        "f_id": "7",
        "f_name": "前端一组",
        "f_OrgType_id": "13",
        "f_OrgType_name": "11",
        "f_Organization_id": "6",
        "f_Organization_name": "技术部"
      },
      {
		"f_id": "13",
		"f_name": "业务1部",
		"f_OrgType_id": "13",
		"f_OrgType_name": "11",
		"f_Organization_id": "12",
		"f_Organization_name": "业务部"
	},{
		"f_id": "12",
		"f_name": "业务部",
		"f_OrgType_id": "13",
		"f_OrgType_name": "11",
		"f_Organization_id": "1",
		"f_Organization_name": "御银股份科技有限公司"
	},{
		"f_id": "10",
		"f_name": "长沙市昌平",
		"f_OrgType_id": "13",
		"f_OrgType_name": "11",
		"f_Organization_id": "1",
		"f_Organization_name": "御银股份科技有限公司"
	}, {
        "f_id": "6",
        "f_name": "技术部",
        "f_OrgType_id": "13",
        "f_OrgType_name": "11",
        "f_Organization_id": "1",
        "f_Organization_name": "御银股份科技有限公司"
      }, {
        "f_id": "1",
        "f_name": "御银股份科技有限公司",
        "f_OrgType_id": "13",
        "f_OrgType_name": "11",
        "f_Organization_id": null,
        "f_Organization_name": null
      }];
      resData.reverse()
    //   let resData = data
    for (let i = 0; i < resData.length; i++) {
      console.log(resData[i])
      if (resData[i].f_Organization_id === attr.rootId) {
        let obj = {
          id: resData[i][attr.id],
          label: resData[i][attr.name],
          children: []
        };
        tree.push(obj);
        resData.splice(i, 1);
        i--;
      }
    }


    var run = function (treeArrs) {
        console.log(treeArrs)
      if (resData.length > 0) {
        for (let i = 0; i < treeArrs.length; i++) {
            console.log('treeArrs[i]', treeArrs[i])
          for (let j = 0; j < resData.length; j++) {
            if (treeArrs[i].id === resData[j].f_Organization_id) {
              let obj = {
                id: resData[i][attr.id],
                label: resData[i][attr.name],
                children: []
              };
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
    return tree;
  }

  export {
    toTreeData
  }

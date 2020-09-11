  /**
   * 功能：将扁平的数组数据转换为树型数据
   * @param data 扁平数组数据（传入）
   * @param attr 树型数据（返回）
   */
  function toTreeData(data, attr) {
    let tree = [];
    let resData = data;
    console.log(resData)
    for (let i = 0; i < resData.length; i++) {
      if (!resData[i].f_Organization_id) {
        if(resData[i].selected == true){
          let obj = {
            id: resData[i][attr.id],
            title: resData[i][attr.name],
            children: [],
            expand: true,
            selected: true
          };
          tree.push(obj);
        }else{
          let obj = {
            id: resData[i][attr.id],
            title: resData[i][attr.name],
            children: [],
            expand: true,
            selected: false,
          };
          tree.push(obj);
        }
        
        resData.splice(i, 1);
        i--;
      }
    }

    var run = function (treeArrs) {
      if (resData.length > 0) {
        for (let i = 0; i < treeArrs.length; i++) {
          for (let j = 0; j < resData.length; j++) {
            // console.log(treeArrs[i].id == resData[j][attr.parendId])
            // console.log(treeArrs[i].id) 
            if (treeArrs[i].id === resData[j][attr.parendId]) {
                // console.log(resData[i])
                if(resData[j].selected == true) {
                  let obj = {
                    id: resData[j][attr.id],
                    title: resData[j][attr.name],
                    children: [],
                    expand: true,
                    selected: true
                  };
                  treeArrs[i].children.push(obj);
                }else {
                  let obj = {
                    id: resData[j][attr.id],
                    title: resData[j][attr.name],
                    children: [],
                    expand: true,
                    selected: false,
                  };
                  treeArrs[i].children.push(obj);
                }
              
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

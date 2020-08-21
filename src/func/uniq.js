

//js 两个数组对象根据账号比较相同部分添加选中新的状态，解决直接splice后数组索引改变 (传入两个参数 arr1, arr2)
function Uniq(arr1,arr2)
{
    $.each(arr1, function (index, item) {
        for (var i = 0; i < arr2.length; i++) {

            if (arr2[i].f_name == item.f_name) {
              
                arr1[index]['checked'] = true
            }
        }

    })
　　return arr1;
}

export {
    Uniq
}
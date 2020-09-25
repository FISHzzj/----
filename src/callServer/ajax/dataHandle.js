// status 0 等于 0 時, 統一進行處理
function mistake(data) {
  // 如果返回的数据, 不是 json
  if (typeof data !== 'object') {
    Dialog.alert({
      title: '服务器错误',
      message: 'server data type not is JSON'
    })
    return true // 發生錯誤
  }
  let fjsondata = JSON.parse(data.f_data)
  if (fjsondata.f_result != 10000) {
    Dialog.alert({
      message: fjsondata.f_msg
    })
    return true // 發生錯誤
  }
  return false // 未發生錯誤
}

export default {
  uploader(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  login(data) {
    console.log(data)
    if (mistake(data)) return false

    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  webmenuperms(data) {
    console.log(data)
    if (mistake(data)) return false

    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  hasperms(data) {
    console.log(data)
    if (mistake(data)) return false

    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  userdataget(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  userDataUpdate(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  userDataAdd(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  userDataDelete(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  permsGroupsget(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  permsGroupsAdd(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  permsGroupDelete(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  permsGroupToget(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  permsGroupTogetPut(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  permsget(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  resetPut(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  togroupGet(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  togroupPost(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  togroupDelete() {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  orgGet(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  systemtypeget(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  organization(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    console.log(f_data)
    let f_data_json = JSON.parse(f_data)
    console.log('f_data_json', f_data_json)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  userOrg(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  loginlog(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  proxyservermanage(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  accessauth(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  accessctrl(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  aadtoacd(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  proxytoorg(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  event(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  request(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  operation(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  aadtoorg(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  areaproxies(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  aadbinedinfo(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  aadtoproxy(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  faceinaad(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  passrecord(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },
  userinfoex(data ) {
    console.log(data)
    if (mistake(data)) return false
    let {
      f_ver,
      f_type,
      f_mac,
      f_data
    } = data
    let f_data_json = JSON.parse(f_data)
    return {
      f_ver,
      f_type,
      f_mac,
      f_data_json
    }
  },



  sendVerifycode(data) {
    console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  forgetVerifycode(data) {
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  register(data) {
    console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  forget(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  center(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      id,
      status,
      nickName,
      tel,
      headpic,
      bcType,
      agentid
    } = data.data
    return {
      id,
      status,
      nickName,
      tel,
      headpic,
      bcType,
      agentid

    }
  },
  recharge(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      name,
      bankName,
      accountNumber
    } = data.data
    return {
      // address: ztpayaddress, //充幣地址
      // QRImg: url, // 二維碼地址
      // notice: content //注意事項
      bankname: bankName, // 平台收款银行卡号的银行名称
      banknum: accountNumber, // 平台收款银行卡号
      realname: name // 平台收款银行卡姓名
    }
  },
  applyFeedback(data) {
    console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  rechargeList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let arr = []
    data.data.forEach(item => {
      let {
        createTime,
        amount,
        auditState,
        memberId
      } = item
      arr.push({
        money: amount > 0 ? `+${amount}` : amount,
        address: memberId,
        time: createTime,
        needJump: parseInt(auditState) === 1 ? '成功' : '失败' // 1 为正常充值, 6为后台充值
      })
    })
    return arr
  },
  rechargeDetail(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      create_time,
      money,
      referenceaddress,
      txid
    } = data.result.ztpaynotice
    return {
      time: create_time,
      amount: money,
      realAmount: money,
      txid,
      address: referenceaddress,
      status: 1
    }
  },
  withdrawals(data) {
    // console.log(data)
    if (mistake(data)) return false
    if (data.data.withdrawalAddress) {
      var {
        id,
        memberId,
        bankName,
        name,
        cardNo,
        isSelect
      } = data.data.withdrawalAddress
    }

    let option = data.data.option
    return {
      id: id || '',
      memberId: memberId || '',
      bankName: bankName || '',
      name: name || '',
      cardNo: cardNo || '',
      isSelect: isSelect || '',
      option
    }
  },
  deductCommission(data) {
    if (mistake(data)) return false
    let {
      amount,
      commission
    } = data.data
    return {
      amount,
      commission
    }
  },
  cashAddress(data) {
    // console.log(data)
    if (mistake(data)) return false
    let address = data.data
    let arr = []
    address.forEach(item => {
      let {
        memberId,
        name,
        bankName,
        cardNo,
        id,
        isSelect
      } = item
      arr.push({
        id: id,
        memberId,
        realname: name,
        bankname: bankName,
        banknum: cardNo,
        isSelect
      })
    })
    return arr
  },
  getAddressAtChange(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      bankName,
      name,
      cardNo
    } = data.data
    return {
      bankName,
      name,
      cardNo
    }
  },
  changeAddress(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  updateAddress(data) {
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  toWithdrawals(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  withdrawalsList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let list = data.data
    let arr = []
    list.forEach(item => {
      let {
        id,
        memberId,
        wType,
        bcType,
        amount,
        wStatus,
        createTime,
        completeTime,
        mobilePhone,
        accountNumber
      } = item
      arr.push({
        address: accountNumber,
        id,
        time: createTime,
        money: amount,
        wStatus
      })
    })
    return arr
  },
  delAddress(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  withdrawalsDetail(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      address,
      ordersn,
      gold,
      actual_gold,
      addtime,
      status,
      banknum,
      service,
      reason
    } = data.result.withdrawals
    return {
      address,
      ordersn,
      amount: gold,
      realAmount: actual_gold,
      time: addtime,
      status: parseInt(status), // 0:未審核, 1:已通過, 2提现失败（驳回)
      banknum,
      service,
      reason
    }
  },
  transferPage(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      min,
      service,
      content
    } = data.result.transfer_set
    // console.log(service)
    return {
      // tips: content
      min,
      service: `${parseFloat(service).toFixed(2)}`
    }
  },
  toTransfer(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.result.message
    }
  },
  transferOut(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      transfer
    } = data.result
    let arr = []
    transfer.forEach(item => {
      let {
        addtime,
        ruid,
        gold,
        transferno
      } = item
      // 將後端時間, 切割成兩塊, 並拼接爲 html 模板
      let timeCut = addtime.split(' ')
      let timeEle = ''
      timeCut.forEach(item => {
        timeEle += `<p style="margin:0;">${item}</p>`
      })
      // 將 id 和 訂單號 拼接爲 新的 html模板
      let userEle = `<p style="margin:5px 0;">${ruid}</p><p style="margin:0;overflow-x:scroll;word-wrap:unset;word-break:keep-all;">訂單號:${transferno}</p>`
      // console.log(timeEle)
      arr.push([
        timeEle,
        userEle,
        gold
      ])
    })
    return arr
  },
  transferIn(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      transfer
    } = data.result
    let arr = []
    transfer.forEach(item => {
      let {
        addtime,
        gold,
        transferno,
        uid
      } = item
      // 將後端時間, 切割成兩塊, 並拼接爲 html 模板
      let timeCut = addtime.split(' ')
      let timeEle = ''
      timeCut.forEach(item => {
        timeEle += `<p style="margin:0;">${item}</p>`
      })
      // 將 id 和 訂單號 拼接爲 新的 html模板
      let userEle = `<p style="margin:5px 0;">${uid}</p><p style="margin:0;overflow-x:scroll;word-wrap:unset;word-break:keep-all;">訂單號:${transferno}</p>`
      // console.log(timeEle)
      arr.push([
        timeEle,
        userEle,
        gold
      ])
    })
    return arr
  },
  getOrders(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      gold,
      usd,
      ordersn,
      receipt_fine,
      grab_sheet
    } = data.result
    let orders = []
    receipt_fine.forEach(item => {
      let {
        original_gold,
        commission,
        still_gold,
        addtime
      } = item
      orders.push({
        time: addtime,
        startMoney: original_gold,
        commission,
        rebackMoneyCurrent: still_gold

      })
    })
    return {
      list: orders,
      money: gold,
      usdMoney: usd,
      orderSn: ordersn,
      grab_sheet
    }
  },
  exchangeNow(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      gold,
      min,
      max,
      content
    } = data.result
    return {
      money: gold,
      min,
      max,
      content
    }
  },
  exchangeSubmit(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.result.message
    }
  },
  startGetOrders(data) {
    if (mistake(data)) return false
    return {
      msg: data.result.message
    }
  },
  getOrdersList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let receipt = data.data
    let list = []
    receipt.forEach(item => {
      let {
        id,
        orderNo,
        orderMoney,
        payMoney,
        memberId,
        posId,
        createTime,
        completeTime,
        payType,
        payStatus,
        notifyUrl,
        commission
      } = item
      list.push({
        id,
        orderNo,
        orderMoney,
        payMoney,
        memberId,
        posId,
        createTime,
        completeTime,
        payType,
        payStatus,
        notifyUrl,
        commission
      })
    })
    return list
  },
  collectionList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let receipt = data.data
    let list = []
    receipt.forEach(item => {
      let {
        id,
        orderNo,
        orderMoney,
        payMoney,
        memberId,
        posId,
        createTime,
        completeTime,
        payType,
        payStatus,
        notifyUrl,
        commission,
        accountNumber,
        realName,
        bankName,
        cardNumber
      } = item
      list.push({
        id,
        orderNo,
        orderMoney,
        payMoney,
        memberId,
        posId,
        createTime,
        completeTime,
        payType,
        payStatus,
        notifyUrl,
        commission,
        accountNumber,
        realName,
        bankName,
        cardNumber
      })
    })
    return list
  },
  sdRedenvelopes(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      redlist,
      total
    } = data.result
    return {
      redlist,
      total
    }
  },
  sdRedenvelopesStart(data) {
    console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.result.message
    }
  },
  sdRedenvelopesList(data) {
    if (mistake(data)) return false
    let {
      list
    } = data.result
    return {
      list
    }
  },
  getOrdersDetail(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      receipt,
      receipt_fine
    } = data.result
    let {
      addtime,
      still_gold
    } = receipt
    let list = []
    receipt_fine.forEach(item => {
      let {
        addtime,
        commission,
        original_gold,
        still_gold
      } = item
      list.push({
        time: addtime,
        commission,
        originMoney: original_gold,
        rebackMoney: still_gold
      })
    })
    return {
      head: {
        time: addtime,
        rebackMoney: still_gold
      },
      list
    }
  },
  exchangeList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      gold_total,
      exchange_list
    } = data.result
    let list = []
    exchange_list.forEach(item => {
      let {
        ordersn,
        addtime,
        gold
      } = item
      list.push({
        orderSn: ordersn,
        time: addtime,
        money: gold
      })
    })
    return {
      total: gold_total,
      list
    }
  },
  capital(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      freezeDeposit,
      totalDeposit,
      rotationChartList2,
      member,
      totalCommission,
      dayCommission,
      commissionRank,
      rotationChart1,
      usableDeposit
    } = data.data
    let {
      id,
      nickName,
      tel,
      headpic,
      createTime,
      bcType,
      total_receivables,
      agentid
    } = member
    let images = []
    let images1 = []
    rotationChart1.forEach(item => {
      let {
        id,
        pic,
        level,
        linkUrl
      } = item
      images.push({
        img: pic,
        level,
        linkUrl
      })
    })
    rotationChartList2.map(item => {
      let {
        id,
        pic,
        level,
        linkUrl
      } = item
      images1.push({
        img: pic,
        level,
        linkUrl
      })
    })
    return {
      freezeDeposit, //	冻结押金
      totalDeposit, // 总押金
      totalCommission, //	押金排行
      usableDeposit, // 可用押金
      nickName, // 商户名
      headpic, // 头像
      images, // 层级1的轮播图对象
      images1, // 层级2的轮播图对象
      commissionRank, // 排行榜
      dayCommission, // 今日佣金
      bcType // 码商类型
    }
  },
  sdrankingList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      list
    } = data.result
    return list
  },
  pyList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let list = []
    data.result.goldrecord.forEach(item => {
      let {
        gold,
        addtime,
        paytype
      } = item
      list.push({
        money: Number(gold),
        time: addtime,
        typeName: paytype
      })
    })
    return list
  },
  incomeList(data) {
    // console.log(data)
    if (mistake(data)) return false
    // let {receipt_gold, receipt} = data.data
    let list = []
    data.data.forEach(item => {
      let {
        id,
        orderId,
        memberId,
        posId,
        money,
        beforeMoney,
        afterMoney,
        remake,
        payType,
        createTime,
        flowType
      } = item
      list.push({
        orderId,
        createTime,
        commiss: money
      })
    })
    return {
      // total: receipt_gold,
      list
    }
  },
  incomeListTeam(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      receipt_gold,
      receipt
    } = data.result
    let list = []
    receipt.forEach(item => {
      let {
        sumgold,
        addtime,
        ordersn,
        ruid
      } = item
      list.push({
        orderSn: ordersn,
        time: addtime,
        money: sumgold,
        id: ruid
      })
    })
    return {
      total: receipt_gold,
      list
    }
  },
  streamDetail(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      gold_total,
      exchange_list
    } = data.result
    let list = []
    exchange_list.forEach(item => {
      let {
        water_gold,
        addtime,
        ordersn
      } = item
      list.push({
        orderSn: ordersn,
        time: addtime,
        money: water_gold
      })
    })
    return {
      total: gold_total,
      list
    }
  },
  toCertificate(data) {
    console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  certification(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  certificationDetail(data) {
    // console.log(data)
    if (mistake(data)) return false
    let list = data.data
    return {
      list
    }
  },
  invite(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      url,
      qrcodeUrl
    } = data.data
    return {
      url,
      qrcodeUrl
    }
  },
  team(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      num,
      members
    } = data.data
    if (members == null) {
      return '没有数据'
    } else {
      let list = []
      members.forEach(item => {
        let {
          id,
          nickName,
          tel,
          headpic,
          createTime,
          bcType,
          address,
          agentid,
          idCardNo
        } = item
        list.push({
          id,
          nickName,
          tel,
          // headpic,
          createTime,
          bcType,
          address,
          agentid,
          idCardNo
        })
      })
      return {
        num,
        list

      }
    }
  },
  teamDirect(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      arrdown
    } = data.result
    let list = []
    arrdown.forEach(item => {
      let {
        realname,
        mobile,
        meet
      } = item
      list.push({
        name: realname || '未實名',
        mobile: `${mobile[0]}${mobile[1]}${mobile[2]}****${mobile[mobile.length - 4]}${mobile[mobile.length - 3]}${mobile[mobile.length - 2]}${mobile[mobile.length - 1]}`,
        // level: `V${level}`,
        status: parseInt(meet) ? '已接單' : '休息中'
      })
    })
    return list
  },
  changePwdOfLogin(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  changePwdOfPay(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  changePwdverify(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  announcement(data) {
    // console.log(data)
    if (mistake(data)) return false
    return data.data
  },
  announcementDetail(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      content: data.data.noticeTitle
    }
  },
  feedback(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      feedback
    } = data.result
    let actions = []
    feedback.forEach(item => {
      let {
        id,
        title
      } = item
      actions.push({
        name: title,
        id
      })
    })
    return actions
  },
  sendFeedback(data) {
    // console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.result.message
    }
  },
  feedbackList(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      feedback_list
    } = data.result
    let list = []
    feedback_list.forEach(item => {
      let {
        addtime,
        content,
        thumb,
        title
      } = item
      let images = thumb ? thumb.split(',') : []
      list.push({
        type: title,
        time: addtime,
        content,
        images
      })
    })
    return list
  },
  sdOrder(data) {
    if (mistake(data)) return false
    // console.log(data)
    let sdOrder = data.result
    let status = data.status

    return {
      sdOrder,
      status
    }
  },
  submission(data) {
    if (mistake(data)) return false
    return {
      msg: data.result.message
    }
  },
  sdcustomerService(data) {
    if (mistake(data)) return false
    let {
      wechatQrcode,
      wechatNumber,
      qqQrcode,
      qqNumber
    } = data.data

    return {
      wechatQrcode,
      wechatNumber,
      qqQrcode,
      qqNumber
    }
  },
  payabnormal(data) {
    if (mistake(data)) return false
    let list = data.data

    return list
  },
  collabnormal(data) {
    if (mistake(data)) return false
    let list = data.data

    return list
  },
  checkedCode(data) {
    // console.log(data)
    if (mistake(data)) return false
    let {
      bankCard,
      qrCode,
      isPerfect
    } = data.data

    return {
      bankCard,
      qrCode,
      isPerfect
    }
  },
  // 代收订单确认来款
  sureOrdersList(data) {
    if (mistake(data)) return false
    return {
      code: data.code,
      msg: data.msg
    }
  },
  // 代付订单确认打款
  sureCollectionList(data) {
    if (mistake(data)) return false
    return {
      code: data.code,
      msg: data.msg
    }
  },
  person(data) {
    console.log(data)
    if (mistake(data)) return false
    return {
      msg: data.msg
    }
  },
  getInformation(data) {
    console.log(data)
    if (mistake(data)) return false
    let {
      idCardNo,
      name,
      headPic
    } = data.data
    return {
      idCardNo,
      name,
      headPic
    }
  },
  uploadercollec(data) {
    if (mistake(data)) return false
    // console.log(data)
    let imgurl = data.data
    // console.log(imgurl)
    return imgurl
  },
  playHelp(data) {
    // console.log(data)
    if (mistake(data)) return false
    let list = data.data
    if (list == null) {
      return {}
    } else {
      return list
    }
  },
  orderPay(data) {
    if (mistake(data)) return false
    let list = data.data
    if (list == null) {
      return {}
    } else {
      return list
    }
  },
  orderCollect(data) {
    if (mistake(data)) return false
    let list = data.data
    if (list == null) {
      return {}
    } else {
      return list
    }
  }

}

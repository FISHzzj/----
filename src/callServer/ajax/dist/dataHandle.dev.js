"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// status 0 等于 0 時, 統一進行處理
function mistake(data) {
  // 如果返回的数据, 不是 json
  if (_typeof(data) !== 'object') {
    Dialog.alert({
      title: '服务器错误',
      message: 'server data type not is JSON'
    });
    return true; //發生錯誤
  }

  var fjsondata = JSON.parse(data.f_data);

  if (fjsondata.f_result != 10000) {
    Dialog.alert({
      message: fjsondata.f_msg
    });
    return true; //發生錯誤
  }

  return false; //未發生錯誤
}

var _default = {
  uploader: function uploader(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  login: function login(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  userdataget: function userdataget(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  userDataUpdate: function userDataUpdate(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  userDataAdd: function userDataAdd(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  userDataDelete: function userDataDelete(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  permsGroupsget: function permsGroupsget(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  permsGroupsAdd: function permsGroupsAdd(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  permsGroupDelete: function permsGroupDelete(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  permsGroupToget: function permsGroupToget(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  permsGroupTogetPut: function permsGroupTogetPut(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  permsget: function permsget(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  resetPut: function resetPut(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  togroupGet: function togroupGet(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  togroupPost: function togroupPost(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  togroupDelete: function togroupDelete() {
    console.log(data);
    if (mistake(data)) return false;
    var _data = data,
        f_ver = _data.f_ver,
        f_type = _data.f_type,
        f_mac = _data.f_mac,
        f_data = _data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  orgGet: function orgGet(data) {
    console.log(data);
    if (mistake(data)) return false;
    var f_ver = data.f_ver,
        f_type = data.f_type,
        f_mac = data.f_mac,
        f_data = data.f_data;
    var f_data_json = JSON.parse(f_data);
    return {
      f_ver: f_ver,
      f_type: f_type,
      f_mac: f_mac,
      f_data_json: f_data_json
    };
  },
  sendVerifycode: function sendVerifycode(data) {
    console.log(data);
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  forgetVerifycode: function forgetVerifycode(data) {
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  register: function register(data) {
    console.log(data);
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  forget: function forget(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  center: function center(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$data = data.data,
        id = _data$data.id,
        status = _data$data.status,
        nickName = _data$data.nickName,
        tel = _data$data.tel,
        headpic = _data$data.headpic,
        bcType = _data$data.bcType,
        agentid = _data$data.agentid;
    return {
      id: id,
      status: status,
      nickName: nickName,
      tel: tel,
      headpic: headpic,
      bcType: bcType,
      agentid: agentid
    };
  },
  recharge: function recharge(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$data2 = data.data,
        name = _data$data2.name,
        bankName = _data$data2.bankName,
        accountNumber = _data$data2.accountNumber;
    return {
      // address: ztpayaddress, //充幣地址
      // QRImg: url, // 二維碼地址
      // notice: content //注意事項
      bankname: bankName,
      //平台收款银行卡号的银行名称
      banknum: accountNumber,
      //平台收款银行卡号
      realname: name //平台收款银行卡姓名

    };
  },
  applyFeedback: function applyFeedback(data) {
    console.log(data);
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  rechargeList: function rechargeList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var arr = [];
    data.data.forEach(function (item) {
      var createTime = item.createTime,
          amount = item.amount,
          auditState = item.auditState,
          memberId = item.memberId;
      arr.push({
        money: amount > 0 ? "+".concat(amount) : amount,
        address: memberId,
        time: createTime,
        needJump: parseInt(auditState) === 1 ? '成功' : '失败' // 1 为正常充值, 6为后台充值

      });
    });
    return arr;
  },
  rechargeDetail: function rechargeDetail(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result$ztpaynot = data.result.ztpaynotice,
        create_time = _data$result$ztpaynot.create_time,
        money = _data$result$ztpaynot.money,
        referenceaddress = _data$result$ztpaynot.referenceaddress,
        txid = _data$result$ztpaynot.txid;
    return {
      time: create_time,
      amount: money,
      realAmount: money,
      txid: txid,
      address: referenceaddress,
      status: 1
    };
  },
  withdrawals: function withdrawals(data) {
    // console.log(data)
    if (mistake(data)) return false;

    if (data.data.withdrawalAddress) {
      var _data$data$withdrawal = data.data.withdrawalAddress,
          id = _data$data$withdrawal.id,
          memberId = _data$data$withdrawal.memberId,
          bankName = _data$data$withdrawal.bankName,
          name = _data$data$withdrawal.name,
          cardNo = _data$data$withdrawal.cardNo,
          isSelect = _data$data$withdrawal.isSelect;
    }

    var option = data.data.option;
    return {
      id: id || '',
      memberId: memberId || '',
      bankName: bankName || '',
      name: name || '',
      cardNo: cardNo || '',
      isSelect: isSelect || '',
      option: option
    };
  },
  deductCommission: function deductCommission(data) {
    if (mistake(data)) return false;
    var _data$data3 = data.data,
        amount = _data$data3.amount,
        commission = _data$data3.commission;
    return {
      amount: amount,
      commission: commission
    };
  },
  cashAddress: function cashAddress(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var address = data.data;
    var arr = [];
    address.forEach(function (item) {
      var memberId = item.memberId,
          name = item.name,
          bankName = item.bankName,
          cardNo = item.cardNo,
          id = item.id,
          isSelect = item.isSelect;
      arr.push({
        id: id,
        memberId: memberId,
        realname: name,
        bankname: bankName,
        banknum: cardNo,
        isSelect: isSelect
      });
    });
    return arr;
  },
  getAddressAtChange: function getAddressAtChange(data) {
    console.log(data);
    if (mistake(data)) return false;
    var _data$data4 = data.data,
        bankName = _data$data4.bankName,
        name = _data$data4.name,
        cardNo = _data$data4.cardNo;
    return {
      bankName: bankName,
      name: name,
      cardNo: cardNo
    };
  },
  changeAddress: function changeAddress(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  updateAddress: function updateAddress(data) {
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  toWithdrawals: function toWithdrawals(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  withdrawalsList: function withdrawalsList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var list = data.data;
    var arr = [];
    list.forEach(function (item) {
      var id = item.id,
          memberId = item.memberId,
          wType = item.wType,
          bcType = item.bcType,
          amount = item.amount,
          wStatus = item.wStatus,
          createTime = item.createTime,
          completeTime = item.completeTime,
          mobilePhone = item.mobilePhone,
          accountNumber = item.accountNumber;
      arr.push({
        address: accountNumber,
        id: id,
        time: createTime,
        money: amount,
        wStatus: wStatus
      });
    });
    return arr;
  },
  delAddress: function delAddress(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  withdrawalsDetail: function withdrawalsDetail(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result$withdraw = data.result.withdrawals,
        address = _data$result$withdraw.address,
        ordersn = _data$result$withdraw.ordersn,
        gold = _data$result$withdraw.gold,
        actual_gold = _data$result$withdraw.actual_gold,
        addtime = _data$result$withdraw.addtime,
        status = _data$result$withdraw.status,
        banknum = _data$result$withdraw.banknum,
        service = _data$result$withdraw.service,
        reason = _data$result$withdraw.reason;
    return {
      address: address,
      ordersn: ordersn,
      amount: gold,
      realAmount: actual_gold,
      time: addtime,
      status: parseInt(status),
      // 0:未審核, 1:已通過, 2提现失败（驳回)
      banknum: banknum,
      service: service,
      reason: reason
    };
  },
  transferPage: function transferPage(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result$transfer = data.result.transfer_set,
        min = _data$result$transfer.min,
        service = _data$result$transfer.service,
        content = _data$result$transfer.content; // console.log(service)

    return {
      // tips: content
      min: min,
      service: "".concat(parseFloat(service).toFixed(2))
    };
  },
  toTransfer: function toTransfer(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.result.message
    };
  },
  transferOut: function transferOut(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var transfer = data.result.transfer;
    var arr = [];
    transfer.forEach(function (item) {
      var addtime = item.addtime,
          ruid = item.ruid,
          gold = item.gold,
          transferno = item.transferno; // 將後端時間, 切割成兩塊, 並拼接爲 html 模板

      var timeCut = addtime.split(' ');
      var timeEle = '';
      timeCut.forEach(function (item) {
        timeEle += "<p style=\"margin:0;\">".concat(item, "</p>");
      }); // 將 id 和 訂單號 拼接爲 新的 html模板

      var userEle = "<p style=\"margin:5px 0;\">".concat(ruid, "</p><p style=\"margin:0;overflow-x:scroll;word-wrap:unset;word-break:keep-all;\">\u8A02\u55AE\u865F:").concat(transferno, "</p>"); // console.log(timeEle)

      arr.push([timeEle, userEle, gold]);
    });
    return arr;
  },
  transferIn: function transferIn(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var transfer = data.result.transfer;
    var arr = [];
    transfer.forEach(function (item) {
      var addtime = item.addtime,
          gold = item.gold,
          transferno = item.transferno,
          uid = item.uid; // 將後端時間, 切割成兩塊, 並拼接爲 html 模板

      var timeCut = addtime.split(' ');
      var timeEle = '';
      timeCut.forEach(function (item) {
        timeEle += "<p style=\"margin:0;\">".concat(item, "</p>");
      }); // 將 id 和 訂單號 拼接爲 新的 html模板

      var userEle = "<p style=\"margin:5px 0;\">".concat(uid, "</p><p style=\"margin:0;overflow-x:scroll;word-wrap:unset;word-break:keep-all;\">\u8A02\u55AE\u865F:").concat(transferno, "</p>"); // console.log(timeEle)

      arr.push([timeEle, userEle, gold]);
    });
    return arr;
  },
  getOrders: function getOrders(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result = data.result,
        gold = _data$result.gold,
        usd = _data$result.usd,
        ordersn = _data$result.ordersn,
        receipt_fine = _data$result.receipt_fine,
        grab_sheet = _data$result.grab_sheet;
    var orders = [];
    receipt_fine.forEach(function (item) {
      var original_gold = item.original_gold,
          commission = item.commission,
          still_gold = item.still_gold,
          addtime = item.addtime;
      orders.push({
        time: addtime,
        startMoney: original_gold,
        commission: commission,
        rebackMoneyCurrent: still_gold
      });
    });
    return {
      list: orders,
      money: gold,
      usdMoney: usd,
      orderSn: ordersn,
      grab_sheet: grab_sheet
    };
  },
  exchangeNow: function exchangeNow(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result2 = data.result,
        gold = _data$result2.gold,
        min = _data$result2.min,
        max = _data$result2.max,
        content = _data$result2.content;
    return {
      money: gold,
      min: min,
      max: max,
      content: content
    };
  },
  exchangeSubmit: function exchangeSubmit(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.result.message
    };
  },
  startGetOrders: function startGetOrders(data) {
    if (mistake(data)) return false;
    return {
      msg: data.result.message
    };
  },
  getOrdersList: function getOrdersList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var receipt = data.data;
    var list = [];
    receipt.forEach(function (item) {
      var id = item.id,
          orderNo = item.orderNo,
          orderMoney = item.orderMoney,
          payMoney = item.payMoney,
          memberId = item.memberId,
          posId = item.posId,
          createTime = item.createTime,
          completeTime = item.completeTime,
          payType = item.payType,
          payStatus = item.payStatus,
          notifyUrl = item.notifyUrl,
          commission = item.commission;
      list.push({
        id: id,
        orderNo: orderNo,
        orderMoney: orderMoney,
        payMoney: payMoney,
        memberId: memberId,
        posId: posId,
        createTime: createTime,
        completeTime: completeTime,
        payType: payType,
        payStatus: payStatus,
        notifyUrl: notifyUrl,
        commission: commission
      });
    });
    return list;
  },
  collectionList: function collectionList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var receipt = data.data;
    var list = [];
    receipt.forEach(function (item) {
      var id = item.id,
          orderNo = item.orderNo,
          orderMoney = item.orderMoney,
          payMoney = item.payMoney,
          memberId = item.memberId,
          posId = item.posId,
          createTime = item.createTime,
          completeTime = item.completeTime,
          payType = item.payType,
          payStatus = item.payStatus,
          notifyUrl = item.notifyUrl,
          commission = item.commission,
          accountNumber = item.accountNumber,
          realName = item.realName,
          bankName = item.bankName,
          cardNumber = item.cardNumber;
      list.push({
        id: id,
        orderNo: orderNo,
        orderMoney: orderMoney,
        payMoney: payMoney,
        memberId: memberId,
        posId: posId,
        createTime: createTime,
        completeTime: completeTime,
        payType: payType,
        payStatus: payStatus,
        notifyUrl: notifyUrl,
        commission: commission,
        accountNumber: accountNumber,
        realName: realName,
        bankName: bankName,
        cardNumber: cardNumber
      });
    });
    return list;
  },
  sdRedenvelopes: function sdRedenvelopes(data) {
    console.log(data);
    if (mistake(data)) return false;
    var _data$result3 = data.result,
        redlist = _data$result3.redlist,
        total = _data$result3.total;
    return {
      redlist: redlist,
      total: total
    };
  },
  sdRedenvelopesStart: function sdRedenvelopesStart(data) {
    console.log(data);
    if (mistake(data)) return false;
    return {
      msg: data.result.message
    };
  },
  sdRedenvelopesList: function sdRedenvelopesList(data) {
    if (mistake(data)) return false;
    var list = data.result.list;
    return {
      list: list
    };
  },
  getOrdersDetail: function getOrdersDetail(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result4 = data.result,
        receipt = _data$result4.receipt,
        receipt_fine = _data$result4.receipt_fine;
    var addtime = receipt.addtime,
        still_gold = receipt.still_gold;
    var list = [];
    receipt_fine.forEach(function (item) {
      var addtime = item.addtime,
          commission = item.commission,
          original_gold = item.original_gold,
          still_gold = item.still_gold;
      list.push({
        time: addtime,
        commission: commission,
        originMoney: original_gold,
        rebackMoney: still_gold
      });
    });
    return {
      head: {
        time: addtime,
        rebackMoney: still_gold
      },
      list: list
    };
  },
  exchangeList: function exchangeList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result5 = data.result,
        gold_total = _data$result5.gold_total,
        exchange_list = _data$result5.exchange_list;
    var list = [];
    exchange_list.forEach(function (item) {
      var ordersn = item.ordersn,
          addtime = item.addtime,
          gold = item.gold;
      list.push({
        orderSn: ordersn,
        time: addtime,
        money: gold
      });
    });
    return {
      total: gold_total,
      list: list
    };
  },
  capital: function capital(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$data5 = data.data,
        freezeDeposit = _data$data5.freezeDeposit,
        totalDeposit = _data$data5.totalDeposit,
        rotationChartList2 = _data$data5.rotationChartList2,
        member = _data$data5.member,
        totalCommission = _data$data5.totalCommission,
        dayCommission = _data$data5.dayCommission,
        commissionRank = _data$data5.commissionRank,
        rotationChart1 = _data$data5.rotationChart1,
        usableDeposit = _data$data5.usableDeposit;
    var id = member.id,
        nickName = member.nickName,
        tel = member.tel,
        headpic = member.headpic,
        createTime = member.createTime,
        bcType = member.bcType,
        total_receivables = member.total_receivables,
        agentid = member.agentid;
    var images = [];
    var images1 = [];
    rotationChart1.forEach(function (item) {
      var id = item.id,
          pic = item.pic,
          level = item.level,
          linkUrl = item.linkUrl;
      images.push({
        img: pic,
        level: level,
        linkUrl: linkUrl
      });
    });
    rotationChartList2.map(function (item) {
      var id = item.id,
          pic = item.pic,
          level = item.level,
          linkUrl = item.linkUrl;
      images1.push({
        img: pic,
        level: level,
        linkUrl: linkUrl
      });
    });
    return {
      freezeDeposit: freezeDeposit,
      //	冻结押金
      totalDeposit: totalDeposit,
      //总押金
      totalCommission: totalCommission,
      //	押金排行
      usableDeposit: usableDeposit,
      // 可用押金
      nickName: nickName,
      //商户名
      headpic: headpic,
      //头像
      images: images,
      //层级1的轮播图对象
      images1: images1,
      //层级2的轮播图对象
      commissionRank: commissionRank,
      //排行榜
      dayCommission: dayCommission,
      //今日佣金
      bcType: bcType //码商类型

    };
  },
  sdrankingList: function sdrankingList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var list = data.result.list;
    return list;
  },
  pyList: function pyList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var list = [];
    data.result.goldrecord.forEach(function (item) {
      var gold = item.gold,
          addtime = item.addtime,
          paytype = item.paytype;
      list.push({
        money: Number(gold),
        time: addtime,
        typeName: paytype
      });
    });
    return list;
  },
  incomeList: function incomeList(data) {
    // console.log(data)
    if (mistake(data)) return false; // let {receipt_gold, receipt} = data.data

    var list = [];
    data.data.forEach(function (item) {
      var id = item.id,
          orderId = item.orderId,
          memberId = item.memberId,
          posId = item.posId,
          money = item.money,
          beforeMoney = item.beforeMoney,
          afterMoney = item.afterMoney,
          remake = item.remake,
          payType = item.payType,
          createTime = item.createTime,
          flowType = item.flowType;
      list.push({
        orderId: orderId,
        createTime: createTime,
        commiss: money
      });
    });
    return {
      // total: receipt_gold,
      list: list
    };
  },
  incomeListTeam: function incomeListTeam(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result6 = data.result,
        receipt_gold = _data$result6.receipt_gold,
        receipt = _data$result6.receipt;
    var list = [];
    receipt.forEach(function (item) {
      var sumgold = item.sumgold,
          addtime = item.addtime,
          ordersn = item.ordersn,
          ruid = item.ruid;
      list.push({
        orderSn: ordersn,
        time: addtime,
        money: sumgold,
        id: ruid
      });
    });
    return {
      total: receipt_gold,
      list: list
    };
  },
  streamDetail: function streamDetail(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$result7 = data.result,
        gold_total = _data$result7.gold_total,
        exchange_list = _data$result7.exchange_list;
    var list = [];
    exchange_list.forEach(function (item) {
      var water_gold = item.water_gold,
          addtime = item.addtime,
          ordersn = item.ordersn;
      list.push({
        orderSn: ordersn,
        time: addtime,
        money: water_gold
      });
    });
    return {
      total: gold_total,
      list: list
    };
  },
  toCertificate: function toCertificate(data) {
    console.log(data);
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  certification: function certification(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  certificationDetail: function certificationDetail(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var list = data.data;
    return {
      list: list
    };
  },
  invite: function invite(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$data6 = data.data,
        url = _data$data6.url,
        qrcodeUrl = _data$data6.qrcodeUrl;
    return {
      url: url,
      qrcodeUrl: qrcodeUrl
    };
  },
  team: function team(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$data7 = data.data,
        num = _data$data7.num,
        members = _data$data7.members;

    if (members == null) {
      return '没有数据';
    } else {
      var list = [];
      members.forEach(function (item) {
        var id = item.id,
            nickName = item.nickName,
            tel = item.tel,
            headpic = item.headpic,
            createTime = item.createTime,
            bcType = item.bcType,
            address = item.address,
            agentid = item.agentid,
            idCardNo = item.idCardNo;
        list.push({
          id: id,
          nickName: nickName,
          tel: tel,
          // headpic,
          createTime: createTime,
          bcType: bcType,
          address: address,
          agentid: agentid,
          idCardNo: idCardNo
        });
      });
      return {
        num: num,
        list: list
      };
    }
  },
  teamDirect: function teamDirect(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var arrdown = data.result.arrdown;
    var list = [];
    arrdown.forEach(function (item) {
      var realname = item.realname,
          mobile = item.mobile,
          meet = item.meet;
      list.push({
        name: realname || '未實名',
        mobile: "".concat(mobile[0]).concat(mobile[1]).concat(mobile[2], "****").concat(mobile[mobile.length - 4]).concat(mobile[mobile.length - 3]).concat(mobile[mobile.length - 2]).concat(mobile[mobile.length - 1]),
        // level: `V${level}`,
        status: parseInt(meet) ? '已接單' : '休息中'
      });
    });
    return list;
  },
  changePwdOfLogin: function changePwdOfLogin(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  changePwdOfPay: function changePwdOfPay(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  changePwdverify: function changePwdverify(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  announcement: function announcement(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return data.data;
  },
  announcementDetail: function announcementDetail(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      content: data.data.noticeTitle
    };
  },
  feedback: function feedback(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var feedback = data.result.feedback;
    var actions = [];
    feedback.forEach(function (item) {
      var id = item.id,
          title = item.title;
      actions.push({
        name: title,
        id: id
      });
    });
    return actions;
  },
  sendFeedback: function sendFeedback(data) {
    // console.log(data)
    if (mistake(data)) return false;
    return {
      msg: data.result.message
    };
  },
  feedbackList: function feedbackList(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var feedback_list = data.result.feedback_list;
    var list = [];
    feedback_list.forEach(function (item) {
      var addtime = item.addtime,
          content = item.content,
          thumb = item.thumb,
          title = item.title;
      var images = thumb ? thumb.split(',') : [];
      list.push({
        type: title,
        time: addtime,
        content: content,
        images: images
      });
    });
    return list;
  },
  sdOrder: function sdOrder(data) {
    if (mistake(data)) return false; // console.log(data)

    var sdOrder = data.result;
    var status = data.status;
    return {
      sdOrder: sdOrder,
      status: status
    };
  },
  submission: function submission(data) {
    if (mistake(data)) return false;
    return {
      msg: data.result.message
    };
  },
  sdcustomerService: function sdcustomerService(data) {
    if (mistake(data)) return false;
    var _data$data8 = data.data,
        wechatQrcode = _data$data8.wechatQrcode,
        wechatNumber = _data$data8.wechatNumber,
        qqQrcode = _data$data8.qqQrcode,
        qqNumber = _data$data8.qqNumber;
    return {
      wechatQrcode: wechatQrcode,
      wechatNumber: wechatNumber,
      qqQrcode: qqQrcode,
      qqNumber: qqNumber
    };
  },
  payabnormal: function payabnormal(data) {
    if (mistake(data)) return false;
    var list = data.data;
    return list;
  },
  collabnormal: function collabnormal(data) {
    if (mistake(data)) return false;
    var list = data.data;
    return list;
  },
  checkedCode: function checkedCode(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var _data$data9 = data.data,
        bankCard = _data$data9.bankCard,
        qrCode = _data$data9.qrCode,
        isPerfect = _data$data9.isPerfect;
    return {
      bankCard: bankCard,
      qrCode: qrCode,
      isPerfect: isPerfect
    };
  },
  // 代收订单确认来款
  sureOrdersList: function sureOrdersList(data) {
    if (mistake(data)) return false;
    return {
      code: data.code,
      msg: data.msg
    };
  },
  // 代付订单确认打款
  sureCollectionList: function sureCollectionList(data) {
    if (mistake(data)) return false;
    return {
      code: data.code,
      msg: data.msg
    };
  },
  person: function person(data) {
    console.log(data);
    if (mistake(data)) return false;
    return {
      msg: data.msg
    };
  },
  getInformation: function getInformation(data) {
    console.log(data);
    if (mistake(data)) return false;
    var _data$data10 = data.data,
        idCardNo = _data$data10.idCardNo,
        name = _data$data10.name,
        headPic = _data$data10.headPic;
    return {
      idCardNo: idCardNo,
      name: name,
      headPic: headPic
    };
  },
  uploadercollec: function uploadercollec(data) {
    if (mistake(data)) return false; // console.log(data)

    var imgurl = data.data; // console.log(imgurl)

    return imgurl;
  },
  playHelp: function playHelp(data) {
    // console.log(data)
    if (mistake(data)) return false;
    var list = data.data;

    if (list == null) {
      return {};
    } else {
      return list;
    }
  },
  orderPay: function orderPay(data) {
    if (mistake(data)) return false;
    var list = data.data;

    if (list == null) {
      return {};
    } else {
      return list;
    }
  },
  orderCollect: function orderCollect(data) {
    if (mistake(data)) return false;
    var list = data.data;

    if (list == null) {
      return {};
    } else {
      return list;
    }
  }
};
exports["default"] = _default;
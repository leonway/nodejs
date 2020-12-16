'use strict';

const moment = require('moment');
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

// 统一应答
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 200;
};

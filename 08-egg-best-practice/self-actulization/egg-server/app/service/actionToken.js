'use strict';
const Service = require('egg').Service;

class ActionTokenService extends Service {
  async apply(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 100) + (60 * 60 * 24),
    }, ctx.app.config.jwt.secret);
  }
}

module.exports = ActionTokenService
;

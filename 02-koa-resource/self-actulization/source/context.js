const util = require('util');

module.exports = {
  get url(){
    return this.request.url
  },
  get body(){
    return this.response.body
  },
  set body(val){
    this.response.body = val
  },
  get method(){
    return this.request.method
  },
  /**
   * Default error handling.
   *
   * @param {Error} err
   * @api private
   */

  onerror(err) {
    // don't do anything if there is no error.
    // this allows you to pass `this.onerror`
    // to node-style callbacks.
    console.log('ctx -onerror');
    console.log(err);
    if (null == err) return;

    // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
    // See https://github.com/koajs/koa/issues/1466
    // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
    const isNativeError =
      Object.prototype.toString.call(err) === '[object Error]' ||
      err instanceof Error;
    if (!isNativeError) err = new Error(util.format('non-error thrown: %j', err));

    let headerSent = false;
    if (this.headerSent || !this.writable) {
      headerSent = err.headerSent = true;
    }

    // delegate
    this.app.emit('error', err, this);

    // nothing we can do here other
    // than delegate to the app-level
    // handler and log.
    if (headerSent) {
      return;
    }

    const { res } = this;

    // first unset all headers
    /* istanbul ignore else */
    if (typeof res.getHeaderNames === 'function') {
      res.getHeaderNames().forEach(name => res.removeHeader(name));
    } else {
      res._headers = {}; // Node < 7.7
    }

    // then set those specified
    this.set(err.headers);

    // force text/plain
    this.type = 'text';

    let statusCode = err.status || err.statusCode;

    // ENOENT support
    if ('ENOENT' === err.code) statusCode = 404;

    // default to 500
    if ('number' !== typeof statusCode || !statuses[statusCode]) statusCode = 500;

    // respond
    const code = statuses[statusCode];
    const msg = err.expose ? err.message : code;
    this.status = err.status = statusCode;
    this.length = Buffer.byteLength(msg);
    res.end(msg);
  },
}

'use strict';

/**
 * response 格式化中间件
 */

module.exports = () => async (ctx, next) => {
  try {
    await next();
    ctx.body = {
      success: true,
      data: ctx.body,
      message: null,
    };
  } catch (err) {
    ctx.coreLogger.error('[server error]: ', JSON.stringify(ctx.request.method), JSON.stringify(ctx.request.originalUrl),
      JSON.stringify(ctx.status), JSON.stringify(ctx.reqParam), err);
      console.log('status ........', err, ctx.status)
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: err.data || null,
      message: err.message,
    };
  }
};

'use strict';

module.exports = () => async (ctx, next) => {
  if (process.env.NODE_ENV === 'development') {
    // 开发环境先写死userId
    ctx.state.userId = 10175;
  } else {
    const sessionId = ctx.cookies.get('SID', { signed: false });
    if (!sessionId) {
      // cookie过期
      ctx.status = 401
      ctx.body = {
        success: false,
        message: '请重新登录',
        data: '',
      };
      return;
    }
  }
  await next();
};
 
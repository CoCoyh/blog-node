'use strict';

module.exports = () => async (ctx, next) => {
  if (process.env.NODE_ENV === 'development') {
    // 开发环境先写死userId
    ctx.state.userId = '5d7a0772057d5f9e70613f68';
  } else {
    const sessionId = ctx.cookies.get('SID', { signed: false });
    if (!sessionId) {
      // cookie过期
      ctx.status = 401
      ctx.body = {
        success: false,
        message: '你还未登陆或登陆信息已过期，请重新登录',
        data: '',
      };
      return;
    }
    ctx.state.userId = sessionId;
  }
  await next();
};
 
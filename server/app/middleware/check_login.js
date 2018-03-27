module.exports = () => {
  return async function checkLogin(ctx, next) {
    if (!ctx.request.url.includes('api/user') && !ctx.cookies.get('jwt_token')) {
      ctx.status = 200;
      ctx.body = {
        status: 598,
        message: '登录失效，请先登录！'
      };
    }
    await next();
  };
};

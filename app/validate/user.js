'use strict';

module.exports = app => {
  let { validator } = app;
  // 校验用户名是否正确
  validator.addRule('name', (rule, value) => {
    if (!value) {
      return '用户名不可为空';
    }
    if (/^\d+$/.test(value)) {
      return '用户名必须是字符串';
    }
    if (value.length < 3 || value.length > 10) {
      return '用户名的长度应该在3～10之间';
    }
  });
  validator.addRule('phone', (rule, value) => {
    if (value && !/^1[3456789]\d{9}$/.test(value)) {
      return '手机号吗有无，请重填';
    }
  })
}
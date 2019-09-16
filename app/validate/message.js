'use strict';

module.exports = app => {
  let { validator } = app;
  validator.addRule('phone', (rule, value) => {
    if (value && !/^1[3456789]\d{9}$/.test(value)) {
      return '手机号码格式错误，请重填';
    }
  })
}
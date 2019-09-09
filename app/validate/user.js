'use strict';

module.exports = app => {
  let { validator } = app;
  // 校验用户名是否正确
  validator.addRule('userName', (rule, value) => {
    console.log('rule => ', rule);
    if (/^\d+$/.test(value)) {
      return '用户名必须是字符串';
    }
    if (value.length < 3 || value.length > 10) {
      return '用户名的长度应该在3～10之间';
    }
  });
  
}
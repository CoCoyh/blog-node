'use strict';

module.exports = app => {
  const { validator } = app;
  // 校验标题
  validator.addRule('title', (rule, value) => {
    if (!value) {
      return '标题不可为空';
    }
    if (/^\d+$/.test(value)) {
      return '标题必须是字符串';
    }
    if (value.length < 1 || value.length > 20) {
      return '标题的长度须在1～20之间';
    }
  });
  // 校验内容
  validator.addRule('content', (rule, value) => {
    if (!value) {
      return '内容不可为空';
    }
    if (/^\d+$/.test(value)) {
      return '内容必须是字符串';
    }
    if (value.length < 1 || value.length > 200) {
      return '内容的长度须在1～200之间';
    }
  });
}
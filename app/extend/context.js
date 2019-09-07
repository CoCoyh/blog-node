'use strict';

const BAR = Symbol('Context#bar');

module.exports = {
  get bar() {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    if (!this[BAR]) {
      this[BAR] = this.get('x-bar');
    }
    return this[BAR];
  }
}
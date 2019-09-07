'use strict';

module.exports = {
  set foo(value) {
    this.set('x-reponse-foo', value);
  }
}
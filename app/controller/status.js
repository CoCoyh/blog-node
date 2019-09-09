const { Controller } = require('egg');

class StatusController extends Controller {
  async test() {
    return 'hi, egg';
  }
}

module.exports = StatusController;

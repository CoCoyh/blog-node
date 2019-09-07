'use strict';

const { Controller } = require("egg");

class UserController extends Controller {
  /**
   * 用户登陆（管理后台和博客）
   */
  async login() {
  }
  
  /**
   * 用户登出
   */
  async logout() {

  }

  /**
   * 用户注册
   */
  async register() {

  }

  /**
   * 获取当前用户信息（后台管理员）
   */

   async currentUser() {

   }

   /**
    * 获取登陆用户（博客系统）
    */
   async getUser() {
     
   }

   /**
    * 获取用户列表（管理后台）
    */
   async getUserList() {

   }

   /**
    * 删除用户（管理后台）
    */
  async deleteUser() {

  }
  
}

module.exports = UserController;
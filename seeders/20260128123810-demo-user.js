'use strict';
const fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */let dataUser = JSON.parse(await fs.readFile('./users.json',"utf8"))
   dataUser.forEach(user => {
      delete user.id
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Users",dataUser)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * 
     */
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};

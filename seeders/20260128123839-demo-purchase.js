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
    */
   let dataPurchase = JSON.parse(await fs.readFile('./purchases.json',"utf8"))
   dataPurchase.forEach(purchase => {
      delete purchase.id
      purchase.createdAt = new Date()
      purchase.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Purchases",dataPurchase)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Purchases', null, {});
  }
};

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
    let dataProfile = JSON.parse(await fs.readFile('./profiles.json',"utf8"))
   dataProfile.forEach(profile => {
      delete profile.id
      profile.createdAt = new Date()
      profile.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Profiles",dataProfile)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Profiles', null, {});
  }
};

'use strict';

const { Image } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        userId: 1,
        imageableType: 'question',
        imageableId: 1,
        url: 'url 1'
      },
      {
        userId: 2,
        imageableType: 'question',
        imageableId: 2,
        url: 'url 2'
      },
      {
        userId: 1,
        imageableType: 'answer',
        imageableId: 1,
        url: 'url 3'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageableType: { [Op.in]: ['question', 'answer'] }
    }, {});
  }
};

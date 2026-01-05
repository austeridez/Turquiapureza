const bannerModal = require('../modals/banner.modal');

module.exports = {
  customId: 'design_banner',

  async execute(interaction) {
    await bannerModal.execute(interaction);
  }
};
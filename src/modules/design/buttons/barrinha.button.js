const barrinhaModal = require('../modals/barrinha.modal');

module.exports = {
  customId: 'design_barrinha',

  async execute(interaction) {
    await barrinhaModal.execute(interaction);
  }
};
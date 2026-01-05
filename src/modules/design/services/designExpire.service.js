const { EXPIRE_MS } = require('../design.constants');

module.exports = {
  schedule(message) {
    setTimeout(async () => {
      try {
        await message.delete();
      } catch (_) {}
    }, EXPIRE_MS);
  }
};
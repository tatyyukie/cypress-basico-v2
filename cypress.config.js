const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {},
  }
});

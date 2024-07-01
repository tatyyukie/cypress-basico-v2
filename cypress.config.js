const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1280,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {},
  }
});

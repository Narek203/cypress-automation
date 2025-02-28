const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Enable Allure
      return config;
    },
    env: {
      allure: true, // Ensure Allure reporting is enabled
      allureResults: "allure-results"
    }
  }
});

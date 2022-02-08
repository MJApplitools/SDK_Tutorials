"use strict"
const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder } = require('selenium-webdriver');

async function main() {

    const caps = {
        platformName: 'Android',
        browserName: '',
        'appium:app': 'storage:filename=app-debug.apk',
        'appium:deviceName': 'Google Pixel 4 GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'sauce:options': {
          appiumVersion: '1.22.1',
        }
      }
    const driver = await new Builder().usingServer("http://" + process.env.SAUCE_USERNAME + ":" + process.env.SAUCE_ACCESS_KEY + "@ondemand.us-west-1.saucelabs.com/wd/hub").withCapabilities(caps).build();

    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    try {
        await eyes.open(driver, "JS Appium Test Sauce", "Test");
        await eyes.check(Target.window());
        await eyes.close();
    } finally {
        await driver.quit();
        await eyes.abortIfNotClosed();
    }
}
main();
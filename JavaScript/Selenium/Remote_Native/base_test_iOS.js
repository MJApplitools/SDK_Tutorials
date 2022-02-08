"use strict"
const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder } = require('selenium-webdriver');

async function main() {

    const caps = {
        platformName: 'iOS',
        'appium:app': 'storage:filename=iOSTestApp.zip',
        'appium:deviceName': 'iPhone 13 Pro Max Simulator',
        'appium:platformVersion': '15.0',
        browserName: '',
        'sauce:options': {
            appiumVersion: '1.22.0',
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
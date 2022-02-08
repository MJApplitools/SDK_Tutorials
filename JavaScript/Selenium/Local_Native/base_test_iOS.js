"use strict"
const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder } = require('selenium-webdriver');

async function main() {
    const desiredCaps = {
        browserName: '', 
        deviceName: 'iPhone X',
        platformVersion: '15.2',
        platformName: 'iOS',
        app: __dirname + '/../../apps/iOSTestApp.zip',
        automationName: 'XCUITest'
    };
    const driver = await new Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();

    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    try {
        await eyes.open(driver, "JS Appium Test", "My first Appium native JS test!");
        await eyes.check(Target.window());
        await eyes.close();
    } finally {
        await driver.quit();
        await eyes.abortIfNotClosed();
    }

}
main();
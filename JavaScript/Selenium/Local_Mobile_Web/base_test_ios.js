"use strict"
const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder} = require('selenium-webdriver');

async function main() {
    const desiredCaps = {
        browserName: 'safari', 
        deviceName: 'iPhone X',
        platformVersion: '15.2',
        platformName: 'iOS',
        automationName: 'XCUITest'
    };
    const driver = await new Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();

    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    try {
        await driver.get("https://example.com");
        await eyes.open(driver, "JS Appium Test iOS", "JS Appium Web iOS");
        await eyes.check(Target.window());
        await eyes.close();
    } finally {
        await driver.quit();
        await eyes.abortIfNotClosed();
    }

}
main();
"use strict"
const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder } = require('selenium-webdriver');

async function main() {
    const desiredCaps = {
        browserName: '', 
        deviceName: 'Pixel3XL',
        platformVersion: '11.0',
        platformName: 'Android',
        app: __dirname + '/../../apps/app-debug.apk',
        automationName: 'UIAutomator2'
    };
    const driver = await new Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();

    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    try {
        await eyes.open(driver, "JS Appium Test Android", "My first Appium native JS test!");
        await eyes.check(Target.window());
        await eyes.close();
    } finally {
        await driver.quit();
        await eyes.abortIfNotClosed();
    }
}
main();
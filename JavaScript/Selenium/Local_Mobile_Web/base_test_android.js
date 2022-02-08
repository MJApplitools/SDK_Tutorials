"use strict"
const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder } = require('selenium-webdriver');
const { Options, Chrome } = require("selenium-webdriver/chrome");
const path = require('chromedriver').path;

async function main() {
    
    const desiredCaps = {
        browserName: 'Chrome', 
        deviceName: 'Pixel3XL',
        platformVersion: '11.0',
        platformName: 'Android',
        automationName: 'UIAutomator2',
        chromedriverExecutable: path,
    };
    const driver = await new Builder()
        .usingServer("http://localhost:4723/wd/hub")
        .withCapabilities(desiredCaps)
        .build();
    console.log(driver.getCapabilities());

    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    try {
        await driver.get("https://example.com");
        await eyes.open(driver, "JS Appium Web Android", "Appium Web JS Android");
        await eyes.check(Target.window());
        await eyes.close();
    } finally {
        await driver.quit();
        await eyes.abortIfNotClosed();
    }
}
main();
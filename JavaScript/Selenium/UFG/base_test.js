
'use strict';
const { Builder, Capabilities } = require('selenium-webdriver');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, DeviceName, ScreenOrientation, ConsoleLogHandler, RunnerOptions } = require('@applitools/eyes-selenium');

(async () => {
    const driver = new Builder()
        .withCapabilities(Capabilities.chrome())
        .build();

    const eyes = new Eyes(new VisualGridRunner(new RunnerOptions().testConcurrency(5)));
    eyes.setLogHandler(new ConsoleLogHandler(true))
    const config = new Configuration();
    config.setApiKey(process.env.APPLITOOLS_API_KEY);

    config.setAppName('JS UFG');
    config.setTestName('JS UFG');
    config.setViewportSize({width: 1400, height: 800})

    config.addBrowser(1800, 1800, BrowserType.CHROME);
    config.addBrowser(700, 500, BrowserType.CHROME);
    config.addBrowser(1200, 800, BrowserType.FIREFOX);
    config.addBrowser(1600, 1200, BrowserType.FIREFOX);
    config.addDeviceEmulation(DeviceName.iPhone_4, ScreenOrientation.PORTRAIT);
    eyes.setConfiguration(config);

    try {
        await eyes.open(driver);
        await driver.get('https://example.com');
        await eyes.check("Check", Target.window()); 
        await eyes.closeAsync();
        await eyes.getRunner().getAllTestResults();

    } catch (e) {
        console.error(e);
    } finally {
        await driver.quit();
        await eyes.abortIfNotClosed();
    }
})();


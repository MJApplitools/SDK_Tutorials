const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder, Capabilities } = require('selenium-webdriver');

async function main() {

    let driver = await new Builder().withCapabilities(Capabilities.chrome()).build();
    let eyes = new Eyes();
    // eyes.setLogHandler(new ConsoleLogHandler(true));
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    try {
        await driver.get("https://example.com"); 
        driver = await eyes.open(driver, "Tutorials", "Base JS Test", {width: 1200, height: 800});
        await eyes.check(Target.window());   
        await eyes.close(false);
    } finally {
        // console.log(await eyes.getRunner().getAllTestResults());
        await eyes.getRunner().getAllTestResults()
        await driver.quit();
        eyes.abortIfNotClosed();
    }
}
main();
const { test } = require('@playwright/test');
const {
  VisualGridRunner,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-playwright');

test.describe('Demo App - Ultrafast', () => {
  let eyes, runner;
  
  test.beforeEach(async () => {
    runner = new VisualGridRunner({
      testConcurrency: 5
    });
    eyes = new Eyes(runner);
    const configuration = new Configuration();
    configuration.setBatch(new BatchInfo('Demo Batch - Playwright - Ultrafast'));
    configuration.addBrowser(800, 600, BrowserType.CHROME);
    configuration.addBrowser(700, 500, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 1200, BrowserType.IE_11);
    configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
    configuration.addBrowser(800, 600, BrowserType.SAFARI);
    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    eyes.setConfiguration(configuration);

  });

  test('Smoke Test', async ({ page }) => {
    await page.goto('https://demo.applitools.com');
    await eyes.open(page, 'Demo App - Playwright - Ultrafast', 'Smoke Test - Playwright - Ultrafast');
    await eyes.check('Login Window', Target.window().fully());
    await page.click('#log-in');
    await eyes.check('App Window', Target.window().fully());
    await eyes.close(false);
  });

  test.afterEach(async () => {
    await eyes.abort();
    const results = await runner.getAllTestResults(false);
    console.log('Ultrafast Results', results);
  });
});
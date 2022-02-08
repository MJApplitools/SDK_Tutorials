const { test } = require('@playwright/test');
const { Eyes, Target } = require('@applitools/eyes-playwright')

test.describe('Demo App - Basic', () => {
  let eyes;

  test.beforeEach(async () => {
    eyes = new Eyes();
    eyes.setBatch({ name: 'Demo Batch - Playwright - Basic' });
  });

  test('Smoke Test', async ({ page }) => {
    await page.goto('https://demo.applitools.com');
    await eyes.open(page, 'Demo App - Playwright - Basic', 'Smoke Test - Playwright - Basic')
    await eyes.check('Login Window', Target.window().fully());
    await page.click('#log-in');
    await eyes.check('App Window', Target.window().fully());
    const results = await eyes.close();
    console.log('Basic Results', results);
  });

  test.afterEach(async () => {
    await eyes.abort();
  });
});
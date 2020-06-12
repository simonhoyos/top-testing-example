import puppeteer from 'puppeteer';

describe('App', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should render home view after signup', async () => {
    // const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000');

    await page.waitForSelector('[href="/signup"]');
    await page.click('[href="/signup"]');
    await page.waitForSelector('#email');

    await page.type('#email', 'test@test.com', { delay: 100 });
    await page.type('#password', '12345', { delay: 100 });
    await page.click('button');

    await page.waitForSelector('.tasks > h1');
    const message = await page.$eval('.tasks > p', el => el.innerHTML);

    expect(message).toMatch(/No tasks created yet/);
    page.close();
  });

  it('should render home when logged in', async () => {
    const page = await browser.newPage();

    await page.goto('http://localhost:3000');

    await page.waitForSelector('.tasks > h1');
  });
});

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

  it('should create task and list user tasks', async () => {
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/create');

    await page.waitForSelector('#name');
    await page.type('#name', 'task 1', { delay: 100 });
    await page.click('button');
    await page.waitForSelector('.success-message');

    const message = await page.$eval('.success-message', el => el.innerHTML);

    expect(message).toMatch('Task created successfully');

    await page.reload();
    await page.type('#name', 'task 2', { delay: 100 });
    await page.click('button');

    await page.goto('http://localhost:3000');
    await page.screenshot({ path: './image.png' });

    await page.waitForSelector('.task');
    const tasks = await page.$$('.task');

    expect(tasks).toHaveLength(2);
  });
});

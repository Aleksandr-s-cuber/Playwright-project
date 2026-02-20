const { chromium } = require("playwright");






(async() => {
    const browser = await chromium.launch({headless: false});

    const page = await browser.newPage();

    await page.goto("https://netology.ru");

    await page.click("text=Каталог курсов");

    //await page.click("text=Все курсы");

    await page.pause();

    //assertion

    browser.close();

})();
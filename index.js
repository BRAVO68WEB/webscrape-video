const puppeteer = require("puppeteer");

const scraper = async (VideoUrl) => {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto(VideoUrl, {
      waitUntil: "networkidle0",
    });
    const [el] = await page.$x("/html/body/div[2]/div/div/div[2]/video/source");
    const src = await el.getProperty("src");
    const hostUrl = await src.jsonValue();
    await browser.close();
    return { hostUrl };
  } catch (err) {
    console.error(err);
  }
};
const gotit = async (url) => {
  await scraper(url).then((vidUrl) => {
    console.log(vidUrl);
  });
  // await console.log(url);
};

gotit("https://yugenani.me/e/MzE5M3wxfGR1Yg==/");

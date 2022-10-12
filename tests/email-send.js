const chrome = require('selenium-webdriver/chrome');
const {Builder, Browser, By } = require('selenium-webdriver');

const screen = {
  width: 1920,
  height: 1080
};

(async function emailSendTest() {
    
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .build();

  try {
    await driver.get('http://localhost:3000');
    let didSendButtonRender = await driver.findElement(By.id('sendbutton')).isDisplayed()
    
    if (!didSendButtonRender){
      throw new Error(`Send button was not rendered properly.`);
    }
 
    await driver.findElement(By.id('email')).sendKeys("sampleapptest@mailsac.com");
    await driver.findElement(By.id('comment')).sendKeys("This is some text from our Selenium test.");
    await driver.findElement(By.id('sendbutton')).click();

  } finally {
    await driver.quit();
  }
})();
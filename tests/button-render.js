const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://localhost:4444/wd/hub');
    let didSendButtonRender = await driver.findElement(By.id('sendbutton')).isDisplayed()
    if (!didSendButtonRender){
      throw new Error(`Send button was not rendered properly.`);
    }
 
  } finally {
    await driver.quit();
  }
})();
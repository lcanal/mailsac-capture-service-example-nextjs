const chrome = require('selenium-webdriver/chrome');
const {Builder, Browser, By, until } = require('selenium-webdriver');

const screen = {
    width: 1920,
    height: 1080
  };

(async function externalLogin() {
  // let driver = await new Builder().forBrowser(Browser.CHROME).build();
  let driver = await new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeOptions(new chrome.Options().headless().windowSize(screen))
  .build();


  try {
    await driver.get('https://dev.to');
    await driver.findElement(By.linkText('Log in')).click();
    await driver.wait(until.titleContains('Welcome - DEV Community'), 3000);
    await driver.findElement(By.name('commit')).click();
    await driver.wait(until.titleIs(''), 3000);
    let errorBox = await driver.findElement(By.className('registration__error-notice'));
    await driver.wait(until.elementIsVisible(errorBox));
    let errorText = await errorBox.getText();

    if (!errorText.includes('Unable to login')){
      throw new Error(`Error text does not contain expected value "${errorText}"`);
    }

  } catch(e) {
    console.error(`Error running test suite: ${e.message}`)
  }
  finally {
    await driver.quit();
  }
})();


const { Builder } = require('selenium-webdriver');

(async () => {
  let driver = await new Builder()
    .usingServer('https://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      'browserName': 'chrome',
      'bstack:options': {
        'os': 'Windows',
        'osVersion': '10',
        'projectName': 'BrowserStack Sample',
        'buildName': 'bstack-demo',
        'sessionName': 'My Test',
      }
    })
    .build();

  const executorConfig = {
    action: 'setSessionName',
    arguments: {
      name: 'Login Test - Chrome'
    }
  };

  await driver.executeScript('browserstack_executor: ' + JSON.stringify(executorConfig), []);

  await driver.get('https://www.google.com');

  const title = await driver.getTitle();
  console.log('Page title is: ' + title);

  const statusConfig = {
    action: 'setSessionStatus',
    arguments: {
      status: 'passed',
      reason: 'Title fetched successfully'
    }
  };

  await driver.executeScript('browserstack_executor: ' + JSON.stringify(statusConfig), []);

  await driver.quit();
})();

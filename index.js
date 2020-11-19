const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

const user_details = require("./test/second.json").user_details;
const tests = require("./test/second.json").user_actions;

(async function example() {
  let driver = new webdriver.Builder().forBrowser("firefox").build();

  try {
    await driver.get("http://localhost:3000/");

    await driver.manage().window().maximize();

    const actions = driver.actions({ async: true });

    {
      /*driver.executeScript("window.scrollBy(100,1000)");*/
    }

    tests.forEach((test) => {
      if (test.action === "click") {
        actions
          .pause(test.time)
          .move({ x: test.value.x, y: test.value.y })
          .press()
          .perform()
          .catch(console.log("errrrror"));
      } else if (test.action === "send_keys") {
        actions
          .pause(test.time)
          .sendKeys(test.value)
          .perform()
          .catch(console.log("eroor"));
        console.log(test.value);

        /*process.stdout.write("\u001B[2J\u001B[0;0f");*/
      }

      console.log(test);
    });
  } catch {
    console.log("there is some error");
  } finally {
    console.log("successful");
  }
})();

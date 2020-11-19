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
    let tempString = "";
    let pauseTime = 0;
    let lastAction = "";
    actions.clear();
    tests.forEach((test) => {
      if (test.action === "click") {
        lastAction = "click";
        if (tempString === "") {
          actions
            .pause(test.time)
            .move({ x: test.value.x, y: test.value.y })
            .press()
            .perform()
            .catch((err) => console.log(err));
        } else {
          actions
            .pause(pauseTime)
            .sendKeys(tempString)
            .perform()
            .catch((err) => console.log(err));
          tempString = "";
          pauseTime = 0;
        }
      } else if (test.action === "send_keys") {
        lastAction = "send_keys";
        if (tempString === "") {
          pauseTime = test.time;
        }
        tempString += test.value;
        /*actions
          .pause(test.time)
          .sendKeys(test.value)
          .perform()
          .catch((err) => console.log(err));*/
      }

      console.log(test);
    });
    if (lastAction === "send_keys") {
      actions
        .pause(pauseTime)
        .sendKeys(tempString)
        .perform()
        .catch((err) => console.log(err));
    }
  } catch {
    console.log(error);
  } finally {
    console.log("successful");
  }
})();

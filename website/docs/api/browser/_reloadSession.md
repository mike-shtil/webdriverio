---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/master/packages/webdriverio/src/commands/browser/reloadSession.js
---

Creates a new Selenium session with your current capabilities. This is useful if you
test highly stateful application where you need to clean the browser session between
the tests in your spec file to avoid creating hundreds of single test files with WDIO.
Be careful though, this command affects your test time tremendously since spawning
new Selenium sessions is very time consuming especially when using cloud services.

##### Usage

```js
browser.reloadSession()
```

##### Example

```js reloadSync.js
it('should reload my session with current capabilities', () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})
```

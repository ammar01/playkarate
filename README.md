# Playkarate Hybrid Test Tool (Work In Progress)

## Introduction
* This repository is intended to demonstrate the power of combining two test tools: Playwright and Karate API
* Playwright is an automation test tool from Microsoft that can be used to develop and execute functional front-end application tests.
* Karate API is an automation test tool from Karate Labs that allows the development and execution of automated API tests - both real APIs and mocked. 
* Combining the tools together means you can easily create mock APIs and then develop functional tests to use those mock APIs early in the development process. Once the real APIs have been created you can reconfigure those functional tests to use them with a small amount of work. 
* The application being used to demonstrate the test tool is a simple To Do List web site with a separate front-end and api back-end.
* These tests can also be used for rapid front-end validation using mocks to perform sanity tests in situations that require quick feedback - such as within a CI/CD build pipeline.   

**Please note:** 
This is a work in progress, and there are some areas that need to be improved such as selecting a more feature-rich application to demonstrate the uses, a more detailed README


## Recommended IDE
[VSCode](https://code.visualstudio.com/)

## Project Setup
```sh
npm install
```

### Install Chromium For Playwright
* By default, browser installation would place the browser in your user profile folder. Here we override that to install it in the /node_modules/core-playwright folder/.local-browsers folder
* This can make running these tests on a CI/CD server more convenient

```sh
npm run install_chromium
```

### Running the real application and tests

* In one terminal, run the front-end
```sh
npm run dev
```

* In another terminal, run the back-end
```sh
npm run api
```

* In a third terminal, run the full tests
```sh
npm run test:e2e
```


### Running the mocked application and tests

* In one terminal, run the front-end
```sh
npm run dev-mock
```

* In another terminal, run the Karate mock back-end
```sh
npm run api-mock
```

* In a third terminal, run the mocked tests
```sh
npm run test:mock
```

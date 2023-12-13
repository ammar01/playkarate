# Playwright/Karate Hybrid Test Tool (Work In Progress)

* This repo is intended to demonstrate the power of combining Playwright with Karate API. 
* Playwright is a test tool that allows the development and execution of automated functional front-end application tests.
* Karate API is a test tool that allows the development and execution of automated API tests both real and mocked. 
* Combining the tools allows the development of tests for an applicaton under development using mock APIs that can later be switched to use the real API calls once they have been developed. 
* These tests can also be used for rapid front-end validation using mocks to perform sanity tests in situations that require quick feedback - such as within a CI/CD build pipeline.   


**Please note:** This is a work in progress, and there are some areas that need to be improved such as selecting a more feature-rich application to demonstrate the uses, a more detailed README

## Recommended IDE Setup

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

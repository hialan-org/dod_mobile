# Dog of The Dow Mobile Application
The mobile application that help customer to invest their money in stock market using strategies like Dog of The Dow.  
User can use this application as the stock wallet and keep track of their investment.  
![](https://github.com/hialan-org/dod_mobile/workflows/Testing%20Dev/badge.svg) 
![](https://github.com/hialan-org/dod_mobile/workflows/Testing%20Prod/badge.svg) 
![](https://github.com/hialan-org/dod_mobile/workflows/Release/badge.svg)
![](https://img.shields.io/github/issues/hialan-org/dod_web_admin?color=orange)

## Features
- Manage your stocks.
- Tracking your investment.
- Get suggestion how to invest your money using Dog of The Dow.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.  
See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Download and install NodeJS:  
`https://nodejs.org/en/download/`  
Download and install Expo CLI:
`npm install -g expo-cli`
Verify that expo install successfully by running `expo whoami`  
Download [Expo Client](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android phone.  

### How to run project
To run the project locally in your machine, follow these steps:
- Clone the repo
- In the project directory, run: `npm start` or `yarn start`. 
- It will pop up Expo Dev Tools, a graphical interface for Expo CLI  
<img src="https://i.imgur.com/MyaazPd.png" width="400">  
- On your Android device, open Expo Client > Select "Scan the QR code" on the "Projects" tab.
- The application will be opened on your phone.


### Development
To start enhance or fix a bug, follow these steps:
- Fork the repo
- Create a new branch (git checkout -b new-features)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (git commit -am 'Add new features')
- Push to the branch (git push origin new-features)
- Create a Pull Request

## Technologies
Project is created with:  
- [Expo](https://docs.expo.io/) - a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase.
- [React Native](https://reactnative.dev/) - an open-source mobile application framework created by Facebook. It is used to develop applications for Android, iOS, Web and UWP by enabling developers to use React along with native platform capabilities.
- [Redux with Redux-saga](https://redux.js.org/) - an open-source JavaScript library for managing application state.
- [React-native-paper](https://callstack.github.io/react-native-paper/) - A Cross-platform Material Design for React Native.
- [Jest](https://jestjs.io/) - a JavaScript Testing Framework maintained by Facebook, Inc. with a focus on simplicity.
- [React-test-renderer](https://reactjs.org/docs/test-renderer.html) - This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment

## To do list
- Push notification to remind user to rebalance their stocks.
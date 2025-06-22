# MarylandMeals - App (Frontend)

## Install Expo CLI
First, you need to install expo, by running:
`npm install expo`

## Installing all packages
To get all npm packages used for this project, run:

`npx expo install`

## Creating an Expo account
Open the url: "https://expo.dev/signup" and create an expo account. Once the process has been setup, sign in to expo by entering `eas login` into the terminal.

## Running the app in Expo Go (only for Web)
The app can't be run in Expo Go anymore because of the Google Sign In plugin. Unfortunately, there is no way around this for mobile, but for web there's no issue. To run the app on the web, run the command:

`npm run web`

## Running the app natively (iOS, Android, Web)
First you need to pull the env variables from Expo. To do this, enter:

`eas env:pull --environment <environment>`

>environment: "development", "production". Use "production" if you want to use the remote server for the backend, and "development" if you want to use the locally hosted server instead.

Next you will need to prebuild the native application. You can do this by running:

`npx expo prebuild`

> For iOS, there's an issue with Cocoapods. To fix this issue, navigate to ios/Podfile, and insert the following line of code above the line that starts with `platform:ios...`:

`source 'https://github.com/CocoaPods/Specs.git'`

> After you have added this line, in the the ios folder run:

`pod repo remove trunk`
`pod install`

Once everything is resolved, run:

`npm run <platform>`

> platform: "ios", "android"

## Submitting app to App Store Connect/Testflight
Once the app has been tested thoroughly, it can be submitted to App Store Connect and Testflight for testing. To do this, run the following command:

`eas build --platform <platform> --profile <profile-name> --auto-submit`

> platform: "android", "ios", "all"

> profile-name: "development", "production" (this flag uses respective env files for the build)


NOTE: Expo free tier only allows 30 builds (including at most 15 iOS builds) per month per organization. DO NOT build using eas unless everything has been tested THOROUGHLY!

# hownapp

Backend

1 - Create a .env file in the backend root folder (backend/.env)
a. This file must contain:

        PORT= {port_apis}

        SECRET_KEY= {used_in_token}

        DB_URI={URI_of_mongoDB}

        for example:

        PORT=4000
        SECRET_KEY=secret
        DB_URI=mongodb://localhost:12345/hownapp

2 - TO INSTALL MONGODB ON MAC
    `brew tap mongodb/brew`
    `brew install mongodb-community`

- TO START MONGO DB
  `brew services start mongodb-community`

3 - Run below command to install all backend packages
`npm i`

4 - Run below command to start backend server
`npm run start`

Backend Unit Tests

1 - For the unit tests, we are using `mocha`, `chai` and `mongodb-memory-server` dependencies

2 - To run the tests: `npm run test`

Frontend [Windows]

1 - Open Android Project in mortgage_helper folder(Hownapp\frontend\mortgage_helper) on Android Studio

2 - Run Android Emulator on Android Studio

3 - Move to `%LOCALAPPDATA%\Android\Sdk\platform-tools` folder

4 - Run 'adb reverse tcp:4000 tcp:4000`

Reason: https://www.reddit.com/r/reactnative/comments/ryrntz/what_does_adb_reverse_tcp8081_tcp8081_command_do/

5 - Move to frontend project (Hownapp\frontend\mortgage_helper)

6 - Run below command to install all Frontend packages
yarn install

7 - Run below command to start frontend on Android Emulator
'yarn android'

Frontend [Mac]
1 - Install VSCode
brew install cask
brew install --cask visual-studio-code

2 - Instal Node.js
brew install node

3 - Install Java 11
brew tap homebrew/cask-versions
brew install --cask temurin11

4 - Install Xcode (From App Store)

5 - Install cocoapods
sudo gem install cocoapods

6 - Install Watchman
brew install watchman

7 - Install Android Studio
7-1 android studio environment configuration
~/.zshrc file to add the environment variables
Add below code
export ANDROID_HOME=$HOME/Library/Android/sdk
            export PATH=$PATH:$ANDROID_HOME/emulator
            export PATH=$PATH:$ANDROID_HOME/tools
            export PATH=$PATH:$ANDROID_HOME/tools/bin
            export PATH=$PATH:$ANDROID_HOME/platform-tools
7-2 Apply configuration
source ~/.bash_profile

8 - Move to frontend project (Hownapp\frontend\mortgage_helper)

9 - Run below command to install all Frontend packages
npm i

10 - Run below command to install pod packages
npm pod-install

11 - Run below command to start frontend on Android Emulator
npm run android

12 - Run below command to start frontend on iOS iPhone Emulator
npm run ios

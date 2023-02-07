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

    TO START MONGO DB
    
    `brew services start mongodb-community`

3 - Run `npm i` to install all backend packages

4 - Run `nom run start` to start backend server

Frontend [Windows]
1 - Open Android Project in mortgage_helper folder(Hownapp\frontend\mortgage_helper) on Android Studio

2 - Run Android Emulator on Android Studio

3 - Move to `%LOCALAPPDATA%\Android\Sdk\platform-tools` folder

4. Run 'adb reverse tcp:4000 tcp:4000` 
   Reason: https://www.reddit.com/r/reactnative/comments/ryrntz/what_does_adb_reverse_tcp8081_tcp8081_command_do/
   
5 - Move to frontend project (Hownapp\frontend\mortgage_helper)

6 - Run `npm i` to install all Frontend packages 

7 - Run `npm run android` to start frontend on Android Emulaotr

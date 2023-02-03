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

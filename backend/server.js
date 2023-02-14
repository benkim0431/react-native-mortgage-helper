const {port} = require('./config/config');
const app = require('./config/app');
const db = require('./config/db.js');

//Connect with the mongodb database
db.connect().then(() => {
    app.listen(port, () => {
        console.log("Server is running on port", port);
    })
});

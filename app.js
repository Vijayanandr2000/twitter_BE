const express = require('express');
const serverConfig = require('./config/server.config');
const db = require('./models');

const app = express();

app.use(express.json());

db.sequelize.sync({force: true}).then(()=>{
    console.log(`DB Table's are updated`);
}).catch(err=>{
    console.log(err.message)
})


require('./routes/auth')(app)
require('./routes/user')(app)

app.listen(serverConfig.PORT,async() => {
    console.log(`server starts in PORT ${serverConfig.PORT}`);
    try {
        await db.sequelize.authenticate();
        console.log('DB connected successfully');
    } catch (error) {
        console.log("DB is not connected", error.message);
    }
});
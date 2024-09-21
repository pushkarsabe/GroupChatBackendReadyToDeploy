const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
//to secure requests 
const helmet = require('helmet');
//compression generally refers to the process of compressing data or files
const compression = require('compression');

require('dotenv').config();

const sequelize = require('./util/database');

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const User = require("./model/user")
const Chat = require('./model/chat');
const Group = require('./model/group');
const Admin = require('./model/admin');

const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const groupRoute = require('./routes/group');
const adminRoute = require('./routes/admin');

//user signup and login
app.use("/user", userRoute);

//chats
app.use("/chat", chatRoute);

//groups
app.use('/groups', groupRoute);

//admin
app.use('/admin', adminRoute);

// This allows external resources (like Axios from cdn.jsdelivr.net) to be used without being blocked.
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self'");
    next();
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    console.log("url... = " + req.url);
    // res.sendFile(path.join(__dirname, `public/login.html`));
    res.sendFile(path.join(__dirname, `public/${req.url}`));
});

// User and Chat relationship
User.hasMany(Chat, { foreignKey: 'signupId' });

// User and Group relationship
User.hasMany(Group, { foreignKey: 'userId' });

//chat and group relationship
Chat.belongsTo(Group, { foreignKey: 'groupId' });

//chat and group relationship
Admin.belongsTo(Group, { foreignKey: 'groupId' });

sequelize.sync()
    .then(result => {
        console.log(`server started running at port ${process.env.PORT}`);
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    })


const express = require('express');
const app = express();
const ConnectDB = require('./config/db')

//Connect DB
ConnectDB();

//Init middleware
app.use(express.json({ extended: false }));

//Routes
app.get('/', (req, res) => res.send("Hello"));
app.use('/api/admin', require('./routes/api/adminUser'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/drive', require('./routes/api/drives'));
app.use('/api/student', require('./routes/api/student'));
app.use('/api/filter/', require('./routes/api/filter'));
app.use('/api/page', require('./routes/api/page'));


//port init
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Api is running on ${port}`));
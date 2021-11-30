const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();


//Using Cors
app.use(cors());
//Connect DataBase
connectDB();

//init Middleware
app.use(express.json({extended:false}))


// Define routes
app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contacts'));
app.use('/api/auth',require('./routes/auth'));

//Serve static assets (REACT) in production

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT , (req,res)=>console.log(`Server started on PORT ${PORT}`));


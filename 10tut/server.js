const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// builtin middleware to handle urlencoded data
// in other words, form data
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees',require('./routes/api/employees'));

app.all('*', (req,res)=> {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views','404.html'));
    } else if (req.accepts('json')) {
        res.json({err: '404 not found'});
    } else {
        res.type('txt').send("404 not found");
    }
    
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
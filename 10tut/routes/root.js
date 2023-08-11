const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req,res)=>{
    // One way
    // res.sendFile('./views/index.html', {root: __dirname});
    // Other way
    res.sendFile(path.join(__dirname,'..', 'views','index.html'));
});

module.exports = router;
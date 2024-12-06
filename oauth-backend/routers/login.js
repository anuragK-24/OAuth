const login = require('express').Router();

login.get('/', (req, res) => {
    res.send('get');
});

login.post('/', (req, res)=>{
    res.send('post');
})



module.exports = login;

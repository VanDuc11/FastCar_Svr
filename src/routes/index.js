const user = require('./User');

let bodyparser = require('body-parser');

const router = (app) =>{
    app.use(bodyparser.urlencoded({
        extended:true
    }))
     
    app.use('/user',user);

}

module.exports = router;

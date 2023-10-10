const user = require('./User');
const Xe = require('./Xe');

let bodyparser = require('body-parser');

const router = (app) =>{
    app.use(bodyparser.urlencoded({
        extended:true
    }))
     
    app.use('/user',user);
    app.use('/danhsachxe',Xe);

}

module.exports = router;

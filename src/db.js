const mongoose = require('mongoose');
async function connect(){

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connect thành công");
    } catch (error) {
        console.log("connect thất bại");
    }
}
module.exports = {connect}
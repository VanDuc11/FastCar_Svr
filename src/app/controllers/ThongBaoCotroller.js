const ThongBao = require("../models/ThongBao");

class ThongBaoController{
    async findNotifi(req,res){
        await ThongBao.find().sort({_id: -1})
        .then((result) => {
            res.status(200).json({
                success: true,
                data: result,
            });
        });
    }
}
module.exports = new ThongBaoController;
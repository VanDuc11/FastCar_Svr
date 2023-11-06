const ThongBao = require("../models/ThongBao");

class ThongBaoController{
    index(req, res) {
        res.render('Thongbao')
    }

    // async index(req, res) {
    //     await ThongBao.find().sort({_id: -1})
    //     .then((result) => {
    //         res.status(200).render('Thongbao',{
    //             data:  result.map(res => res.toJSON())
    //         })
    //     });
    // }


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
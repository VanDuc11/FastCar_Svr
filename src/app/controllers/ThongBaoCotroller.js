const ThongBao = require("../models/ThongBao");
var path = require('path');
const crypto = require('crypto');
const dateNow = new Date();
const moment = require('moment');
const { log } = require('console');
class ThongBaoController {


  async index(req, res) {
    var query = null;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    if (start_date != undefined &&
      end_date != undefined) {
      query = {
        "createdAt": {
          $gte: new Date(start_date),
          $lte: new Date(end_date),
        },
      }
    }
    await ThongBao.find(query).sort({ _id: -1 })
      .then((result) => {
        res.status(200).render('Thongbao', {
          data: result.map(res => res.toJSON())
        })
      });
  }

  async findNotifi(req, res) {
    await ThongBao.find().sort({ _id: -1 })
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result,
        });
      });
  }
  async find_id(req, res) {
    await ThongBao.findById(req.params.id)
      .then((result) => {
        console.log(result);
        res.status(200).json(result)
      }).catch((error) => {
        res.status(400).json({
          success: false,
          message: 'Không thành công',
        })
      })
  }
  async CreateThongBao(req, res) {
    const img = path.basename(req.file.path);
    const randomBytes = crypto.randomBytes(6);
    const thongbao = new ThongBao({
      TieuDe: req.body.TieuDe,
      NoiDung: req.body.NoiDung,
      HinhAnh: img,
    });

    try {
      const check = await ThongBao.findOne({ TieuDe: req.body.TieuDe });

      if (check == null) {
        const kq = await thongbao.save();
        console.log("Thong Bao", kq);
        res.status(201).send('<script>alert("Thêm thông báo thành công"); window.location.href="/thongbao";</script>');
        const tb = new ThongBao({
          TieuDe: req.body.TieuDe,
          NoiDung: req.body.NoiDung,
          HinhAnh: img,
        });

      } else {
        res.status(400).json({
          success: false,
          messages: "Tiêu đề thông báo đã tồn tại",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        messages: error.message,
      });
    }
  }

}


module.exports = new ThongBaoController;
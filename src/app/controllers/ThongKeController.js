const HoaDon = require('../models/HoaDon.model');
const Xe = require('../models/Xe.model');
var path = require('path');

class ThongKeController {

    async index(req, res) {
        const emailUser = req.params.email;
        let check = null;

        if (typeof (req.query.TrangThai) != 'undefined') {
            check = { TrangThai: req.query.TrangThai };
        }

        try {
            // giới hạn 5 xe
            const list = await Xe.find(check)
                .populate('ChuSH', ('_id UserName Email UID SDT Avatar'))
                .sort({ SoChuyen: -1 })
                .limit(10).exec().then((result) => {
                    res.status(200).render("Thongke", {
                        data: result.map((res) => res.toJSON()),
                    });
                })




        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    doanhthu(req, res) {
        HoaDon.aggregate([{
            $match: {
                GioTaoHD: {
                    $gte: new Date("2023-01-01"),
                    $lt: new Date("2023-12-31"),
                },
                TrangThaiHD: {
                    $in: [3, 4, 5, 6],
                },
            },
        },
        {
            $group: {
                _id: 1,
                tong_doanh_thu_nam: {
                    $sum: "$TongTien",
                },
            },
        },
        ]).then((result) => {
            res.status(200).json(result)
        })
    }
    donhang(req, res) {
        const pipeline = [
            {
                $match: {
                    GioTaoHD: {
                        $gte: new Date("2023-01-01"),
                        $lt: new Date("2023-12-31"),
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                },
            },
        ];

        HoaDon.aggregate(pipeline).then((result) => {
            const totalOrders = result[0].totalOrders;
            res.status(200).json({ totalOrders });
        });
    }

    thongkeTheoThang(req, res) {
        var arr = [
            { _id: { month: 1 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 2 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 3 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 4 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 5 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 6 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 7 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 8 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 9 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 10 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 11 }, doanh_thu: 0, loi_nhuan: 0 },
            { _id: { month: 12 }, doanh_thu: 0, loi_nhuan: 0 },

        ];
        HoaDon.aggregate([
            {
                $match: {
                    GioTaoHD: {
                        $gte: new Date("2023-01-01"),
                        $lt: new Date("2023-12-31"),
                    },
                    TrangThaiHD: {
                        $in: [3, 4, 5, 6],
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$GioTaoHD",
                        },
                    },
                    doanh_thu: {
                        $sum: "$TongTien",
                    },
                    loi_nhuan: {
                        $sum: {
                            $multiply: ["$TongTien", 0.1],
                        },
                    },
                    don_thanh_cong: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$TrangThaiHD", 6],
                                },
                                then: 1,
                                else: 0,
                            },
                        },
                    },
                    don_huy: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$TrangThaiHD", 0],
                                },
                                then: 1,
                                else: 0,
                            },
                        },
                    },
                    tong_don: {
                        $sum: {
                            $add: [
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 0],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 6],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                            ],
                        },
                    }

                },
            }
        ]).then((result) => {

            arr.forEach((i) => {
                result.forEach((item) => {
                    if (i._id.month == item._id.month) {
                        i.doanh_thu = item.doanh_thu
                        i.loi_nhuan = item.loi_nhuan;
                        i.don_thanh_cong = item.don_thanh_cong;
                        i.don_huy = item.don_huy;
                        i.tong_don = item.tong_don;

                    }
                });

            })
            res.json(arr)
        })


    }

    thongkeHDTheoThang(req, res) {
        var arr = [
            { _id: { month: 1 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 2 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 3 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 4 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 5 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 6 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 7 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 8 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 9 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 10 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 11 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
            { _id: { month: 12 }, don_thanh_cong: 0, don_huy: 0, tong_don: 0, khac: 0 },
        ];
        HoaDon.aggregate([
            {
                $match: {
                    GioTaoHD: {
                        $gte: new Date("2023-01-01"),
                        $lt: new Date("2023-12-31"),
                    }

                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$GioTaoHD",
                        },
                    },

                    don_thanh_cong: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$TrangThaiHD", 6],
                                },
                                then: 1,
                                else: 0,
                            },
                        },
                    },
                    don_huy: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$TrangThaiHD", 0],
                                },
                                then: 1,
                                else: 0,
                            },
                        },
                    },
                    khac: {
                        $sum: {
                            $add: [

                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 1],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 2],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 3],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 4],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 5],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                            ],
                        },
                    },
                    tong_don: {
                        $sum: {
                            $add: [
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 0],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 1],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 2],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 3],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 4],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 5],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 6],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },

                            ],
                        },
                    }

                },
            }
        ]).then((result) => {

            arr.forEach((i) => {
                result.forEach((item) => {
                    if (i._id.month == item._id.month) {
                        i.don_thanh_cong = item.don_thanh_cong;
                        i.don_huy = item.don_huy;
                        i.tong_don = item.tong_don;
                        i.khac = item.khac;

                    }
                });

            })
            res.json(arr)
        })


    }

    hoadonphanTram(req, res) {
         
        var arr = {
            don_thanh_cong: 0, don_huy: 0, khac: 0

        };
        HoaDon.aggregate([
            {
                $match: {
                    GioTaoHD: {
                        $gte: new Date(req.query.start_date ? `2023-${req.query.start_date}-01` : "2023-01-01"),
                        $lt: new Date(req.query.start_date ? `2023-${req.query.start_date}-31` :"2023-12-31"),
                    }

                },
            },
            {
                $group: {
                    _id: 1,

                    don_thanh_cong: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$TrangThaiHD", 6],
                                },
                                then: 1,
                                else: 0,
                            },
                        },
                    },
                    don_huy: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$TrangThaiHD", 0],
                                },
                                then: 1,
                                else: 0,
                            },
                        },
                    },
                    khac: {
                        $sum: {
                            $add: [

                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 1],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 2],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 3],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 4],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 5],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                            ],
                        },
                    },
                    tong_don: {
                        $sum: {
                            $add: [
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 0],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 1],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 2],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 3],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 4],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 5],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$TrangThaiHD", 6],
                                        },
                                        then: 1,
                                        else: 0,
                                    },
                                },

                            ],
                        },
                    }

                },
            }
        ]).then((result) => {

            result.forEach((item) => {
                arr.don_thanh_cong = item.don_thanh_cong / item.tong_don * 100;
                arr.don_huy = item.don_huy / item.tong_don * 100;

                arr.khac = item.khac / item.tong_don * 100;
                arr.don_thanh_cong = arr.don_thanh_cong.toFixed(2);
                arr.don_huy = arr.don_huy.toFixed(2);
                arr.khac = arr.khac.toFixed(2);

            });

            res.json(arr)
        })


    }
}
module.exports = new ThongKeController;
// const ThongBao = require('./app/models/ThongBao');
// const crypto = require('crypto');
// const MaGiamGia = require('./app/models/MaGiamGia');
// const { log } = require('console');
// const dateNow = new Date();
// function _client() {

//     var MongoClient = require('mongodb').MongoClient;
//     const url = process.env.DB_URL;
//     MongoClient.connect(url)
//         .then(client => {
//             let changeStream = client.watch({ "fullDocument": "updateLookup" });
//             // set up a listener when change events are emitted
//             changeStream.on("change", event => {
//                 // process any change event

//                 console.log("received a change to the collection: \t", event);

//                 if (event.ns.coll === "magiamgias") {
//                     watch_Magiamgia(event)

//                 }
//             });

//             MaGiamGia.find().then((result) => {
//                 result.forEach(element => {
//                     const expiredDate = new Date(element.HSD);
//                     if (dateNow > expiredDate && element.TrangThai == true) {
//                         console.log(element._id);
//                         MaGiamGia.updateOne({ _id: ._id }, {
//                             $set: {
//                                 TrangThai: false
//                             }
//                         }).then((result)=>{
                            
//                         })
//                     }
//                 });


//             })
//         });

// };

// async function watch_Magiamgia(doc) {
//     const tb = new ThongBao({
//         TieuDe: doc.fullDocument?.TieuDe,
//         MaGiamGia: doc.fullDocument?.MaGiaGia,
//         Code: doc.fullDocument?.Code,
//         GiaTri: doc.fullDocument?.GiaTri,
//         ThongTin: doc.fullDocument?.ThongTin,
//         HinhAnh: doc.fullDocument?.HinhAnh,
//     })
   
//     if (doc.operationType === 'insert' && doc.ns.coll === 'magiamgias') {
//         console.log(doc.ns.coll, "create");
//         await ThongBao.create(tb)
//             .then((result) => {
//                 // console.log(result);
//             });
//     }else if (doc.operationType === 'update' && doc.ns.coll === 'magiamgias') {
//         console.log(doc.ns.coll, "update");

//         await ThongBao.updateOne({ Code: doc.fullDocument?.Code }, {
//             $set: {
//                 TieuDe: doc.fullDocument?.TieuDe,
//                 MaGiamGia: doc.fullDocument?.MaGiaGia,
//                 GiaTri: doc.fullDocument?.GiaTri,
//                 ThongTin: doc.fullDocument?.ThongTin,
//                 HinhAnh: doc.fullDocument?.HinhAnh,
//             }
//         })
//             .then((result) => {
//                 // console.log(result);
//             });
//     }



// }

// module.exports = { _client }
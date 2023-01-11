const customer = require('../models/customer.js')

exports.index = (req,res) => {
    res.send('<h1>Customer Application</h1><hr><a href="/api/customer">รายชื่อลูกค้า</a>')
}
//ฟังก์ชั่น หาทั้งหมด
exports.findAll = (req,res) => {
    customer.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        })
    })
}
//ฟังก์ชั่น สร้าง ID Json ใหม่
exports.create = (req,res) => {
    const c = new customer(req.body)

    c.save().then(data =>{
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถเพิ่มข้อมูลได้เนื่องจาก : " + err.message 
        })
    })
}
//ฟังก์ชั่น หาดวย ID Json เเค่ 1 record
exports.findById = (req,res) => {
    customer.findById(req.params.customerId).then(data =>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ record รหัส : " + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.states(500).json({
            msg: "เกิดข้อผิดพลาด เนื่องจาก : " + err.message
        })
    })
}

exports.update = (req,res) => {
    customer.findByIdAndUpdate(req.params.customerId, {$set: req.body},{new: true}).then(data =>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ record รหัส : " + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.states(500).json({
            msg: "เกิดข้อผิดพลาด เนื่องจาก : " + err.message
        })
    })
}

exports.delete = (req,res) => {
    customer.findByIdAndDelete(req.params.customerId).then(data =>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ record รหัส : " + req.params.customerId
            })
        }
        res.json({msg: "ลบข้อมูลเรียบร้อยเเล้ว+++"})
    }).catch(err => {
        return res.states(500).json({
            msg: "เกิดข้อผิดพลาด เนื่องจาก : " + err.message
        })
    })
}
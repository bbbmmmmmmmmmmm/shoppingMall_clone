const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed.'), false);
        }
        cb(null, true);
    }
})
const upload = multer({ storage: storage }).single('file');

router.post("/uploadImage", (req, res) => {
    upload(req, res, err => {
        if (err) return res.json({ success: false, err });
        res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename });
    })
});

router.post('/uploadProduct', (req, res) => {
    const product = new Product(req.body);

    product.save((err, product) => {
        if (err) return res.json({ success: false, err });
        res.json({ success: true });
    })
})

module.exports = router;

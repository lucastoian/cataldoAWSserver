const {Brand} = require('../models/brand');
const express = require ('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}


const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const isValid = FILE_TYPE_MAP[file.mimetype];
            let uploadError = new Error('invalid image type');
            if (isValid) {
                uploadError = null
            }
    cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
    },    
    limits: {fieldsize: 25 * 1024 * 1024}
})

function filename (file) {
    // const fileName = file.originalname.split(' ').join('-');
    // console.log("original name = " + JSON.stringify(file));
    // const extension = FILE_TYPE_MAP[file.mimetype];
    let fileName = file.originalname.split(' ').join('-');
    fileName = fileName.split('-')[0];
    fileName = fileName.replaceAll('+', 'a');
    const extension = FILE_TYPE_MAP[file.mimetype];
     //return randomWords({ exactly: 5, join: '' }) +"." + extension;
     return  `${fileName}.${extension}`;
 }



const uploadOptions = multer({
    storage: storage,  

},
{
    limits: { fieldNameSize: 25 * 1024 * 1024,
              files: 10,
              fields: 10 }
})


let s3 = new S3Client({
    region: 'eu-west-3',
    credentials: {
      accessKeyId: process.env.AWSkey,
      secretAccessKey: process.env.AWSsecret,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });
  

  uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'cataldostore',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: filename(file) });
      },
      key: function (req, file, cb) {
        cb(null, filename(file));
      },
    }),
  });  


router.get(`/`, async(req,res)=>{
       var origin = req.get('origin');
   console.log("ORIGIN: " + origin)
    
    try{
    const brandsList = await Brand.find()

    if(!brandsList){
        res.status(500).json({
            success: false
        });
    }

    res.send(brandsList);
}catch(e){
    res.status(500).json({
        success: false
    });
}
})

router.get(`/:id`, async(req,res)=>{
           var origin = req.get('origin');
   console.log("ORIGIN: " + origin)
    try{
    const brand = await Brand.findById(req.params.id);

    if(!brand){
        res.status(500).json({
            success: false
        });
    }

    res.send(brand);
}catch(e){
    res.status(500).json({
        success: false
    });
}
})

router.get(`/get/:name`, async(req,res)=>{
           var origin = req.get('origin');
   console.log("ORIGIN: " + origin)
    try{
    let name = req.params.name;
    const brand = await Brand.find({name: name});

    if(!brand){
        res.status(500).json({
            success: false
        });
    }

    res.send(brand);
}catch(e){
    res.status(500).json({
        success: false
    });
}
})

router.get(`/get/products/:name`, async(req,res)=>{
           var origin = req.get('origin');
   console.log("ORIGIN: " + origin)
    try{
    let name = req.params.name;
    const brand = await Brand.find({name: name});

    if(!brand){
        res.status(500).json({
            success: false
        });
    }

    res.send(brand);
}catch(e){
    res.status(500).json({
        success: false
    });
}
})



router.post(`/`, uploadS3.single('image'), async(req,res)=>{
    try{

    const file = req.file;
    if(!file){
        return res.status(400).send('No image in the request')
    }

    const fileName = req.file.filename
  


    let brand = new Brand({
        name: req.body.name,
        image: "https://cataldostore.s3.eu-west-3.amazonaws.com/" + filename(file),
        m: req.body.m,
        w: req.body.w,
    })

    brand = await brand.save();

    if(!brand){
        return res.status(500).send('Brand could not be created');
    }

    res.send(brand);
}catch(e){
    return res.status(500).send('Brand could not be created' + e);
}
})

router.put(`/:id`, uploadS3.single('image'), async(req,res)=>{
    try{
    const file = req.file;
    let imagepath;
    
    if (file){
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
        imagepath = "https://cataldostore.s3.eu-west-3.amazonaws.com/" + filename(file);
    }else{
        imagepath = "https://cataldostore.s3.eu-west-3.amazonaws.com/" + filename(file);
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,{
            name: req.body.name,
            image: imagepath,
            m: req.body.m,
            w: req.body.w,
        },{new: true}
    )


    if(!updatedBrand){
        return res.status(400).send('the brand cannot be updated')
    }

    res.send(updatedBrand);
}catch(e){
    return res.status(500).send('the brand cannot be updated')
}
})

router.delete(`/:id`, (req,res)=>{
    try{
    Brand.findByIdAndRemove(req.params.id).then(brand =>{
        if(brand){
            return res.status(200).json({
                success: true,
                message: 'product deleted'
            });
        }else{
            return res.status(404).json({
                success: false,
                message: 'brand cannot be deleted'
            });
        }
    }).catch(err =>{
        return res.status(400).json({
            succcess: false,
            error: err
        });
    })
}catch(e){
    return res.status(400).send('the brand cannot be updated')
}
})


module.exports = router;

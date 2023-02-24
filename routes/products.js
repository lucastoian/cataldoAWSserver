const {Product} = require('../models/product');
const express = require ('express');
const router =  express.Router();
const  {Category} = require('../models/category')
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types;
const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWSsecret,
    accessKeyId: process.env.AWSkey,
    region: "eu-west-3"
    });

//Multer config
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
    }
})

function filename (file) {
    try{
    // const fileName = file.originalname.split(' ').join('-');
    // console.log("original name = " + JSON.stringify(file));
    // const extension = FILE_TYPE_MAP[file.mimetype];
    let fileName = file.originalname.split(' ').join('-');
    fileName = fileName.split('-')[0];
    fileName = fileName.replaceAll('+', 'a');
    const extension = FILE_TYPE_MAP[file.mimetype];
     //return randomWords({ exactly: 5, join: '' }) +"." + extension;
     return  `${fileName}.${extension}`;
    }catch(e){
        return null;
    }
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

// Get all products in the database - OPTIONAL CATEGORY FILTER

router.get(`/`, async (req, res) =>{
    try{
    // localhost:3000/api/v1/products?categories=2342342,234234
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('brand');


    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})

// Get products for men - OPTIONAL CATEGORY FILTER
router.get(`/get/men-prods`, async (req, res) =>{
    try{

    let filter = {};
    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        }
    }


    // let brand = {};

    // if (req.query.brand) {
    //     brand = {
    //         brand: req.query.brand
    //     }
    // }


    const productList = await Product.find(filter).populate('brand').populate('brand');
    const filteredprods = productList.filter((x)=> x.sex === 'M')

    if(!filteredprods) {
        res.status(500).json({success: false})
    } 
    res.send(filteredprods);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})

router.get(`/filteredProducts`, async (req, res) => {

    
    console.log("query = " + JSON.stringify(req.query));

    try{

    let filter = {};
    if (req.query.brand) {
        let brands = req.query.brand.split(',')

        filter.brand = brands   
    }

    if (req.query.category) {

        let categorie = req.query.category.split(',')

        filter.category = categorie
    }

    if (req.query.sex) {
        let sesso = req.query.sex.split(',')
        filter.sex = sesso
    }

    if (req.query.taglie) {
        let taglie = req.query.taglie.split(',')
        filter.size = taglie
    }

        console.log("sto cercando i prodotti con questo filtro: " + JSON.stringify(filter))

        const productsList = await Product.find(filter).populate('category').populate('brand');
    
    
        res.send(productsList);


        // let brand = {};

        // if (req.query.brand) {
        //     brand = {
        //         brand: req.query.brand
        //     }
        // }
   
}catch(e){
    console.log("errore : " + e)
    res.status(500).json({
        success: false
    })
}
})

router.get(`/prodid/:name`, async (req,res)=>{
    try{
    let prodName = req.params.name;

  

    const productsList = await Product.find({productId: prodName});

    if(!productsList){
        res.status(500).json({success: false});
    }
    res.send(productsList);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})

// Get products for women - OPTIONAL CATEGORY FILTER
router.get(`/get/women-prods`, async (req, res) => {
    try{

    let filter = {};
    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        }
    }
        // let brand = {};

        // if (req.query.brand) {
        //     brand = {
        //         brand: req.query.brand
        //     }
        // }

    const productsList = await Product.find(filter).populate('category').populate('brand');
    const filteredprods = productsList.filter((x) => x.sex === 'F');


    if (!filteredprods) {
        res.status(500).json({
            success: false
        })
    }

    res.send(filteredprods);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})
// Get products for men - OPTIONAL BRAND FILTER ONLY

router.get(`/get/brand/men`, async (req, res) => {
    try{

    if (req.query.brand) {
        brand = {
            brand: req.query.brand
        };
    }

    const productsList = await Product.find(brand);

    if (!productsList) {
        res.status(500).json({
            success: false
        })
    }

        const specificProductList = productsList.filter((x) => x.sex === 'M');

    res.send(specificProductList);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})

// Get products for women - OPTIONAL BRAND FILTER ONLY

router.get(`/get/brand/women`, async (req, res) => {
    try{

    if (req.query.brand) {
        brand = {
            brand: req.query.brand
        };
    }

    const productsList = await Product.find(brand);
    if (!productsList) {
        res.status(500).json({
            success: false
        })
    }

    const specificProductList = productsList.filter((x) => x.sex === 'F');

    res.send(specificProductList);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})



// Get all products - OPTIONAL BRAND FILTER ONLY
router.get(`/get/brand/all`, async (req,res)=>{
    try{
    
    if(req.query.brand){
        brand = { brand: req.query.brand};
    }

    const productsList = await Product.find(brand);
    if(!productsList){
        res.status(500).json({
            success: false
        })
    }

    res.send(productsList);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})


// Get products for men - OPTIONAL PARAMS FOR BRAND AND CATEGORY COMBINED
router.get(`/get/brand-and-category/men`, async (req, res) => {
    try{
    // http://localhost:3000/api/v1/products/get/brand/men?categories=61e1a62d81572bb64bd8d73b,61e7cdc42eedad9135296d50&brand=6213c89e9309de960180da4d


    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        }
    }

    if (req.query.brand) {
        brand = {
            brand: req.query.brand
        }
    }

    if (req.query.categories && req.query.brand){

        const productList = await Product.find({category: req.query.categories.split(','),brand: req.query.brand});
        console.log("!=/()(/)(&/)(/)(/)(/)(/) product List = " + productList);
        const specificProductList = productList.filter((x) => x.sex === 'M');
        console.log("!=/()(/)(&/)(/)(/)(/)(/) specified product List = " + specificProductList);

        if (!specificProductList) {
            res.status(500).json({
                success: false
            })
        }
    
        
        res.send(specificProductList);
    }else{
        const productList = await Product.find(brand);
                const specificProductList = productList.filter((x) => x.sex === 'M');

                if (!specificProductList) {
                    res.status(500).json({
                        success: false
                    })
                }
    }
    
}catch(e){
    res.status(500).json({
        success: false
    })
}
})

// Get products for Women - OPTIONAL PARAMS FOR BRAND AND CATEGORY COMBINED

router.get(`/get/brand-and-category/women`, async (req, res) => {
    try{
    // http://localhost:3000/api/v1/products/get/brand/women?categories=61abf4a257450fc2517488f0&?brand=6213c7889309de960180da4a

    let filter = {};
    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        }
    }
    let brand = {};

    if (req.query.brand) {
        brand = {
            brand: req.query.id
        }
    }
    
        if (req.query.categories && req.query.brand) {

            const productList = await Product.find({
                category: req.query.categories.split(','),
                brand: req.query.brand
            });
            const specificProductList = productList.filter((x) => x.sex === 'F');

            if (!specificProductList) {
                res.status(500).json({
                    success: false
                })
            }
            res.send(specificProductList);
        } else {
            const productList = await Product.find(brand);
            const specificProductList = productList.filter((x) => x.sex === 'F');

            if (!specificProductList) {
                res.status(500).json({
                    success: false
                })
            }
        }
    }catch(e){
        res.status(500).json({
            success: false
        })
    }

})







// Get any product by name

router.get(`/prodname/:name`, async (req,res)=>{
    try{
    let prodName = req.params.name;

    const productsList = await Product.find({name: prodName});

    if(!productsList){
        res.status(500).json({success: false});
    }
    res.send(productsList);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})


// router.get(`/brand/women-products/:id`, async (req,res)=>{

//     let brand = {}
  
//     if(req.query.brand){
//         brand = {brand: req.query.brandId}
//     }
  
  
//    const productsByBrand = await Product.find(brand).populate('brand');
//    const filteredProds = productsByBrand.filter((x)=>x.sex === 'F');
  
//    if(!filteredProds){
//        res.status(500).json({success: false})
//    }
//    res.send(filteredProds);
  
//   })



// Get specific product by ID
router.get(`/:id`, async (req,res)=>{
    try{
    const product = await Product.find({"productId": req.params.id}).populate('category');


    res.send(product);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})


// Get featured products
router.get(`/get/featured`, async (req,res)=>{
    try{
    const products = await Product.find({isFeatured: true})


    res.send(products);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})


// Get featured products by brand
router.get(`/get/featured/:brand`, async (req,res)=>{

    const map = new Map();
    map.set("blauer", "6213c7889309de960180da4a");
    map.set("old river", "6213c89e9309de960180da4d");
    map.set("Old River", "6213c89e9309de960180da4d");
    map.set("colmar", "62167bd1cba8a1e0d9c1af88");
    map.set("ea7", "62189efe1d62386cc22525b6");
    map.set("fred perry","62189f1e1d62386cc22525b9");
    map.set("kway", "62189f371d62386cc22525bc");
    map.set("lacoste","62189f481d62386cc22525bf");
    map.set("murphy&nye","62189f7d1d62386cc22525c2");
    map.set("peninsula", "62189f981d62386cc22525c5");
    map.set("saucony", "62189fad1d62386cc22525c8");
    map.set("sundek", "62189fbb1d62386cc22525cb");
    map.set("barbour", "632e05f3b8c567de5ea83669");
    map.set("canadiens", "636b5806506ba65e593baa87");
    map.set("husky", "636b57f3506ba65e593baa84");

    try{

        const products= await Product.find({"brand": map.get(req.params.brand), "isFeatured":true, "sex":req.query.sex}).limit(150);
        //console.log("featured products : " + products)
    
        if(!products){
            res.status(500).json({success: false})
        }
    
        let distinctProducts = [];
        for(let i = 0; i<products.length-1; i++){
            let p1 = products.pop() ;
            let p2= products.pop() ;
            console.log("p1 = " + p1 + " p2 = " + p2)
            if(p1.productId == p2.productId){
                continue
            }else{
                distinctProducts.push(p1);
                distinctProducts.push(p2);
            }
        }
    
        console.log(distinctProducts)
        if(distinctProducts.length <5){
            const moreProducts= await Product.find({"isFeatured":true, "sex":req.query.sex}).limit(50);
            for(let i = 0; i<moreProducts.length-1; i++){
                let p1 = moreProducts.pop() ;
                let p2= moreProducts.pop() ;
                console.log("p1 = " + p1 + " p2 = " + p2)
                if(p1.productId == p2.productId){
                    continue
                }else{
                    distinctProducts.push(p1);
                    distinctProducts.push(p2);
                }
            }
        }
        res.send(distinctProducts);
    }catch(e){
    res.status(500).json({
        success: false
    })
}
})



// Get products count
router.get(`/get/count`, async (req,res)=>{
    try{
    Product.countDocuments().then(count =>{
        if (count){
            return res.status(200).json({productCount: count});
        }else{
            return res.status(500).json({success: false});
        }
    }).catch(err =>{
        return req.status(400).json({
            success: false,
            error: err
        })
    });
}catch(e){
    res.status(500).json({
        success: false
    })
}
})


//Post a new product with an optional single image

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    try{
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid category')

        const file = req.file;
        if (!file) {
            return res.status(400).send('No image in the request')
        }
     
    
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        sex: req.body.sex,
        image: `${basePath}${fileName}`,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        isFeatured: req.body.isFeatured,
        rating: req.body.rating,
        color: req.body.color,
        discount: req.body.discount,
        factoryCode: req.body.factoryCode,
    })

    product = await product.save();

    if (!product){
        return res.status(500).send('Product could not be created');
    }

        res.send(product)
        console.log(product);
    }catch(e){
        res.status(500).json({
            success: false
        })
    }
})


// Put data in specific product
router.put('/:id', uploadS3.single('image'), async (req, res) => {
    try{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }

    //Category test
    // const category = await Category.findById(req.body.category);
    // if (!category) return res.status(400).send('Invalid category');

    //Product test
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid product');

    //File exists check
    const file =  filename(req.file);
    let imagepath;

    if (file != null) {
        //const fileName = file.filename;
        //const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = "https://cataldostore.s3.eu-west-3.amazonaws.com/" + filename(file);
    }

    // const variants = Promise.all(
    //     req.body.variants.map(async (variant) => {
    //         let newVariant = new ProductVariant({
    //             product: variant.product,
    //             color: variant.color,
    //             size: variant.size,
    //             inventory: variant.inventory
    //         });
    //         newVariant = await newVariant.save();
    //         return newVariant._id;
    //     })
    // );
    // const newVariantsResolved = await variants; 

   

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            sex: req.body.sex,
         //   image: "https://cataldostore.s3.eu-west-3.amazonaws.com/" + filename(file),
            brand: req.body.brand,
            price: req.body.price,
            isFeatured: req.body.isFeatured,
            color: req.body.color,
            discount: req.body.discount,
          //  factoryCode: req.body.factoryCode,
        },{
            new: true
        }
    )

    if (!updatedProduct)
        return res.status(400).send('the product cannot be updated');

    res.send(updatedProduct);
}catch(e){
    res.status(500).json({
        success: false,
        error: e
    })
}
})

// (WIP) Add variant
router.put('/:id/add/variant', uploadOptions.single('image'), async (req, res) => {
    try{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }

    //Category test
    // const category = await Category.findById(req.body.category);
    // if (!category) return res.status(400).send('Invalid category');

    //Product test
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid product');

    //File exists check
    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }
        const variants = Promise.all(
            req.body.variants.map(async (variant) => {
                let newVariant = new ProductVariant({
                    product: variant.product,
                    color: variant.color,
                    size: variant.size,
                    inventory: variant.inventory
                });
                newVariant = await newVariant.save();
                return newVariant._id;
            })
        );
        const newVariantsResolved = await variants; 

     
    const updatedProdWithVariant = await Product.findByIdAndUpdate(
        req.params.id, {
            image: imagepath,
            variants: newVariantsResolved,
        },{
            new: true
        }
    )

    if (!updatedProdWithVariant)
        return res.status(400).send('the product cannot be updated');

    res.send(updatedProdWithVariant);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})


// (WIP) Add gallery
router.post('/gallery-images/:id', uploadS3.array('image'), async (req, res) => {
    
    try{


    console.log("***********************************************************************adding images");
    

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }


    console.log("files = " + req.files + "binary of the image: " + req.image);

    files = req.files;

    


    //console.log("files= " + files);
    let imagesPaths = [];
    
    files.forEach(file => {
        imagesPaths.push("https://cataldostore.s3.eu-west-3.amazonaws.com/" + filename(file));
    });

    imagesPaths.forEach(element => {
        console.log("image path: " + element);
    });

    const product = await Product.findByIdAndUpdate(
        req.params.id, {
            images: imagesPaths
        }, {
            new: true
        }
    )

    if (!product)
        return res.status(400).send('the product cannot be updated');

    res.send(product);
}catch(e){
    res.status(500).json({
        success: false
    })
}
})

//Delete specific product
router.delete('/:id', (req,res)=>{
    try{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({
                success: true,
                message:'product deleted'
            });
        }else{
            return res.status(404).json({
                success: false,
                message: 'product cannot be deleted'
            });
        }
    }).catch(err =>{
        return res.status(400).json({
            success: false,
            error: err
        });
    })
}catch(e){
    res.status(500).json({
        success: false
    })
}
})

module.exports = router;

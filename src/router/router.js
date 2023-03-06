const router = require("express").Router()

const f_l_Schema = require("../schema/f_l_schema")

const f_schema = require('../schema/f_schema')

const a_schema = require('../schema/a_schema')

router.route("/laptop").get((req,res)=>{

    f_l_Schema.find()
    .then(e=>res.status(200).json({e}))
    .catch(err=>res.status(400).json("Err" + err))
})

router.route("/mobile").get((req,res)=>{

    f_schema.find()
    .then(e=>res.status(200).json({e}))
    .catch(err=>res.status(400).json("Err" + err))
})

router.route("/tv").get((req,res)=>{
     
    a_schema.find()
    .then(e=>res.status(200).json({e}))
    .catch(err=>res.status(400).json("Err" + err))
})






module.exports = router;
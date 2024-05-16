const express= require('express')
const router= express.Router()

const userControllers = require('../controllers/index')

router.post('/contactus',userControllers.contactUsController)



module.exports=router;
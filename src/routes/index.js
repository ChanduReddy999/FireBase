const express= require('express')
const router= express.Router()

const userControllers = require('../controllers/index')

router.post('/contactus',userControllers.contactUsController)
router.get('/',userControllers.contactDetailsController)



module.exports=router;
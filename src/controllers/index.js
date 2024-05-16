const userServices = require('../services');
const { callService }=require('./callService')

const contactUsController=async(req,res)=>{
    callService(userServices.contactUsService,req,res);
}

module.exports={
    contactUsController
}


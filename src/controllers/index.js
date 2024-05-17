const userServices = require('../services');
const { callService }=require('./callService')

const contactUsController=async(req,res)=>{
    callService(userServices.contactUsService,req,res);
}
const contactDetailsController=async(req,res)=>{
    callService(userServices.contactDetailsService,req,res);
}

module.exports={
    contactUsController,contactDetailsController
}


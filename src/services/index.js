const admin = require("firebase-admin");
const nodemailer = require('nodemailer')
require('dotenv').config();

// firebase credentials for portfolio
const credentials = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN
}

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const db = admin.firestore();

const contactUsService = async (req, res) => {
  try {
    const contactDetails = {
      FullName: req.body.FullName,
      Email: req.body.Email,
      Subject: req.body.Subject,
      Message: req.body.Message
    }
    const response = await db.collection("ContactUs").add(contactDetails);

    portifiMail(contactDetails.FullName,contactDetails.Email,contactDetails.Subject,contactDetails.Message);

    return { status: 200, message: "success", data: [] }
  } catch (error) {
    return { status: 300, message: "error", data: null }
  }
}

const contactDetailsService = async()=>{
  try {
    const contactData = db.collection("ContactUs");
    const res1 =await contactData.get();
    const finalData = []
    res1.forEach((doc)=>{
      finalData.push(doc.data())
    })
    // console.log("finalData",finalData);
    return { status:200, messafe:"success", data:finalData}
  } catch (error) {
    console.log(error);
  }
}

const portifiMail = (FullName,Email,Subject,Message) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cmfriend111@gmail.com',
        pass: process.env.PASSKEY
      }
    });

    var mailOptions = {
      from: 'cmfriend111@gmail.com',
      to: `chandureddyvadala1999@gmail.com`,
      subject: Subject,
      html: `<h1>Contacted from Portfolio with mail: <span>${Email}</span></h1>
      <p>Hello,This is ${FullName}</p>
      <p>${Message}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return { status: 200, message: "success", data: [] }
  } catch (error) {
    return { status: 300, message: "error", data: [] }
  }
}

module.exports = {
  contactUsService,contactDetailsService
};





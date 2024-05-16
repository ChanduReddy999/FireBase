const admin = require("firebase-admin");
const credentials = require("../../key.json");
const nodemailer = require('nodemailer')

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

const portifiMail = (FullName,Email,Subject,Message) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cmfriend111@gmail.com',
        pass: 'qgpg datn datn edng'
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
  contactUsService
};





const UserInfo = require('./models/userInfo')
const User = require('./models/user')
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.get('/reset', async (req, res) => {
    if (req.body.username === '') {
      res.status(400).send('Username required');
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(req.query.id, 'somesupersecretkey');
    } catch (error) {
      console.log("Expired Link");
      res.status(404).send('Expired Link'); 
      return
    }
    
    
    const user = await User.findById(decodedToken.Id)

    // if (Date.now() >= decodedToken.exp * 1000) {
    //   throw new Error('TOO LATE MOTHER FUCKER')
    // }

    if(!user){
      console.log("ERROR");
      res.status(404).send('Not Found');
      throw new Error('Failed to find user in database!')
    }
    
    const userInfo = await UserInfo.findById(user.information._id);

    if(!userInfo){
      throw new Error('Failed to find user information in database!')
    }

    const email = userInfo.email;

    if(!email){
      console.error('email not in database');
      res.status(401).send('email not in db');
    }
    else {
      
      const newPassword = Math.random().toString(36).substring(7);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'agenda.toastmasters@gmail.com',
          pass: 'scsv2019'
        },
      });

      const mailOptions = {
        from: 'agenda.toastmasters@gmail.com',
        to: `${email}`,
        subject: 'Reset Password',
        text:
          'Your Toastmaster agenda account password has been changed to:\n\n'
          + `${newPassword}\n\n`
          + 'Please request to Toastmaster agenda admin to change to new password!'
      };

      transporter.sendMail(mailOptions, async (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          //console.log('here is the res: ', response);
          const hashedPassword = await bcrypt.hash(newPassword, 12);
          const data = await User.updateOne({_id: user._id},{password:hashedPassword});
          if (data) {
            res.status(200).json('Password has been updated. Please check your email for new password!');
          }
          else{
            res.status(403).send('password not updated');
          }
        }
      });
    }
  });
};
    

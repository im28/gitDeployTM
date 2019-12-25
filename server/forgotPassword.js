const UserInfo = require('./models/userInfo')
const User = require('./models/user')
const nodemailer = require('nodemailer');
const getIP = require('./ipAddress')
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.post('/forgotPassword', async (req, res) => {
    if (req.body.username === '') {
      res.status(400).send('Username required');
    }
    
    const user = await User.findOne({username: req.body.username})

    if(!user){
      console.log("ERROR");
      res.status(404).send('email not in db');
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
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'agenda.toastmasters@gmail.com',
          pass: 'scsv2019'
        },
      });

      const token = jwt.sign({Id: user._id}, 'somesupersecretkey', {
        expiresIn: '1h'
    });

      const mailOptions = {
        from: 'agenda.toastmasters@gmail.com',
        to: `${email}`,
        subject: 'Confirming reset password',
        text:
          'You are receiving this because you have requested a password reset for your Toastmaster agenda account\n\n'
          + 'Please click on the following link or paste this into your browser to reset your password.\n\n'
          + `${getIP}/reset?id=${token}\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          + 'Link expires in 1 hour.\n'
      };

      transporter.sendMail(mailOptions, async (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
};
    

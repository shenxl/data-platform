'use strict';

module.exports = app => {
  return class Email extends app.Service {
    * sendMail(mailOptions) {
      return yield app.email.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log('error:', error);
        } else {
          console.log('email sent: ' + response.response);
        }
        app.email.close();
      });
    }
  };
};

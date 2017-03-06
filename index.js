
var AmazonSES = require("amazon-ses-mailer");

module.exports = function (options) {
    var bannerImage=options.bannerImage;
    var ses = new AmazonSES(
        options.accessKeyId,
        options.secretAccessKey,
        options.region
    );

    var sendMail = function (mail) {

        return new Promise(function (resolve, reject) {

            ses.send({
                from: options.from,
                to: [mail.to],
                subject: mail.subject,
                body: {
                    text: mail.text
                }
            }, function (error, data) {

                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    };

    var sendVerificationEmail = function (params) {                        
        return new Promise(function (resolve, reject) {
         var mailBody=   '<div style="width: 100%; text-align: center;"><img src="'+bannerImage+'" alt="' +params.appName+' Logo" style="height: 200px"></div>'+
'<br />'+
'<p>Hi,</p>'+

'<p>Thank you for creating an account! <br />'+

'Please click <a href="'+params.link+'">HERE</a> to confirm the use of the email address '+params.user.attributes.email+' with '+params.appName+'.</p>'+

'Thanks,<br />'+

params.appName+' Support';

            ses.send({
                from: options.from,
                to: [params.user.attributes.email],
                subject: "Please verify your e-mail for "+params.appName,
                body: {
                    html: mailBody,
                }
            }, function (error, data) {

                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });


    }
    var sendPasswordResetEmail = function (options) {

    }

    return {
        sendMail: sendMail,
        sendVerificationEmail: sendVerificationEmail,
        sendPasswordResetEmail: sendPasswordResetEmail
    }
};




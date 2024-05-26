module.exports = {

    checkAuthentication: async(req, res,next) => {

        // var CryptoJS = require("crypto-js");

        // var bytes  = CryptoJS.AES.decrypt(req.headers.authorization, 'hero housing ltd');
        // var originalText = bytes.toString(CryptoJS.enc.Utf8);
        // console.log("originalText",originalText)
        // req.headers.authorization = originalText

        var auth = require('basic-auth');
   
         var Api = require('../helper/check-auth.js');
   
        
   
          const dbSuffix='nka_';
   
         var credentials = auth(req);
   
         if (!credentials || !Api.checkAuth(credentials.name, credentials.pass)) {
   
           res.statusCode = 401
   
           res.setHeader('WWW-Authenticate', 'Basic realm="example"')
   
           res.end('Access denied')
   
        } else {
            next();
        }
   
    
   
      },
}
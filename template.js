var resetPassword = async (NAME, LINK) => {
  let jsonObject = {
    subject: "✔ Reset Password Request!",
    text: "Reset your Password!",
    html: `<!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>:::.MPPCRM Emailer.:::</title>
    <style type="text/css">
    body {
      margin-left: 0px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
    }
    </style>
    </head>
    
    <body>
    <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #f7f7f7;">
    <tbody>
    <tr>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="15">
    <tbody>
    <tr>
    <td bgcolor="#f7f7f7"><img src="https://www.mamypoko.co.in/img/mmp-logo-new1.webp" alt="" width="101" height="95"></td>
    </tr>
    </tbody>
    </table></td>
    </tr>
    <tr>
    <td bgcolor="#f7f7f7"><table width="95%" cellspacing="0" cellpadding="15" border="0" align="center">
    <tbody>
    <tr>
    <td width="50%" colspan="2" valign="top" bgcolor="#ffffff"><font style="font-size: 20px; font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, 'sans-serif'; color: #666666">Hello ${NAME}</font><br>
    <br>
    <font style="fonts-ze: 16px; font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, 'sans-serif'; color: #666666">
    <strong>A request has been received to change the password for your MPPCRM account.</strong><br>
    <br>
    <table width="200" border="0" align="center" cellpadding="0" cellspacing="0" style="text-align:center;">
      <tbody>
        <tr>
        <td height="44" align="center" bgcolor="#151F6D">
          <a href="${LINK}" style="color:#ffffff; display:inline-block; letter-spacing:0px; line-height:normal; text-decoration:none; fonts-size: 16px; font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, 'sans-serif';" target="_blank">Reset Password</a>
        </td>
      </tr>
      </tbody>
    </table>
    <br>If you did not initiate this request, please contact us immediately at <a href="mailto:support@mamypoko.co.in" target="_blank" style="color: #151F6D">support@mamypoko.co.in</a><br>
    <br>
    </font>
    
    
    <br>
    
    <font style="font-size: 16px;font-weight:600 ;line-height: 28px; font-family: 'Open Sans', sans-serif; color:#151F6D"><strong> Team - MPPCRM</strong></font><font style="fonts-ze: 16px; font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, 'sans-serif'; color: #666666">&nbsp;</font></td>
    </tr>
    </tbody>
    </table></td>
    </tr>
    <tr>
    <td bgcolor="#f7f7f7">&nbsp;</td>
    </tr>
    <tr>
    <td bgcolor="#455C58"><table width="100%" border="0" cellspacing="0" cellpadding="15">
    <tbody>
    <tr>
    <td align="center"><font style="font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, 'sans-serif'; font-size:13px; color: #f7f7f7">&copy; 2024 MPPCRM - All right reserved.</font></td>
    </tr>
    </tbody>
    </table></td>
    </tr>
    </tbody>
    </table>
    </body>
    </html>`
  }
  return jsonObject;
};

exports.resetPassword = resetPassword;
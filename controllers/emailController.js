const mailService = require('../helper/awsMailServices');
const fs = require('fs');

exports.sendMailForJobAppied = async (userDetails, vacancyData) => {
    try {
        let htmlTemplate = fs.readFileSync(
            `${__dirname}/../templates/base_template.html`,
            { encoding: 'utf-8' }
        );
        const username = userDetails?.name || "";
        const email = userDetails?.email_id || "";
        let subject = `${vacancyData?.company?.company_name || ""} - Thank you for applying for ${vacancyData?.title || ""} Position`;
        let candidateLink = process.env.REACT_APP_CANDIDATE_URL
        candidateLink = candidateLink?.replace("//", `//${vacancyData?.company?.username}.`)
        let mailContent = `<p>We are very pleased to receive your application for the position of ${vacancyData?.title || ""} </p>
        <p>We are reviewing your Application and will keep you posted. You can also check your application status using this <a href="${candidateLink}" target="_blank">Link</a>.</p>
        <p><strong>Please find your login details below: </strong></p>
        <p><strong>Email</strong>: ${email}</p>
        <p><strong>Password</strong>: ${userDetails?.password}</p>
        <p>Regards,<br/>
        ${vacancyData?.company?.company_name || ""}
        </p>`

        htmlTemplate = htmlTemplate.replace('##UserName##', username);
        htmlTemplate = htmlTemplate.replace('##content##', mailContent);

        // fs.writeFileSync("test.html", htmlTemplate)

        await mailService.customSMTPForParent(
            email,
            htmlTemplate,
            subject,
            'Candidate Application Mail'
        );
    }
    catch (err) {
        console.log(err)
    }
}
const jobScheduler = require('node-schedule');
const stripeMethod = require('./stripeFunction');
const membershipModel = require('../Models/membershipModel.config');
const paymentDetailModel = require('../Models/paymentDetailModel');
const transporter = require('../helper/sendEmailVerification');
const pug = require('pug');

const notifyUserEndingSubscription = async (targetDate, subscriptionId, membershipId, email) => {
    jobScheduler.scheduleJob(targetDate, async () => {
        let htmlContent;
        let emailSubject;
        let membershipInfo = await membershipModel.findOne({
            attributes: ['amount', 'status'],
            where: {
                id: membershipId
            }
        })

        membershipInfo = JSON.parse(JSON.stringify(membershipInfo));
        let membershipAmount = parseInt(membershipInfo.amount);
        let status = membershipInfo.status

        console.log(membershipAmount);

        let paymentInfo = await paymentDetailModel.findOne({
            attributes: ['paidAmount'],
            where: {
                membershipId: membershipId
            }
        })

        paymentInfo = JSON.parse(JSON.stringify(paymentInfo));
        let paymentAmount = paymentInfo.paidAmount

        if (membershipAmount == paymentAmount && status == "Active") {
            htmlContent = pug.renderFile('emailTemplate/renewSubscription.pug');
            emailSubject = "Renew subscription"

        } else {
            await stripeMethod.updateSubscription(subscriptionId);
            htmlContent = pug.renderFile('emailTemplate/subscriptionChanged.pug')
            emailSubject = "Change Subcription Information"
        }

        const info = await transporter.sendMail({
            from: '"Trampfit" <trampfit180@gmail.com>',
            to: email,
            subject: emailSubject,
            html: htmlContent
        });

        if (info) {
            console.log("Email send successfully");
        }
    })
}

module.exports = notifyUserEndingSubscription
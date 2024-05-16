const { where, Model } = require('sequelize');
const membershipDetailsModel = require('../Models/membershipModel.config');
const signupModel = require('../Models/signUpModel');
const sequelize = require('../databaseConnection');
const stripe = require('stripe')(process.env.payment_gateway_secret_key);
const paymentDetailModel = require('../Models/paymentDetailModel');
const stripeMethod = require('../helper/stripeFunction');
const transporter = require('../helper/sendEmailVerification');
const pug = require('pug');
const notifyUserEndingSubscription = require('../helper/notifyUserEndingSubscription');

// get all the membership Details
const getActiveMembershipController = async (req, res) => {
    try {

        let membershipDetails = await membershipDetailsModel.findAll({
            attributes: ['id', 'amount', 'validity', 'description', 'membershipName'],
            where: {
                status: "Active"
            },
            order: sequelize.col('id')
        })

        if (membershipDetails) {

            res.json({
                message: "Active Membership",
                response: true,
                data: membershipDetails
            })

        } else {

            res.json({
                message: "Data has not been fetched properly",
                response: false
            })

        }

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

// creating subscription
let membershipId = 0;
let userId = 0;
const createSubscriptionModelController = async (req, res) => {
    try {

        let { email, id } = JSON.parse(JSON.stringify(req.userEmail));
        userId = id;
        let customer;
        let fullName = req.fullName;

        let { membershipPlan, payableAmount, selectPlanValidity, planDescription } = req.body;
        membershipId = req.body.membershipId;

        let amount = parseInt(payableAmount);
        let planInfo = selectPlanValidity.split(" ");
        let planInterval = planInfo[1].toLowerCase();
        let planIntervalCount = parseInt(planInfo[0]);

        const customerExists = await stripeMethod.getCustomer(email);

        if (customerExists.data.length > 0) {

            customer = customerExists.data[0];

            const subscriptions = await stripeMethod.getSubscriptionList(customer.id);

            if (subscriptions.data.length > 0) {

                console.log(subscriptions.data[0].id);
                return res.json({
                    message: "subscription Id",
                    response: true,
                    subscriptionId: subscriptions.data[0].id
                })
            }

        } else {
            customer = await stripeMethod.createCustomer(email, fullName);
        }

        const session = await stripeMethod.checkoutSession(membershipPlan, planDescription, amount, planInterval, planIntervalCount, customer.id, email);

        res.json({
            message: "Session Id",
            response: true,
            sessionId: session.id
        });

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

// cancel the subscription
const cancelSubscriptionController = async (req, res) => {
    try {

        let subscriptionId = req.query.subscriptionId;

        let cancelSubscription = await stripeMethod.cancelSubscription(subscriptionId);

        if (cancelSubscription) {
            res.json({
                message: "Subscription cancel Successfully",
                response: true
            })
        }

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something wents wrong !!",
            response: false
        });

    }
}

// handling webhook events
const handleWebhookController = async (req, res) => {
    try {

        let paymentInfo = {};

        let payload = req.body;
        const sig = req.headers["stripe-signature"];
        const webhookSecretKey = process.env.webhook_signing_secret_key;



        let event = stripe.webhooks.constructEvent(payload, sig, webhookSecretKey);
        res.status(200).send("recieved Event");

        if (event.type === "invoice.payment_succeeded") {

            const invoice = event.data.object;

            paymentInfo.invoiceId = invoice.id;
            paymentInfo.invoiceNumber = invoice.number;
            paymentInfo.downloadInvoice = invoice.invoice_pdf;
            paymentInfo.downloadReciept = invoice.hosted_invoice_url;
            paymentInfo.paidAmount = invoice.amount_paid / 100;
            paymentInfo.subscriptionId = invoice.subscription;

            const subscription = await stripeMethod.retrieveSubscription(paymentInfo.subscriptionId);

            let startDate = new Date(subscription.current_period_start * 1000);
            let endDate = new Date(subscription.current_period_end * 1000);

            paymentInfo.startDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
            paymentInfo.endDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

            if (invoice.billing_reason === "subscription_create") {

                paymentInfo.status = subscription.status;

                paymentInfo.interval = subscription.plan.interval;
                paymentInfo.intervalCount = subscription.plan.interval_count;

                let productId = subscription.plan.product

                const product = await stripeMethod.retrieveProducts(productId);

                paymentInfo.subscriptionName = product.name;

                // adding the data to the database

                let subscriptionData = await paymentDetailModel.create({
                    invoiceId: paymentInfo.invoiceId,
                    invoiceNumber: paymentInfo.invoiceNumber,
                    downloadInvoice: paymentInfo.downloadInvoice,
                    downloadRecipt: paymentInfo.downloadReciept,
                    interval: paymentInfo.interval,
                    intervalCount: paymentInfo.intervalCount,
                    paidAmount: paymentInfo.paidAmount,
                    startDate: paymentInfo.startDate,
                    endDate: paymentInfo.endDate,
                    subscriptionName: paymentInfo.subscriptionName,
                    subscriptionId: paymentInfo.subscriptionId,
                    status: paymentInfo.status,
                    membershipId: membershipId,
                    userId: userId
                })


                if (subscriptionData.id) {
                    await signupModel.update({
                        MembershipId: subscriptionData.id
                    }, {
                        where: {
                            email: invoice.customer_email
                        }
                    })
                }

                const sevenDaysBefore = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000));
                notifyUserEndingSubscription(sevenDaysBefore, paymentInfo.subscriptionId, membershipId, invoice.customer_email);

                let htmlContent = pug.renderFile('emailTemplate/subscriptionConfirmed.pug', { downloadLink: paymentInfo.downloadReciept });
                let receiverEmail = invoice.customer_email;

                const info = await transporter.sendMail({
                    from: '"Trampfit" <trampfit180@gmail.com>',
                    to: receiverEmail,
                    subject: "Subscription Confirmed",
                    html: htmlContent
                });


                console.log("data saved Successfully");


            } else if (invoice.billing_reason === "subscription_cycle" || invoice.billing_reason === "subscription_update") {

                await paymentDetailModel.update(
                    {
                        invoiceId: paymentInfo.invoiceId,
                        invoiceNumber: paymentInfo.invoiceNumber,
                        downloadInvoice: paymentInfo.downloadInvoice,
                        downloadRecipt: paymentInfo.downloadReciept,
                        startDate: paymentInfo.startDate,
                        endDate: paymentInfo.endDate,
                    }, {
                    where: {
                        subscriptionId: paymentInfo.subscriptionId
                    }
                }
                )
                

                // adding session after renew it

                let membershipId = await paymentDetailModel.findOne({
                    attributes : ['membershipId'],
                    where : {
                        subscriptionId : paymentInfo.subscriptionId
                    }
                })

                let session = await membershipDetailsModel.findOne({
                    attributes : ['session'],
                    where : {
                        id : membershipId.membershipId
                    }
                })

                await signupModel.update({totalSession : session.session},{
                    where : {
                        email : invoice.customer_email
                    }
                })
                

                const sevenDaysBefore = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000));
                notifyUserEndingSubscription(sevenDaysBefore, paymentInfo.subscriptionId, membershipId, invoice.customer_email);

                console.log("Data Updated Successfully");

                let htmlContent = pug.renderFile('emailTemplate/recurringPaymentConfirmation.pug', { downloadLink: paymentInfo.downloadReciept });
                let receiverEmail = invoice.customer_email;

                const info = await transporter.sendMail({
                    from: '"Trampfit" <trampfit180@gmail.com>',
                    to: receiverEmail,
                    subject: "Subscription Renewed",
                    html: htmlContent
                });

            }

        } else if (event.type === 'customer.subscription.deleted') {
            const subscription = event.data.object;

            await paymentDetailModel.update({ status: subscription.status }, {
                where: {
                    subscriptionId: subscription.id
                }
            })

                       
            let email = await paymentDetailModel.findOne({
                include : [
                    {
                        model : signupModel,
                        attributes : ['email'],
                        as : 'userInfo'
                    }
                ],
                attributes : [],
                where : {
                    subscriptionId : subscription.id
                }  
            })

            email = JSON.parse(JSON.stringify(email));
            let userEmail = email.userInfo[0].email;

            await signupModel.update({totalSession : null},{
                where : {
                    email : userEmail
                }  
            })

            

            let htmlContent = pug.renderFile('emailTemplate/cancelSubscription.pug');
            let receiverEmail = userEmail;

            const info = await transporter.sendMail({
                from: '"Trampfit" <trampfit180@gmail.com>',
                to: receiverEmail,
                subject: "Subscription Cancellation",
                html: htmlContent
            });
        }

    } catch (err) {
        console.log(err);
    }
}


const claimSessionController = async(req,res) => {
    try {

        let mobileNumber = req.userDetails.payloadData.mobileNumber

        let getMembershipName = await signupModel.findOne({
            include : [
                {
                    model : paymentDetailModel,
                    attributes : ['membershipId'],
                    as : 'paymentInfo',
                    where : {
                        status : "active"
                    }
                }
            ] ,
            attributes : [],
            where : {
                mobileNumber : mobileNumber
            }
        })

        let membershipId = getMembershipName.paymentInfo[0].membershipId

        let session = await membershipDetailsModel.findOne({
            attributes : ['session'],
            where : {
                id : membershipId
            }
        })

        await signupModel.update({totalSession : session.session},{
            where : {
                mobileNumber : mobileNumber
            }
        })

    
        res.json({
            message : "you claimed session successfully",
            response : true

        })

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        });
    }
}

module.exports = {
    getActiveMembershipController,
    createSubscriptionModelController,
    handleWebhookController,
    cancelSubscriptionController,
    claimSessionController
}
const stripe = require('stripe')(process.env.payment_gateway_secret_key);

const updateSubscription = async (subscriptionId) => {

    await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
    });

    return true;
}


const retrieveSubscription = async (subscriptionId) => {

    let subscriptionData = await stripe.subscriptions.retrieve(
        subscriptionId
    );

    return subscriptionData;

}


const retrieveProducts = async (productId) => {
    let productData = await stripe.products.retrieve(productId);
    return productData;
}


const getCustomer = async (email) => {

    let customerExists = await stripe.customers.list({
        email: email,
        limit: 1
    });

    return customerExists;

}

const getSubscriptionList = async (customerId) => {

    let subscriptionList = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
    });

    return subscriptionList;
}



const billingSessionPortal = async (customerId) => {

    let billingSessionPortal = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: "http://localhost:3000/membership",
    });

    return billingSessionPortal;
}


const createCustomer = async (email, fullName) => {

    let customer = await stripe.customers.create({
        email: email,
        name: fullName,
        metadata: {
            userId: email, // Replace with actual Auth0 user ID
        }
    })

    return customer;
}

const cancelSubscription = async(subscriptionId) => {
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);
    return canceledSubscription;
}

const checkoutSession = async (membershipPlan, planDescription, amount, planInterval, planIntervalCount, customerId, email) => {

    const session = await stripe.checkout.sessions.create({
        success_url: `http://localhost:3000/paymentSuccess`,
        cancel_url: "http://localhost:3000/membership",
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: membershipPlan,
                        description: planDescription,
                    },
                    unit_amount: (amount * 100),
                    recurring: {
                        interval: planInterval,
                        interval_count: planIntervalCount
                    },
                },
                quantity: 1,
            },
        ],
        customer: customerId,
        metadata: {
            userId: email,
        },
    });

    return session;
}

module.exports = {
    updateSubscription,
    retrieveSubscription,
    retrieveProducts,
    getCustomer,
    getSubscriptionList,
    billingSessionPortal,
    createCustomer,
    checkoutSession,
    cancelSubscription
}
//config environment
require("dotenv").config();
//config stripe
const functions = require("firebase-functions");
// var stripe = require("stripe")(functions.config().stripe.token);

const export_func = require("./constant_type");

// router.post("/stripe_create_customer", async (req, res) => {
//   const customerId = await export_func.stripe_create_customer(req.body.email);
//   res.json({ customerId: customerId });
// });

// const cjs = require("./cjs.js");
// const {
//   // currentHostname,
//   // location,
//   TEST_HOSTNAME,
//   PRODUCT_HOSTNAME
// } = require("./constant_type.js");

// let hostname = export_func.TEST_HOSTNAME;
// console.log("stripe export@@@@@@@ 1 : ", hostname);

// const { currentHostname, location } = require("./constant_type");
let currentHostname = "aaa 1 3";
let location = "bbb 1 3";
// if (process.browser) {
// currentHostname = window.location.hostname;
// console.log("000000 11 22 @@@@@@@@@@@: ");
// location = window.location;
// }
var stripe = require("stripe")("");
console.log(
  "stripe_export secretKey2 00 11 22 @@@@@@@@@@@: ",
  process.env.STRIPE_PUBLIC_API_KEY,
  currentHostname,
  location
  // currentHostname,
  // TEST_HOSTNAME
);

//customer_email:顧客のメールアドレス
exports.stripe_create_customer = async function (email) {
  const customer = await stripe.customers.create({ email: email });
  const customerId = customer.id;
  return customerId;
};

//id:顧客のID
//num:カード番号, month:カードの有効期限, year:カードの有効期限, cvc:カードのセキュリティ番号
exports.stripe_create_card = async function (customerId, token) {
  const params = {
    source: token.id,
  };
  const card = await stripe.customers.createSource(customerId, params);
  return card;
};

exports.stripe_delete_card = async function (customerId, cardId) {
  const card = await stripe.customers.deleteSource(customerId, cardId);
  return card;
};

//price:請求価格, description:説明, customer_id:顧客のID
exports.stripe_charge = async function (chargeParams) {
  var charge = null;
  charge = await stripe.charges.create({
    amount: chargeParams.price,
    currency: "usd",
    description: chargeParams.description,
    customer: chargeParams.customerId,
  });

  return charge;
};

exports.stripe_retrieve_cards = async function (customerId) {
  const cards = await stripe.customers.listSources(customerId, {
    object: "card",
    limit: 1,
  });
  // console.log("cards.length: ", cards.length);
  const card = cards.data[0];
  return card;

  // const card = await stripe.customers.deleteSource(customerId, cardId);
  // return card;
};

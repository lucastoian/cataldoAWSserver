const express = require("express");
const bodyparser = require('body-parser')
const app = express();
const Stripe = require('stripe');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const stripe = require("stripe")("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");
const cors = require('cors')
const fetch = require('node-fetch')


const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': 'AZZU3wNkGHvF2lHIT-hUjsEOZqjlUOAiCoRFCD7HlwFRdX1LmvnmSd_BjLyZDPfiSRvIQ_PiiLxrFqO7',
  'client_secret': 'EMeDcQUwmC5EK9pGfPGZ3fC9eJoW1nkl69_7XH0txgkTgbj81EA3GFnvF8Wg7HbE73ifb9INKOGqyOKp'
});

app.use(cors())

app.post('/checkout', async(req, res) => {

  //console.log("amount: " + req.body.amount);

  try {
      console.log(req.body);
      token = req.body.token
    const customer = stripe.customers
      .create({
        email: req.body.email,
        address: {
          city: req.body.city,
          country: req.body.country,
          line1: req.body.address1,
          postal_code: req.body.postalCode,
          state: req.body.state

        },
        name: req.body.fName + " " + req.body.lName,
        phone: req.body.prefix + req.body.phone,
        source: token.id
      })
      .then((customer) => {
        console.log(customer);
        return stripe.charges.create({
          amount: req.body.amount * 100,
          description: "Cataldo Store",
          currency: "eur",
          customer: customer.id,
        });
      })
      .then((charge) => {
        console.log("charge : " + charge);
          res.json({
            data:"success"
        })
      })
      .catch((err) => {
        console.log("error : " + err);
          res.json({
            data: "failure",
          });
      });
    return true;
  } catch (error) {
    return false;
  }
});

app.post('/charge-source', async (req, res, next) => {
  console.log("stai pagando con klarna");
  try{
  const stripe2 = Stripe("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");
  console.log("customer = " + req.body.sourceId);

  console.log("stai pagando con klarna");
  const charge = await stripe2.charges.create({
  amount: req.body.amount * 100,
  currency: "EUR",
  source: req.body.sourceId
  });
  res.sendStatus(200);
  return charge;
}catch(error){
  console.log("errore nel pagamento di klarna" + error);
  res.status(500).json({
    success: false
})
}
  });


 let paypalAmount;
let paypalOrder;


  app.post('/paypal', (req, res) => {


    console.log("ORDER for transaction #######################################################À= " +  JSON.stringify(req.body.order))
    paypalAmount = req.body.amount;

                                              const create_payment_json = {
                                                "intent": "sale",
                                                "payer": {
                                                    "payment_method": "paypal"
                                                },
                                                "redirect_urls": {
                                                    "return_url": "https://funloltracker.herokuapp.com/api/v1/success?amount=" + req.body.amount + "&order=" + encodeURIComponent(JSON.stringify(req.body.order)),
                                                    "cancel_url": "https://funloltracker.herokuapp.com/api/v1/cancel"
                                                },
                                                "transactions": [{
                                                    "item_list": {
                                                        "items": [{
                                                            "name": "Articoli Cataldo Store",
                                                            "sku": "001",
                                                            "price": req.body.amount,
                                                            "currency": "EUR",
                                                            "quantity": 1
                                                        }]
                                                    },
                                                    "amount": {
                                                        "currency": "EUR",
                                                        "total": req.body.amount
                                                    },
                                                    "description": "Articoli Cataldo Store"
                                                }]
                                            };

                    paypal.payment.create(create_payment_json, function (error, payment) {
                        if (error) {
                            throw error;
                        } else {
                            for(let i = 0;i < payment.links.length;i++){
                              if(payment.links[i].rel === 'approval_url'){
                                res.status(200).send({ redirect:payment.links[i].href})
                              
                              }
                            }
                        }
                      });
    
      
      }); 



      app.get('/success', (req, res) => {
     

          const payerId = req.query.PayerID;
          const paymentId = req.query.paymentId;
          const amount = req.query.amount;
          const orderData = req.query.order;

          const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": amount
                }
            }]
          };

          paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("STO CERCANDO DI REGISTRARE QUESTO ORDINE CON PAYPAL:  ############" + decodeURIComponent(orderData));
                
                var payload = {
                  order: decodeURIComponent(orderData)
              };
                const options = {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },

                    
                    body: JSON.stringify(payload)  
                };
                fetch('https://funloltracker.herokuapp.com/api/v1/orders/createNewOrder', options )
                    .then( response => response.json() )
                    .then( response => {
                       console.log("HO CREATO QUESTO ORDINE CON PAYPAL: ################################################################################ÀÀ " + JSON.stringify(response))
                       res.redirect("https://www.cataldostore.it/orders/" + response._id)
                    } );
            }
        });
      });



module.exports = app; 

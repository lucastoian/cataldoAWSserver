
const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");


const accountSid = 'ACaabb761613b479c978d80b22ecc63f82';
const authToken = 'eb52a29ca810248fc796ca3fb29f50d1';
const client = require('twilio')(accountSid, authToken);





router.post(`/send`, async (req,res)=>{

    try{
    let orderId = req.body.orderId;
    let clientNumber = req.body.clientNumber;
    let clientPrefix = req.body.clientPrefix;
    console.log("cerco di mandare un sms a questo numero: " + '+' + clientPrefix + clientNumber);

    client.messages
    .create({
        body: 'Per confermare l\'ordine su cataldostore.it rispondi a questo messaggio inviando "SI" \nRispondendo "SI" ti impegnerai all\'acquisto dell\'ordine visibile a questo link: https://cataldoproduction.herokuapp.com/#/orders/' + orderId, 
        from: '+12059474811', 
        to: '+' + clientPrefix + clientNumber,
        statusCallback: 'https://cataldoproduction.herokuapp.com/api/v1/sms/recive'
})
    .then(message => console.log(message.sid));
    res.sendStatus(200);
}catch(e){
    console.log("errore nel'invio dell'sms " + e);
    res.status(500).json({
      success: false,
      
  })
}
    });
      


 
    router.post(`/recive`, async (req,res)=>{


        try{
        console.log("ho ricevuto questo messaggio : " + JSON.stringify(req.body) );

        let smsStatus = req.body.SmsStatus;
        let body = req.body.Body;

        if(smsStatus == 'received' && (body == 'SI' || body =='si' || body == 'Si')){
            console.log("Ho ricevuto un messaggio");
            let from = req.body.From;
            from = from.substring(1);
            console.log("from = " + from);

            const filter = { 
                fullNumber: from,
                confirmed: false,
                paymentOption: 'Contanti' 
            };
            const update = { confirmed: true };

            let doc = await Order.findOneAndUpdate(filter, update, {
                new: true
              });

            console.log("new order = " + doc);


            


 

        }

        res.sendStatus(200);
    }catch(e){
        console.log("errore nella ricezione di un messaggio : " + e);
        res.sendStatus(500);
    }

    });


    router.post(`/failed`, async (req,res)=>{

        console.log("errore nel ricevere il messaggio: " + JSON.stringify(req.body) );
        res.sendStatus(200);

    });
             

module.exports = router;
